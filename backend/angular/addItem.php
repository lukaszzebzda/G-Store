<?php

require 'connect.php';

$postdata = file_get_contents("php://input");
	$request = json_decode($postdata);
	if(isset($postdata) && !empty($postdata))
	{
		$sql = 'begin addItem(:PRZE_NAZWA, :PRZE_OPIS, :PRZE_CENA, :PRZE_IMAGE, :KATE_ID, :PRZE_CRITIC_RATE); end;';

		$stmt = oci_parse($con, $sql);

		$nazwa = trim($request->nazwa);
		$opis = trim($request->opis);
		$cena = trim($request->cena);
		$image = trim($request->image);
		$kategoria = trim($request->kategoria);
		$ocena = trim($request->ocena);
		
		// Bind the input parameter
		oci_bind_by_name($stmt,':PRZE_NAZWA',$nazwa);
		oci_bind_by_name($stmt,':PRZE_OPIS',$opis);
		oci_bind_by_name($stmt,':PRZE_CENA',$cena);
		oci_bind_by_name($stmt,':PRZE_IMAGE',$image);
		oci_bind_by_name($stmt,':KATE_ID',$kategoria);
		oci_bind_by_name($stmt,':PRZE_CRITIC_RATE',$ocena);


		if(oci_execute($stmt)){

			echo json_encode(['data' => 'Udalo sie']);
				
		}

		else
		{
		  http_response_code(404);
		}
	}
?>