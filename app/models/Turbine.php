<?php

//require 'printer.php';

class Turbine{

  public $siteId;
  public $clientId;
  public $siteName;
  public $siteDescription;
  public $primaryContact;
  public $capacity;
  public $commercialDate;
  public $addrLine1;
  public $addrLine2;
  public $addrCity;
  public $addrState;
  public $addrZip;
  public $addrCountry;

  public function __construct($data){
    $this->turbineId = isset($data['turbineId']) ? intval($data['turbineId']):null;
    $this->turbineName=$data['turbineName'];
    $this->turbineDescription = $data['turbineDescription'];
    $this->capacity = $data['capacity'];
    $this->rampUpTime = $data['rampUpTime'];
    $this->maintenanceInterval = $data['maintenanceInterval'];
  }

  public static function fetchAll(){
    $db= new PDO(DB_SERVER,DB_USER,DB_PW);
    $sql= 'SELECT * from turbine';
    $statement=$db->prepare($sql);
    $success=$statement->execute();
    $arr=[];
    while ($row = $statement->fetch(PDO::FETCH_ASSOC)) {
      $temp =  new Turbine($row);
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
