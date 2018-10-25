<?php

$note = new ClientNotes($_POST);
$note->create();
echo json_encode($note);
