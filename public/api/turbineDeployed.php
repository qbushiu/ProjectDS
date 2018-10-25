<?php
require '../../app/common.php';
// require 'printer.php';
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
  require 'turbineDeployedPost.php';
  exit;
}

if (isset($_GET['turbineDeployedId'])) {
  $turbineDeployedId = $_GET['turbineDeployedId'];
  $specificturbineDeployedArr = TurbineDeployed::fetchSpecific($turbineDeployedId);
  // 2. Convert to JSON
  $json = json_encode($specificturbineDeployedArr, JSON_PRETTY_PRINT);
  // 3. Print
  header('Content-Type: application/json');
  echo $json;
  exit;
}

// 1. Go to the database and get all work associated with the $taskId
$turbineDeployedArr = TurbineDeployed::fetchAll();
// 2. Convert to JSON
$json = json_encode($turbineDeployedArr, JSON_PRETTY_PRINT);
// 3. Print
header('Content-Type: application/json');
echo $json;
