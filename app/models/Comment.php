<?php

//require 'printer.php';

class Comment{

  public $id;
  public $comment;
  public $json_response;

  public function __construct($data){
    $this->id = isset($data['id']) ? intval($data['id']):null;
    $this->comment=$data['comment'];
  }

  public static function fetchAll(){
    $db= new PDO(DB_SERVER,DB_USER,DB_PW);
    $sql= 'SELECT * from COMMENT_PHP';
    $statement=$db->prepare($sql);
    $success=$statement->execute();
    $arr=[];
    while ($row = $statement->fetch(PDO::FETCH_ASSOC)) {
      $theComment =  new Comment($row);
      array_push($arr, $theComment);
    }
    return $arr;
  }

  public function create() {
    $db = new PDO(DB_SERVER, DB_USER, DB_PW);
    $sql = 'INSERT COMMENT_PHP(comment) VALUES (?)';
    $statement = $db->prepare($sql);
    $success = $statement->execute([
      $this->comment
    ]);
    $this->id = $db->lastInsertId();
    $temp = array (
          "id"=>$this->id,
          "comment"=>$this->comment
        );
    // echo $temp["id"];
    // echo $temp["comment"];
    // array_push($json_response,$temp);
    // echo json_encode($json_response, JSON_PRETTY_PRINT);


  }
}
