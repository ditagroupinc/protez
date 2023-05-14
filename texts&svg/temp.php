<?php
if(isset($_POST['submit'])) {
 $mailto = "info@protezfoundation.com";  //My email address
 $name = $_POST['name']; //getting customer name
 $fromEmail = $_POST['email']; //getting customer email

 $subject = "Join our mailing list"; // For customer confirmation
 $message = "Cleint Name: " . $name . "\n"
 . "Email: " . $fromEmail . "\n\n";

 
 
 //PHP mailer function
 
  $result1 = mail($mailto, $subject, $message); // This email sent to My address
 
  //Checking if Mails sent successfully
 
  if ($result1) {
    echo "Your Message was sent Successfully!";
  } else {
    echo "Sorry! Message was not sent, Try again Later.";
  }
}
