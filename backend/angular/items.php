<?php

require 'connect.php';

$sql = '';
$sql = 'begin show_items(:cursbv); end;';

$curs = oci_new_cursor($con);
$stid = oci_parse($con, $sql);


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



// Funkcja ta daje mozliwosc odkodowania znakow zapisanych w ISO do UTF 8.
// Wymaga jednak zmian aby przyjmowac rowniez INT jak i DATE
//
//function utf8ize($d) {
//    if (is_array($d)) {
//        foreach ($d as $k => $v) {
//            $d[$k] = utf8ize($v);
//        }
//    } else if (is_string ($d)) {
//        return utf8_encode($d);
//    }
//    return $d;
//}

?>