<?php
include("database.php");
$postdata = file_get_contents("php://input");

if(isset($postdata) && !empty($postdata))
{
$request = json_decode($postdata);
$email = mysqli_real_escape_string($mysqli, trim($request->email));
$name = $request->name;
$user_id=$request->user_id;
$old_designation=$request->old_designation;
$new_designation=$request->new_designation;
$reason=$request->reason;
$district=$request->district;

$sql = "INSERT INTO role_change(email_id,name,user_maser_id,old_designation,new_designation,reason,approval,district) VALUES ('$email','$name','$user_id','$old_designation','$new_designation','$reason','pending','$district')";
if ($mysqli->query($sql) === TRUE) {
$authdata = [
'email'=>$email,
'name'=>$name,
'user_maser_id'=>$user_id,
'old_designation'=>$old_designation,
'new_designation' => $new_designation,
'reason' => $reason,
// 'date'=>$location_id,
'approval' =>'pending',
'district'=>$district

];
echo json_encode($authdata);
} }
?>