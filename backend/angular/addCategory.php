<?php

require 'connect.php';

$postdata = file_get_contents("php://input");
	$request = json_decode($postdata);
	if(isset($postdata) && !empty($postdata))
	{
		$sql = 'begin addCategory(:KATE_NAZWA); end;';

		$stmt = oci_parse($con, $sql);

		$nazwa = trim($request->nazwa);
		
		// Bind the input parameter
		oci_bind_by_name($stmt,':KATE_NAZWA',$nazwa);


		if(oci_execute($stmt)){

			echo json_encode(['data' => 'Udalo sie']);
				
		}

		else
		{
		  http_response_code(404);
		}
	}
?>