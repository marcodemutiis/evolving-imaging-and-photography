<?php
require __DIR__ . '/lib.php';
require_class_code();
out(['ok' => true, 'images' => list_images()]);
