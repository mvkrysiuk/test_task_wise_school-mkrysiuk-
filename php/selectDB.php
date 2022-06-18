<?php
include("connectDB.php");

$responseArr = [];
$sqlResponse = "SELECT * FROM tracker_data";
if($result = mysqli_query($conn, $sqlResponse)){
     
    foreach($result as $row){
      $responseArr[] = $row;
    }
    echo json_encode(['items' => $responseArr]);
    mysqli_free_result($result);
} else{
    echo "Error: " . mysqli_error($conn);
}

mysqli_close($conn);
?>