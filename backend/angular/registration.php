<?php
/**
 * Returns the list of sklep.
 */
require 'connect.php';
  
$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
if(isset($postdata) && !empty($postdata))
{

	
	
	
    $sql = 'begin registration(:username, :pwd, :email, :phone, :p_val); end;';
  

	$stid = oci_parse($con, $sql);

	$name = trim($request->name);
    $email = trim($request->email);
	//$birt = trim($request->birt);
	$tel = trim($request->tel);
	$pwd = trim($request->pwd);
	$id;
	
	oci_bind_by_name($stid,':email',$email,32);
	oci_bind_by_name($stid,':pwd',$pwd,32);
	oci_bind_by_name($stid,':phone',$tel,32);
	oci_bind_by_name($stid,':username',$name,32);

	

	oci_bind_by_name($stid, ":p_val", $id);
	if (oci_execute($stid)) {
	
	
    $authdata = [
      'USR_NAME' => $name,
	  'USR_EMAIL' => $email,
	  'USR_PASSWORD' => '',
      'Id' => $id
    ];
    echo json_encode($authdata);
 
}
}
?>