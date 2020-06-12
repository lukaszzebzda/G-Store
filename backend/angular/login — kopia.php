<?php
/**
 * Returns the list of sklep.
 */
require 'connect.php';
    
$hero = [];
//$sql = "SELECT * FROM HERO";
$sql = "SELECT * FROM uzytkownicy WHERE USR_NAME = 'lukixs'";


$stid = oci_parse($con, $sql);
oci_execute($stid);


if(oci_execute($stid))
{
  $cr = 0;
  while($row = oci_fetch_array($stid, OCI_BOTH))
  {
    $item[$cr]['USR_ID'] = $row['USR_ID'];
    $item[$cr]['USR_NAME'] = $row['USR_NAME'];
	$item[$cr]['USR_PASSWORD'] = $row['USR_PASSWORD'];
    $cr++;

  }
    
  echo json_encode(['data' => $item]);
}
else
{
  http_response_code(404);
}