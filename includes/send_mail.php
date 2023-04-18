<?php

########### CONFIG ###############

$recipient = $_POST['email'];
$link = "https://gruppenarbeit-503-join.developerakademie.net/reset_pw.html?email=" . $recipient;
$message = 'Someone requested to reset the password for the account ' . $recipient . '. Please click on ' . $link . ' to reset your password. If it wasn\'t you, just ignore this email.';
$redirect = 'https://gruppenarbeit-503-join.developerakademie.net/index.html';
########### CONFIG END ###########



########### Intruction ###########   
#
#   This script has been created to send an email to the $recipient
#   
#  1) Upload this file to your FTP Server
#  2) Send a POST rewquest to this file, including
#     [name] The name of the sender (Absender)
#     [message] Message that should be send to you
#
##################################



###############################
#
#        DON'T CHANGE ANYTHING FROM HERE!
#
#        Ab hier nichts mehr ändern!
#
###############################

switch ($_SERVER['REQUEST_METHOD']) {
    case ("OPTIONS"): //Allow preflighting to take place.
        header("Access-Control-Allow-Origin: *");
        header("Access-Control-Allow-Methods: POST");
        header("Access-Control-Allow-Headers: content-type");
        exit;
    case ("POST"): //Send the email;
        header("Access-Control-Allow-Origin: *");

        $subject = "Password change request";
        $headers = "From:  noreply@gruppenarbeit-503.net";

        mail($_POST['email'], $subject, $message, $headers);
        header("Location: " . $redirect); 

        break;
    default: //Reject any non POST or OPTIONS requests.
        header("Allow: POST", true, 405);
        exit;
}
