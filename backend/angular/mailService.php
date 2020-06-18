<?php

require 'connect.php';

$postdata = file_get_contents("php://input");
	$request = json_decode($postdata);
	if(isset($postdata) && !empty($postdata))
	{

		$adres = trim($request->adres);
		$tresc = trim($request->wiadomosc);
		
		// In case any of our lines are larger than 70 characters, we should use wordwrap()
		$message = wordwrap($tresc, 70, "\r\n");
	

		// Send
		if(mail($adres, 'G-Store : Potwierdzenie złożonego zakupu', $message))
		{
			echo json_encode(['data' => 'Udalo sie wyslac maila']);
		}
		else
		{
		  http_response_code(404);
		}
	}
?>