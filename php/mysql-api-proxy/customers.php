<?php
ob_start(); // Start output buffering

//allow requests from any origin (restrict this in production)
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

//header type
header('Content-Type: application/json');

error_reporting(E_ALL & ~E_WARNING & ~E_NOTICE);
ini_set('display_errors', 0);


//handle OPTIONS request (preflight)
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}

$response = ["error" => "Invalid request"]; // Default response
$curlSession = curl_init();

// ---------- POST METHOD ----------
if ($_SERVER['REQUEST_METHOD'] == 'POST') {

    //request validation
    if (strpos($_SERVER['CONTENT_TYPE'], 'application/json') === false) {

        http_response_code(400);
        curl_close($curlSession);
        echo json_encode(["error" => "Invalid Content-Type, expected application/json"]);
        exit();
    }

    //read and decode JSON input
    $customerObject = json_decode(file_get_contents('php://input'), true);

    if (isset(
        $customerObject['name'],
        $customerObject['address'], 
        $customerObject['phone'], 
        $customerObject['email'],
        $customerObject['customer_type']
    )) {
        $apiUrl = 'https://jacobjmiller.com/mysql-api/index.php?customers';
        $jsonData = json_encode($customerObject);

        //init cURL
        curl_setopt($curlSession, CURLOPT_URL, $apiUrl);
        curl_setopt($curlSession, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($curlSession, CURLOPT_POST, true);
        curl_setopt($curlSession, CURLOPT_POSTFIELDS, $jsonData);
        curl_setopt($curlSession, CURLOPT_HTTPHEADER, [
            'Content-Type: application/json'
        ]);

        //execute request
        $apiResponse = curl_exec($curlSession);
        $httpCode = curl_getinfo($curlSession, CURLINFO_HTTP_CODE);
        
        if ($apiResponse === false) {
            $response = ["error" => curl_error($curlSession)];
        } else {
            $response = json_decode($apiResponse, true) ?? ["error" => "Invalid API response"];
        }

        http_response_code($httpCode);
    } else {
        http_response_code(400);
        $response = ["error" => "Missing required fields"];
    }



// ---------- GET METHOD ----------
} else if ($_SERVER['REQUEST_METHOD'] == 'GET') {

    //endpoint for fetch all
    $apiUrl = 'https://jacobjmiller.com/mysql-api/index.php?customers';
    if (isset($_GET['id']) && !empty($_GET['id'])) {
        $id = intval($_GET['id']); // Ensure it's an integer for security

        if ($id > 0) {

            //endpoint for fetch by id.
            $apiUrl = 'https://jacobjmiller.com/mysql-api/index.php?customers&id=' . urlencode($id);
        } else {
            $response = ["error" => "Invalid ID"];
            http_response_code(400); // bad request
            curl_close($curlSession);
            echo json_encode($response);
            exit();
        }
    }
    curl_setopt($curlSession, CURLOPT_URL, $apiUrl);
    curl_setopt($curlSession, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($curlSession, CURLOPT_HTTPGET, true);
    curl_setopt($curlSession, CURLOPT_HTTPHEADER, [
        'Content-Type: application/json'
    ]);

    $apiResponse = curl_exec($curlSession);

    //case: api did not respond
    if ($apiResponse === false) {
        $response =  ["error" => curl_error($curlSession)];


    } else {
        $httpCode = curl_getinfo($curlSession, CURLINFO_HTTP_CODE);

        //case: api response error
        if ($httpCode != 200) {
            $response = ["error" => "Request failed with status code $httpCode"];
        } else {
            $response = json_decode($apiResponse, true) ?? ["error" => "Invalid JSON response"];
        }
    }


// ----- INVALID/NOT IMPLEMENTED -----
} else {
    $response = [
        "status" => "error",
        "message" => "This function is not yet implemented or invalid.",
    ];
}
file_put_contents("debug.log", print_r($apiResponse, true), FILE_APPEND);

//set response headers and return JSON
curl_close($curlSession);
ob_end_clean(); // Clear previous output before sending JSON
echo json_encode($response);
?>