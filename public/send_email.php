<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

// Only allow POST requests
if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    http_response_code(405);
    echo json_encode(["status" => "error", "message" => "Method not allowed."]);
    exit;
}

// Get the POST JSON payload
$data = json_decode(file_get_contents("php://input"), true);

if (!$data) {
    http_response_code(400);
    echo json_encode(["status" => "error", "message" => "Invalid JSON payload."]);
    exit;
}

// Extract standard fields
$name = isset($data["name"]) ? strip_tags(trim($data["name"])) : "";
$email = isset($data["email"]) ? filter_var(trim($data["email"]), FILTER_VALIDATE_EMAIL) : false;
$phone = isset($data["phone"]) ? strip_tags(trim($data["phone"])) : "";
$company = isset($data["company"]) ? strip_tags(trim($data["company"])) : (isset($data["clinicName"]) ? strip_tags(trim($data["clinicName"])) : "");
$message = isset($data["message"]) ? strip_tags(trim($data["message"])) : (isset($data["notes"]) ? strip_tags(trim($data["notes"])) : "");
$labType = isset($data["labType"]) ? strip_tags(trim($data["labType"])) : "";
$dailyVolume = isset($data["dailyVolume"]) ? strip_tags(trim($data["dailyVolume"])) : "";

// Validate required fields
if (!$name || !$email) {
    http_response_code(400);
    echo json_encode(["status" => "error", "message" => "Name and a valid Email address are required fields."]);
    exit;
}

// Determine form type and subject
$formType = isset($data["formType"]) ? $data["formType"] : "Contact Inquiry";
$subject = "New " . $formType . " from " . $name . " - TrimAligner";

// Build the email body
$email_content = "TrimAligner Website Submission\n";
$email_content .= "=================================\n\n";
$email_content .= "Submission Type: $formType\n";
$email_content .= "Name: $name\n";
$email_content .= "Email: $email\n";
$email_content .= "Phone: $phone\n";

if ($company) {
    $email_content .= "Company/Clinic: $company\n";
}
if ($labType) {
    $email_content .= "Facility Type: $labType\n";
}
if ($dailyVolume) {
    $email_content .= "Daily Volume: $dailyVolume\n";
}

$email_content .= "\nMessage/Notes:\n";
$email_content .= "---------------------------------\n";
$email_content .= "$message\n";
$email_content .= "---------------------------------\n";

// Set headers
$to = "info@trimaligner.com";
$headers = "From: info@trimaligner.com\r\n";
$headers .= "Reply-To: $email\r\n";
$headers .= "X-Mailer: PHP/" . phpversion();

// Send email
if (mail($to, $subject, $email_content, $headers)) {
    http_response_code(200);
    echo json_encode(["status" => "success", "message" => "Message sent successfully."]);
} else {
    http_response_code(500);
    echo json_encode(["status" => "error", "message" => "Internal server error. Failed to send email."]);
}
?>
