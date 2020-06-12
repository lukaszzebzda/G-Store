<?php

define('DB_HOST', 'localhost/sklep');
define('DB_USER', 'sklep');
define('DB_PASS', 'sklep');


function connect(){
	
	$connect = oci_connect(DB_USER,DB_PASS,DB_HOST);
	if(!$connect){
		$e = oci_error();
		trigger_error(htmlentities($e['message'], ENT_QUOTES), E_USER_ERROR);
	}
	
	return $connect;
}

$con = connect();
		