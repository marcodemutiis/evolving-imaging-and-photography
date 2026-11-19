<?php
// Likes and comments are not part of an image file, so they are kept next to it: shared/<student>/<file>.jpg.json
require __DIR__ . '/lib.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') fail('POST only', 405);
require_class_code();

$handle = clean_handle($_POST['handle'] ?? '');
$file = clean_filename($_POST['file'] ?? '');
$path = SHARED_DIR . "/$handle/$file";
if ($handle === '' || !is_file($path)) fail('Image not found.', 404);

$clamp = fn($v) => max(0, min(1000000, (int) $v));
file_put_contents("$path.json", json_encode(['likes' => $clamp($_POST['likes'] ?? 0), 'comments' => $clamp($_POST['comments'] ?? 0)]), LOCK_EX);
out(['ok' => true]);
