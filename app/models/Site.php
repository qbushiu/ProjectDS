<?php

//require 'printer.php';

class Site{

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
    $this->siteId = isset($data['siteId']) ? intval($data['siteId']):null;
    $this->clientId = isset($data['clientId']) ? intval($data['clientId']):null;
    $this->siteName=$data['siteDescription'];
    $this->primaryContact = $data['primaryContact'];
    $this->capacity = $data['capacity'];
    $this->commercialDate = $data['commercialDate'];
    $this->addrLine1 = $data['addrLine1'];
    $this->addrLine2 = $data['addrLine2'];
    $this->addrCity = $data['addrCity'];
    $this->addrState = $data['addrState'];
    $this->addrZip = $data['addrZip'];
    $this->addrCountry = $data['addrCountry'];
  }

  public static function fetchAll(){
    $db= new PDO(DB_SERVER,DB_USER,DB_PW);
    $sql= 'SELECT * from site';
    $statement=$db->prepare($sql);
    $success=$statement->execute();
    $arr=[];
    while ($row = $statement->fetch(PDO::FETCH_ASSOC)) {
      $temp =  new Site($row);
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
