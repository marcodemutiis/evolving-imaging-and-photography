<?php
require __DIR__ . '/lib.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') fail('POST only', 405);
require_class_code();

// When a file is bigger than post_max_size, PHP drops the whole request: no fields and no file arrive.
if ((int) ($_SERVER['CONTENT_LENGTH'] ?? 0) > 0 && empty($_POST) && empty($_FILES)) fail('File too large for the server (post_max_size).', 413);

$handle = clean_handle($_POST['handle'] ?? '');
if ($handle === '') fail('Please enter a name or nickname.');

if (!isset($_FILES['file']) || $_FILES['file']['error'] !== UPLOAD_ERR_OK) {
    $code = $_FILES['file']['error'] ?? -1;
    fail($code === UPLOAD_ERR_INI_SIZE || $code === UPLOAD_ERR_FORM_SIZE ? 'File too large for the server.' : 'Upload failed.');
}
$f = $_FILES['file'];
if ($f['size'] > MAX_BYTES) fail('File too large (limit ' . round(MAX_BYTES / 1048576) . ' MB).', 413);
if (!is_uploaded_file($f['tmp_name'])) fail('Upload failed.');

$info = @getimagesize($f['tmp_name']);
$head = file_get_contents($f['tmp_name'], false, null, 0, 3);
if (!$info || $info[2] !== IMAGETYPE_JPEG || $head !== "\xFF\xD8\xFF") fail('JPG / JPEG files only.', 415);

$name = clean_filename($f['name']);
$dir = SHARED_DIR . "/$handle";
$target = "$dir/$name";

$all = list_images();
$mine = array_filter($all, fn($r) => $r['handle'] === $handle);
$replacing = is_file($target);
if (!$replacing && count($mine) >= MAX_PER_HANDLE) fail('You have reached the limit of ' . MAX_PER_HANDLE . ' images. Re-use a filename to replace one.', 409);
if (!$replacing && count($all) >= MAX_TOTAL) fail('The class index is full.', 409);

if (!is_dir($dir) && !@mkdir($dir, 0755, true)) fail('Server cannot write to shared/.', 500);
// move_uploaded_file keeps the bytes exactly as they are, so the metadata survives
if (!move_uploaded_file($f['tmp_name'], $target)) fail('Server cannot write to shared/.', 500);
@chmod($target, 0644);
make_thumb($target, THUMB_DIR . "/$handle/$name");

out(['ok' => true, 'handle' => $handle, 'file' => $name, 'replaced' => $replacing]);
