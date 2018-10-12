<?php

//require 'printer.php';

class SensorTimeSeries{

  public $sensorDeployedId;
  public $dataCollectedDate;
  public $output;
  public $heartRate;
  public $compressorEfficiency;
  public $availability;
  public $reliability;
  public $firedHours;
  public $trips;
  public $starts;

  public function __construct($data){
    $this->sensorDeployedId = isset($data['sensorDeployedId']) ? intval($data['sensorDeployedId']):null;
    $this->dataCollectedDate=$data['dataCollectedDate'];
    $this->output = $data['output'];
    $this->heartRate = $data['heartRate'];
    $this->compressorEfficiency = $data['compressorEfficiency'];
    $this->availability = $data['availability'];
    $this->reliability = $data['reliability'];
    $this->firedHours = $data['firedHours'];
    $this->trips = $data['trips'];
    $this->starts = $data['starts'];

  }

  public static function fetchAll(){
    $db= new PDO(DB_SERVER,DB_USER,DB_PW);
    $sql= 'SELECT * from sensorTimeSeries';
    $statement=$db->prepare($sql);
    $success=$statement->execute();
    $arr=[];
    while ($row = $statement->fetch(PDO::FETCH_ASSOC)) {
      $temp =  new SensorTimeSeries($row);
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
