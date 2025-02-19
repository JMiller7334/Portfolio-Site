<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

//handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}

//define a response for all methods
$response = [
    "status" => "error",
    "message" => "This function is not yet implemented",
];

//set HTTP status to 501 (Not Implemented)
http_response_code(501);
header('Content-Type: application/json');

//output response
echo json_encode($response);
?>
