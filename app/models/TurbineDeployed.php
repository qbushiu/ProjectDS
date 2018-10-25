<?php

//require 'printer.php';

class TurbineDeployed{

  public $turbineDeployedId;
  public $turbineId;
  public $siteId;
  public $serialNumber;
  public $deployedDate;
  public $totalFiredHours;
  public $totalStarts;
  public $lastPlannedOutageDate;
  public $lastUnplannedOutageDate;

  public function __construct($data){
    $this->turbineDeployedId = isset($data['turbineDeployedId']) ? intval($data['turbineDeployedId']):null;
    $this->turbineId=$data['turbineId'];
    $this->siteId = $data['siteId'];
    $this->serialNumber = $data['serialNumber'];
    $this->deployedDate = $data['deployedDate'];
    $this->totalFiredHours = $data['totalFiredHours'];
    $this->totalStarts = $data['totalStarts'];
    $this->lastPlannedOutageDate = $data['lastPlannedOutageDate'];
    $this->lastUnplannedOutageDate = $data['lastUnplannedOutageDate'];
  }

  public static function fetchAll(){
    $db= new PDO(DB_SERVER,DB_USER,DB_PW);
    $sql= 'SELECT * from turbineDeployed';
    $statement=$db->prepare($sql);
    $success=$statement->execute();
    $arr=[];
    while ($row = $statement->fetch(PDO::FETCH_ASSOC)) {
      $temp =  new TurbineDeployed($row);
      array_push($arr, $temp);
    }
    return $arr;
  }

  public static function fetchSpecific($turbineDeployedId){
    $db= new PDO(DB_SERVER,DB_USER,DB_PW);
    $sql= 'SELECT * from turbineDeployed WHERE turbineDeployedId='+turbineDeployedId;
    $statement=$db->prepare($sql);
    $success=$statement->execute();
    $arr=[];
    while ($row = $statement->fetch(PDO::FETCH_ASSOC)) {
      $temp =  new TurbineDeployed($row);
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
