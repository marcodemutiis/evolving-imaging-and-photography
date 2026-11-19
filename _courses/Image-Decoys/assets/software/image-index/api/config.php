<?php
// Settings for the shared class index. Edit this file on the server.
//
// CLASS_CODE: students need it to upload and to see the shared images. Leave it empty ('') for an open index.
// ADMIN_CODE: needed to delete images (admin.html). Leave it empty to switch deleting off.
// Change both before you put the folder online.
const CLASS_CODE = 'change-me';
const ADMIN_CODE = 'change-me-too';

const MAX_BYTES = 12 * 1024 * 1024;  // largest accepted file (also check upload_max_filesize in php.ini)
const MAX_PER_HANDLE = 12;           // images per student
const MAX_TOTAL = 400;               // images in the whole shared index
const THUMB_PX = 480;                // size of the display copies (they carry no metadata)
