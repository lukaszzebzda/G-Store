<?php

require 'connect.php';

$sql = '';
$sql = 'begin show_categories(:cursbv); end;';

$curs = oci_new_cursor($con);
$stid = oci_parse($con, $sql);


oci_bind_by_name($stid, ":cursbv", $curs, -1, OCI_B_CURSOR);



if(oci_execute($stid) and oci_execute($curs)){
	$cr = 0;
	while($row = oci_fetch_array($curs, OCI_ASSOC+OCI_RETURN_NULLS)){
		$item[$cr]['KATE_ID'] = $row['KATE_ID'];
		$item[$cr]['KATE_NAZWA'] = $row['KATE_NAZWA'];
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