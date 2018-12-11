<?php
session_start();
require 'database.php';

$username = $_POST['username'];
$password = password_hash($_POST["password"], PASSWORD_DEFAULT);

$statement = $pdo->prepare("
  INSERT INTO users (username, password)
  VALUES (:username, :password)");

$statement->execute(array(
  ":username" => $username,
  ":password" => $password
)); 

header("Location: /admin.php?".$username.$password);