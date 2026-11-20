<?php
// Admin only: overwrite or restore one of the sample images in images/.
// The first time a file is changed, the original is copied to images-orig/ so it can be restored.
// images/, thumbs/ and images-orig/ must be writable by the web server.
require __DIR__ . '/lib.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') fail('POST only', 405);
require_admin_code();

$IMAGES = ROOT . '/images';
$THUMBS = ROOT . '/thumbs';
$ORIG = ROOT . '/images-orig';

$name = basename(str_replace('\\', '/', (string) ($_POST['file'] ?? '')));
if (!preg_match('/^[A-Za-z0-9._-]+\.jpe?g$/i', $name) || !is_file("$IMAGES/$name")) fail('That sample image does not exist.', 404);
if (!is_writable($IMAGES) || !is_writable($THUMBS)) fail('images/ and thumbs/ are not writable by the web server.', 500);

$action = $_POST['action'] ?? 'save';

function replace_file($tmp, $dest) {            // write next to the target, then rename, so a reader never sees half a file
    $part = $dest . '.part';
    if (!copy($tmp, $part)) return false;
    return rename($part, $dest);
}

if ($action === 'restore') {
    if (!is_file("$ORIG/$name")) fail('No saved original for this image: it has not been changed.', 404);
    if (!replace_file("$ORIG/$name", "$IMAGES/$name")) fail('Could not restore the file.', 500);
} else {
    if (empty($_FILES['image']) || $_FILES['image']['error'] !== UPLOAD_ERR_OK) fail('No file received (check upload_max_filesize and post_max_size).');
    $tmp = $_FILES['image']['tmp_name'];
    if ($_FILES['image']['size'] > MAX_BYTES) fail('File too large.');
    $info = @getimagesize($tmp);
    if (!$info || $info[2] !== IMAGETYPE_JPEG) fail('Only JPEG files are accepted.');
    if (!is_dir($ORIG) && !@mkdir($ORIG, 0755, true)) fail('Could not create images-orig/.', 500);
    if (!is_file("$ORIG/$name") && !copy("$IMAGES/$name", "$ORIG/$name")) fail('Could not save the original.', 500);
    if (!replace_file($tmp, "$IMAGES/$name")) fail('Could not write the file.', 500);
}

make_thumb("$IMAGES/$name", "$THUMBS/$name");    // the display copy never carries metadata
out(['ok' => true, 'file' => $name, 'v' => filemtime("$IMAGES/$name")]);
