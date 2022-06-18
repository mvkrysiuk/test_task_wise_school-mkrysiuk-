<?php 

include("connectDB.php");

$startForm = $_POST["StartTime"];
$finishForm = $_POST["FinishTime"];
$distanceForm = $_POST["Distance"];
$activityTypeForm = $_POST["ActivityType"];

$sqlRequest = "INSERT INTO tracker_data (start_time, finish_time, distance, activity_type) VALUES ('$startForm', '$finishForm', '$distanceForm', '$activityTypeForm')";
  if (mysqli_query($conn, $sqlRequest)) {
    echo "New record created successfully";
  } else {
    echo "Error: " . $sqlRequest . "<br>" . mysqli_error($conn);
  }

$redirect = isset($_SERVER['HTTP_REFERER'])? $_SERVER['HTTP_REFERER']:'redirect-form.html';
header("Location: $redirect");
exit();

mysqli_close($conn);

?>