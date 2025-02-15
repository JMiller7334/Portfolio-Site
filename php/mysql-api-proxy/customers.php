


<?php 
//allow requests from any origin (restrict this in production)
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

//handle OPTIONS request (preflight)
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}

$response = ["error" => "Invalid request"]; // Default response


// ---------- POST METHOD ----------
if ($_SERVER['REQUEST_METHOD'] == 'POST') {

    //request validation
    if ($_SERVER['REQUEST_METHOD'] == 'POST' && 
        strpos($_SERVER['CONTENT_TYPE'], 'application/json') === false) {

        http_response_code(400);
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
        $apiUrl = 'http://jacobjmiller.com:8080/customers';
        $jsonData = json_encode($customerObject);

        //init cURL
        $curlSession = curl_init();
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

        curl_close($curlSession);
        http_response_code($httpCode);
    } else {
        http_response_code(400);
        $response = ["error" => "Missing required fields"];
    }



// ---------- GET METHOD ----------
} else if ($_SERVER['REQUEST_METHOD'] == 'GET') {
    //TODO: LOGIC




// ----- INVALID/NOT IMPLEMENTED -----
} else {
    $response = [
        "status" => "error",
        "message" => "This function is not yet implemented or invalid.",
    ];
}

//set response headers and return JSON
header('Content-Type: application/json');
echo json_encode($response);
?>
