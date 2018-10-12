<?php
require '../../app/common.php';
// require 'printer.php';
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
  require 'sensorDeployedIdPost.php';
  exit;
}

// 1. Go to the database and get all work associated with the $taskId
$sensorDeployedArr = SensorDeployed::fetchAll();
// 2. Convert to JSON
$json = json_encode($sensorDeployedArr, JSON_PRETTY_PRINT);
// 3. Print
header('Content-Type: application/json');
echo $json;
