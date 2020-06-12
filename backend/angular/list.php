<?php
/**
 * Returns the list of sklep.
 */
require 'connect.php';
    
$hero = [];
//$sql = "SELECT * FROM HERO";
$sql = "SELECT * FROM przedmioty";

$stid = oci_parse($con, $sql);
oci_execute($stid);


if(oci_execute($stid))
{
  $cr = 0;
  
  while($row = oci_fetch_array($stid, OCI_BOTH))
  {
	//echo $row[0] . " and " . $row['PRZE_ID']   . " are the same<br>\n";
   // echo $row[1] . " and " . $row['PRZE_NAZWA'] . " are the same<br>\n";
	//echo($cr);
    $item[$cr]['PRZE_ID'] = $row['PRZE_ID'];
    $item[$cr]['PRZE_NAZWA'] = $row['PRZE_NAZWA'];
	//echo json_encode($row['PRZE_NAZWA']);
	$item[$cr]['PRZE_OPIS'] = $row['PRZE_OPIS'];
	$item[$cr]['PRZE_CENA'] = $row['PRZE_CENA'];
	$item[$cr]['PRZE_IMAGE'] = $row['PRZE_IMAGE'];
	$item[$cr]['KATE_ID'] = $row['KATE_ID'];
	$cr++;

  }
  echo json_encode(['data' => $item]);
}
else
{
  http_response_code(404);
}
?>