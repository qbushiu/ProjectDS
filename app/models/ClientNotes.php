<?php

//require 'printer.php';

class ClientNotes{

  public $noteId;
  public $notes;
  public $clientId;

  public function __construct($data){
    $this->notes=$data['notes'];
    $this->clientId = intval($data['clientId']);
  }

  public static function fetchAll(){
    $db= new PDO(DB_SERVER,DB_USER,DB_PW);
    $sql= 'SELECT * from clientNotes';
    $statement=$db->prepare($sql);
    $success=$statement->execute();
    $arr=[];
    while ($row = $statement->fetch(PDO::FETCH_ASSOC)) {
      $temp =  new ClientNotes($row);
      array_push($arr, $temp);
    }
    return $arr;
  }

  public function create() {
    $db = new PDO(DB_SERVER, DB_USER, DB_PW);
    $sql = 'INSERT INTO clientNotes(notes,clientId) VALUES (?,?)';
    $statement = $db->prepare($sql);
    $success = $statement->execute([
      $this->notes,
      $this->clientId
    ]);
    $this->noteId = intval($db->lastInsertId());
  }
}
