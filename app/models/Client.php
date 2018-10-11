<?php

//require 'printer.php';

class Client{

  public $clientId;
  public $clientName;
  public $clientDescription;
  public $gicsSector;
  public $gicsSubIndustry;
  public $headquarters;

  public function __construct($data){
    $this->clientId = isset($data['clientId']) ? intval($data['clientId']):null;
    $this->clientName=$data['clientName'];
    $this->clientDescription = $data['clientDescription'];
    $this->gicsSector = $data['gicsSector'];
    $this->gicsSubIndustry = $data['gicsSubIndustry'];
    $this->headquarters = $data['headquarters'];
  }

  public static function fetchAll(){
    $db= new PDO(DB_SERVER,DB_USER,DB_PW);
    $sql= 'SELECT * from client';
    $statement=$db->prepare($sql);
    $success=$statement->execute();
    $arr=[];
    while ($row = $statement->fetch(PDO::FETCH_ASSOC)) {
      $temp =  new Client($row);
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
