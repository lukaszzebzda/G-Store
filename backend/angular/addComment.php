<?php

require 'connect.php';

$postdata = file_get_contents("php://input");
	$request = json_decode($postdata);
	if(isset($postdata) && !empty($postdata))
	{
		$sql = 'begin addComment(:OCE_RATE,:OCE_MESSAGE, :USR_ID, :PRZE_ID); end;';

		$stmt = oci_parse($con, $sql);

		$ocena = trim($request->ocena);
		$wiadomosc = trim($request->wiadomosc);
		$uzytkownik_id = trim($request->uzytkownik_id);
		$przedmiot_id = trim($request->przedmiot_id);
		
		// Bind the input parameter
		oci_bind_by_name($stmt,':OCE_RATE',$ocena);
		oci_bind_by_name($stmt,':OCE_MESSAGE',$wiadomosc);
		oci_bind_by_name($stmt,':USR_ID',$uzytkownik_id);
		oci_bind_by_name($stmt,':PRZE_ID',$przedmiot_id);


		if(oci_execute($stmt)){

			echo json_encode(['data' => $wiadomosc]);
				
		}

		else
		{
		  http_response_code(404);
		}
	}
?>