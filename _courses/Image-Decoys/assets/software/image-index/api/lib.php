<?php
// Shared helpers for the class index API.
require __DIR__ . '/config.php';

const ROOT = __DIR__ . '/..';
const SHARED_DIR = ROOT . '/shared';
const THUMB_DIR = ROOT . '/shared-thumbs';

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');

function out($data, $status = 200) {
    http_response_code($status);
    echo json_encode($data, JSON_UNESCAPED_SLASHES);
    exit;
}

function fail($message, $status = 400) {
    out(['ok' => false, 'error' => $message], $status);
}

function given_code($header, $field) {
    $key = 'HTTP_' . strtoupper(str_replace('-', '_', $header));
    if (!empty($_SERVER[$key])) return (string) $_SERVER[$key];
    return isset($_POST[$field]) ? (string) $_POST[$field] : '';
}

function require_class_code() {
    if (CLASS_CODE === '') return;
    if (!hash_equals(CLASS_CODE, given_code('X-Class-Code', 'code'))) {
        out(['ok' => false, 'error' => 'class code needed', 'codeRequired' => true], 401);
    }
}

function require_admin_code() {
    if (ADMIN_CODE === '' || !hash_equals(ADMIN_CODE, given_code('X-Admin-Code', 'admin'))) {
        out(['ok' => false, 'error' => 'admin code needed', 'codeRequired' => true], 401);
    }
}

function clean_handle($s) {
    $s = strtolower(trim((string) $s));
    $s = preg_replace('/[^a-z0-9]+/', '-', $s);
    return substr(trim($s, '-'), 0, 24);
}

// Keep the filename readable (it is a ranking signal), but safe. Always ends in .jpg.
function clean_filename($name) {
    $name = basename(str_replace('\\', '/', (string) $name));
    $name = preg_replace('/\.(jpe?g)$/i', '', $name);
    $name = preg_replace('/[^A-Za-z0-9._-]+/', '-', $name);
    $name = trim(preg_replace('/-+/', '-', $name), '.-_');
    if ($name === '') $name = 'image';
    return substr($name, 0, 80) . '.jpg';
}

function list_images() {
    $rows = [];
    if (!is_dir(SHARED_DIR)) return $rows;
    foreach (scandir(SHARED_DIR) as $h) {
        if ($h[0] === '.' || !is_dir(SHARED_DIR . "/$h")) continue;
        foreach (scandir(SHARED_DIR . "/$h") as $f) {
            $p = SHARED_DIR . "/$h/$f";
            if ($f[0] === '.' || !is_file($p) || !preg_match('/\.jpg$/', $f)) continue;
            $size = @getimagesize($p);
            $mtime = filemtime($p);
            $meta = is_file("$p.json") ? (json_decode(file_get_contents("$p.json"), true) ?: []) : [];
            $rows[] = [
                'handle' => $h,
                'file' => $f,
                'url' => "shared/$h/" . rawurlencode($f) . "?v=$mtime",
                'thumb' => is_file(THUMB_DIR . "/$h/$f") ? "shared-thumbs/$h/" . rawurlencode($f) . "?v=$mtime" : "shared/$h/" . rawurlencode($f) . "?v=$mtime",
                'width' => $size ? $size[0] : 0,
                'height' => $size ? $size[1] : 0,
                'mtime' => $mtime,
                'likes' => (int) ($meta['likes'] ?? 0),
                'comments' => (int) ($meta['comments'] ?? 0),
            ];
        }
    }
    return $rows;
}

// A small display copy without metadata. Returns false if GD is not available.
function make_thumb($src, $dst) {
    if (!function_exists('imagecreatefromjpeg')) return false;
    $im = @imagecreatefromjpeg($src);
    if (!$im) return false;
    if (function_exists('exif_read_data')) {          // apply the camera's rotation, since the copy loses the tag
        $exif = @exif_read_data($src);
        $o = $exif['Orientation'] ?? 1;
        $deg = [3 => 180, 6 => -90, 8 => 90][$o] ?? 0;
        if ($deg) { $r = imagerotate($im, $deg, 0); if ($r) $im = $r; }
    }
    $w = imagesx($im); $h = imagesy($im);
    $scale = min(1, THUMB_PX / max($w, $h));
    if ($scale < 1) $im = imagescale($im, max(1, (int) round($w * $scale)), max(1, (int) round($h * $scale)));
    @mkdir(dirname($dst), 0755, true);
    $ok = imagejpeg($im, $dst, 80);
    imagedestroy($im);
    return $ok;
}
