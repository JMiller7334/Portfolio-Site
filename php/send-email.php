<?php
// Allow requests from any origin (you can restrict this to your frontend domain in production for security)
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

// Handle OPTIONS request (preflight)
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}


//get the raw POST data
$requestData = json_decode(file_get_contents('php://input'), true);

//prepare response array
$response = [];

// Check if the necessary data is provided
if (isset($requestData['name'], $requestData['email'], $requestData['message'])) {
    $apiUrl = "http://jacobjmiller.com:8081/send-email"; // Your API URL
    
    // Convert the data array to JSON format
    $jsonData = json_encode($requestData);
    
    // Initialize cURL session
    $ch = curl_init();
    
    // Set the cURL options
    curl_setopt($ch, CURLOPT_URL, $apiUrl);  // Set the target URL
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true); // Return the response as a string
    curl_setopt($ch, CURLOPT_POST, true); // Use POST method
    curl_setopt($ch, CURLOPT_POSTFIELDS, $jsonData); // Attach the JSON data to the POST request
    
    // Set the headers (for sending JSON data)
    curl_setopt($ch, CURLOPT_HTTPHEADER, array(
        "Content-Type: application/json",
        "Content-Length: " . strlen($jsonData)
    ));
    
    // Execute the cURL request and get the response
    $apiResponse = curl_exec($ch);
    
    // Check for errors
    if (curl_errno($ch)) {
        // If there's an error with the API call, return an error response
        $response['error'] = 'API request failed: ' . curl_error($ch);
    } else {
        // Decode the API response
        $data = json_decode($apiResponse, true); // Decode the JSON response
        
        if ($data && isset($data['success'])) {
            $response['success'] = $data['success']; // Handle success from the API
        } else {
            $response['error'] = 'Failed to process the email.';
        }
    }
    
    // Close the cURL session
    curl_close($ch);
} else {
    $response['error'] = 'Invalid input data.';
}

// Set the response content type to JSON and send the response back to the frontend
header('Content-Type: application/json');
echo json_encode($response);
?>
