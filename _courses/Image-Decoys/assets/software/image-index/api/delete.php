<?php
require __DIR__ . '/lib.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') fail('POST only', 405);
require_admin_code();

$handle = clean_handle($_POST['handle'] ?? '');
if ($handle === '') fail('handle missing');
$file = isset($_POST['file']) && $_POST['file'] !== '' ? clean_filename($_POST['file']) : null;

$n = 0;
foreach ([SHARED_DIR, THUMB_DIR] as $base) {
    $dir = "$base/$handle";
    if (!is_dir($dir)) continue;
    if ($file !== null) {
        if (is_file("$dir/$file") && unlink("$dir/$file")) $n++;
        if (is_file("$dir/$file.json")) unlink("$dir/$file.json");
    } else {                                   // no file given: remove everything of this student
        foreach (scandir($dir) as $f) if ($f[0] !== '.' && is_file("$dir/$f") && unlink("$dir/$f")) $n++;
    }
    @rmdir($dir);
}
out(['ok' => true, 'deleted' => $n]);
