<?php

//require 'printer.php';

class SensorDeployed{

  public $sensorDeployedId;
  public $sensorId;
  public $turbineDeployedId;
  public $serialNumber;
  public $deployedDate;

  public function __construct($data){
    $this->sensorDeployedId = isset($data['sensorDeployedId']) ? intval($data['sensorDeployedId']):null;
    $this->sensorId=$data['sensorId'];
    $this->turbineDeployedId = $data['turbineDeployedId'];
    $this->serialNumber = $data['serialNumber'];
    $this->deployedDate = $data['deployedDate'];
  }

  public static function fetchAll(){
    $db= new PDO(DB_SERVER,DB_USER,DB_PW);
    $sql= 'SELECT * from sensorDeployed';
    $statement=$db->prepare($sql);
    $success=$statement->execute();
    $arr=[];
    while ($row = $statement->fetch(PDO::FETCH_ASSOC)) {
      $temp =  new SensorDeployed($row);
      array_push($arr, $temp);
    }
    return $arr;
  }

  // public function create() {
  //   $db = new PDO(DB_SERVER, DB_USER, DB_PW);
  //   $sql = 'INSERT COMMENT_PHP(comment) VALUES (?)';
  //   $statement = $db->prepare($sql);
  //   $success = $statement->execute([
  //     $this->comment
  //   ]);
  //   $this->id = $db->lastInsertId();
  //   $temp = array (
  //         "id"=>$this->id,
  //         "comment"=>$this->comment
  //       );
  // }
}
