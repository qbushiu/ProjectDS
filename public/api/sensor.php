<?php
require '../../app/common.php';
// require 'printer.php';
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
  require 'sensorPost.php';
  exit;
}

// 1. Go to the database and get all work associated with the $taskId
$sensorArr = Sensor::fetchAll();
// 2. Convert to JSON
$json = json_encode($sensorArr, JSON_PRETTY_PRINT);
// 3. Print
header('Content-Type: application/json');
echo $json;
