<?php
/**
 * Using procedure say hello.
 */
require 'connect.php';

 $sql = 'BEGIN sayHello(:name,:id,:message); END;';
 
 $stmt = oci_parse($con,$sql);
 
 // Bind the input parameter
 oci_bind_by_name($stmt,':name',$name,32);
 
 // Bind the input parameter
 oci_bind_by_name($stmt,':id',$id,32);
 
 // Bind the output parameter
 oci_bind_by_name($stmt,':message',$message,32);
 
 // Assign a value to the input 
 $name = 'Harry';
 $id = 1;
 
 oci_execute($stmt);
 
 // $message is now populated with the output value
 print "$message\n";

?>