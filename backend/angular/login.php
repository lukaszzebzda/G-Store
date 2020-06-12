<?php
/**
 * Returns the list of sklep.
 */
require 'connect.php';
  
$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
 
if(isset($postdata) && !empty($postdata))
{

	$sql = 'begin login(:email, :pwd, :cursbv); end;';


	$curs = oci_new_cursor($con);
	$stid = oci_parse($con, $sql);

	// Assign a value to the input 
	$email = trim($request->email);
	$pwd = trim($request->password);
	
	// Bind the input parameter
	oci_bind_by_name($stid,':email',$email,32);
	oci_bind_by_name($stid,':pwd',$pwd,32);
	oci_bind_by_name($stid, ":cursbv", $curs, -1, OCI_B_CURSOR);

	if(oci_execute($stid) and oci_execute($curs))
	{
	  $cr = 0;
	  while($row = oci_fetch_array($curs, OCI_ASSOC+OCI_RETURN_NULLS))
	  {
		$item[$cr]['USR_ID'] = $row['USR_ID'];
		$item[$cr]['USR_NAME'] = $row['USR_NAME'];
		$item[$cr]['USR_EMAIL'] = $row['USR_EMAIL'];
		$item[$cr]['USR_BIRT'] = 'Heh';
		$item[$cr]['USR_TEL'] = $row['USR_TEL'];
		$item[$cr]['USR_PASSWORD'] = 'password';
		$item[$cr]['USR_PERMISSION'] = 1;
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