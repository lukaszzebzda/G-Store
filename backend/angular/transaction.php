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
	


		$sql = 'BEGIN makeTransaction(:cena,:prze_id,:user_id,:tra_date); END;';
		 
		$stmt = oci_parse($con,$sql);
		 
		// Bind the input parameter
		oci_bind_by_name($stmt,':cena',$cena,32);
		 
		// Bind the input parameter
		oci_bind_by_name($stmt,':prze_id',$prze_id,32);
		
		// Bind the output parameter
		oci_bind_by_name($stmt,':user_id',$user_id,32);
		
		oci_bind_by_name($stmt,':tra_date',$tra_date,32);
		
		// Assign a value to the input 
		$cena = trim($request->cena);
		$prze_id = trim($request->nr_przedmiotu);
		$user_id = trim($request->nr_uzytkownika);
		$tra_date;
		
		try{
			if(oci_execute($stmt)){
				// $transdata = [
				// 	'TRA_ID' => 1,
				// 	'TRA_PRICE' => 4,
				// 	'TRA_DATETIME' => 'tal',
				// 	'PRZE_ID' => 5,
				// 	'USR_ID' => 6
				// ];
				$item[0]['TRAI_ID'] = '';
				$item[0]['TRA_PRICE'] = $cena;
				$item[0]['TRA_DATETIME'] = $tra_date;
				$item[0]['PRZE_ID'] = $prze_id;
				$item[0]['USR_ID'] = $user_id;
				echo json_encode(['data' => $item]);
				
			}
			else
			{
			  http_response_code(405);
			  // $e->oci_error($stmt);
			  // echo($e);
			}
		}
		catch(Exception $e){
			echo json_encode($e);
		}
		// $message is now populated with the output value
		// print "$user_id\n";
		// print "$prze_id\n";
		// print "$cena\n";
	}
?>