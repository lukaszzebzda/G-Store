<?php

require 'connect.php';


$postdata = file_get_contents("php://input");
	$request = json_decode($postdata);
	if(isset($postdata) && !empty($postdata))
	{
		$sql = 'BEGIN showComments(:Przedmio_ID, :cursbv); END;';

		$curs = oci_new_cursor($con);
		$stmt = oci_parse($con, $sql);

		$Przed_ID = trim($request->PRZEDMIOT_ID);
		// Bind the input parameter
		oci_bind_by_name($stmt,':Przedmio_ID',$Przed_ID);
		oci_bind_by_name($stmt, ":cursbv", $curs, -1, OCI_B_CURSOR);


		if(oci_execute($stmt) and oci_execute($curs)){
			$cr = 0;
			while($row = oci_fetch_array($curs, OCI_ASSOC+OCI_RETURN_NULLS)){
				$item[$cr]['OCE_ID'] = $row['OCE_ID'];
				$item[$cr]['USR_NAME'] = $row['USR_NAME'];
				$item[$cr]['OCE_RATE'] = $row['OCE_RATE'];
				$item[$cr]['OCE_MESSAGE'] = $row['OCE_MESSAGE'];
				$item[$cr]['USR_ID'] = $row['USR_ID'];
				$item[$cr]['PRZE_ID'] = $row['PRZE_ID'];
				$item[$cr]['OCE_DATE'] = $row['OCE_DATE'];
				$cr++;
				
			}
			echo json_encode(['data' => $item]);
		}

		else
		{
		  http_response_code(404);
		}
	}
?>