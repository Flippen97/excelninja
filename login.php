<?php
session_start();

require 'database.php';

$password = $_POST["password"];
$username = $_POST["username"];

$statement = $pdo->prepare("SELECT * FROM users WHERE username = :username");
$statement->execute(array(
  ":username" => $username
));

$fetched_user = $statement->fetch(PDO::FETCH_ASSOC);

// Checking if password is the same as the password in the database
if( password_verify($password, $fetched_user["password"]) ){

  $_SESSION["user"] = $fetched_user;
  $_SESSION["loggedIn"] = true;

 header("Location: /admin.php?success=true");
}
else {
  header("Location: /admin.php?error=Wrong username or password&success=false");
  
}