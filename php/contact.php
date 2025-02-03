<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require __DIR__ . '/../vendor/autoload.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = htmlspecialchars($_POST['name'] ?? '');
    $email = filter_var($_POST['email'], FILTER_VALIDATE_EMAIL) ? $_POST['email'] : '';
    $message = htmlspecialchars($_POST['message'] ?? '');

    //validation checks
    if (!$email) {
        echo "Invalid email.";
        exit;
    }

    if (!empty($_POST['honeypot'])) {
        echo "Spam detected.";
        exit;
    }

    $mail = new PHPMailer(true);

    try {
        // SMTP Configuration
        $mail->isSMTP();
        $mail->Host       = 'smtp.gmail.com';
        $mail->SMTPAuth   = true;
        $mail->Username   = 'jmillerdevelops@gmail.com';
        $mail->Password   = 'bbwiqcuyxmoblvce';
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port       = 587;

        //$mail->SMTPDebug = 2;

        // Sender & Recipient
        $mail->setFrom($email, $name);
        $mail->addAddress('jmillerdevelops@gmail.com'); //receiving email

        // Email Content
        $mail->Subject = 'New Contact Form Submission';
        $mail->Body    = "Name: $name\nEmail: $email\n\nMessage:\n$message";

        // Send Email
        $mail->send();
        echo "Message sent successfully!";
    } catch (Exception $e) {
        echo "Message could not be sent. Error: {$mail->ErrorInfo}";
    }
} else {
    echo "contact.php: invalid request.";
}
?>

