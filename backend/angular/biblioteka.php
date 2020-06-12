<?php
/**
 * Using procedure say hello.
 */
require 'connect.php';
 
	// Get Values from Angular input
	$postdata = file_get_contents("php://input");
	$request = json_decode($postdata);
	if(isset($postdata) && !empty($postdata))
		{
			$sql = 'begin show_library(:Userek_ID, :cursbv); end;';
			
			$curs = oci_new_cursor($con);
			$stid = oci_parse($con, $sql);
			
					
			// Assign a value to the input 
			$User_ID = trim($request->User_id);
			// Bind the input parameter
			oci_bind_by_name($stid,':Userek_ID',$User_ID,32);
			oci_bind_by_name($stid, ":cursbv", $curs, -1, OCI_B_CURSOR);
			


		if(oci_execute($stid) and oci_execute($curs)){
			$cr = 0;
			while($row = oci_fetch_array($curs, OCI_ASSOC+OCI_RETURN_NULLS)){
				//echo($row['PRZE_NAZWA']);
				$item[$cr]['PRZE_ID'] = $row['PRZE_ID'];
				$item[$cr]['PRZE_NAZWA'] = $row['PRZE_NAZWA'];
				$item[$cr]['PRZE_OPIS'] = $row['PRZE_OPIS'];
				$item[$cr]['PRZE_CENA'] = $row['PRZE_CENA'];
				$item[$cr]['PRZE_IMAGE'] = $row['PRZE_IMAGE'];
				$item[$cr]['KATE_ID'] = $row['KATE_ID'];
				$item[$cr]['PRZE_CRITIC_RATE'] = $row['PRZE_CRITIC_RATE'];
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