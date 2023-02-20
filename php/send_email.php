<?php
include("database.php");
$postdata = file_get_contents("php://input");
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'phpmailer/src/Exception.php';
require 'phpmailer/src/PHPMailer.php';
require 'phpmailer/src/SMTP.php';




if(isset($postdata) && !empty($postdata))
{
    $request = json_decode($postdata);
    $emailId = mysqli_real_escape_string($mysqli, trim($request->email));
    $link = "<a href='https://redmindtech.github.io/Dmk-Wings/change-password/".$emailId."'>Click To Reset password</a>";
    $mail=new PHPMailer(true);
    $mail->isSMTP();
    $mail->Host='smtp.gmail.com';
    $mail->SMTPAuth=true;
    $mail->Username='balasuryas44210@gmail.com';
    $mail->Password='tkecxutkxbkuincq';
    $mail->SMTPSecure='ssl';
    $mail->Port=465;
    $mail->setFrom('balasuryas44210@gmail.com');
    $mail->addAddress($emailId);
    $mail->isHTML(true);
    $mail->Subject="Reset Password";
    $mail->Body=$link;
    $mail->send();
    echo "<script>alert('The Reset Password link was sent to your mail');</script>";
}
echo json_encode($authdata);
?>
