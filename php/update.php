<?php
include("database.php");
$postdata = file_get_contents("php://input");
$mode = $_GET['mode'];
//state admin
if ($mode == 0) {
    if (isset($postdata) && !empty($postdata)) {
        $request = json_decode($postdata);
        $firstname = $request->firstname;
        $lastname = $request->lastname;
        $whatsapp_no=$request->whatsapp_no;
        //  $designation = $request->designation;
        $party_designation = $request->party_designation;
        $email = mysqli_real_escape_string($mysqli, trim($request->email));
        $status_approval = $request->approval_status;
         $user= $request->user_id;
         
        
        // $sql = "UPDATE tbl_dealer_info SET phone = '".$phone."', email = '".$email."', sfid = '".$sfid."', ... WHERE id = ".$idhidden;
         $sql = "UPDATE  user_master SET firstname = '".$firstname."', lastname='".$lastname."', whatsapp_no = '".$whatsapp_no."', party_designation = '".$party_designation."', email = '".$email."',approval_status = '".$status_approval."' where id =".$user;

        if ($mysqli->query($sql) === TRUE) {
            $authdata = [

                'firstname' => $firstname,
                'lastname' => $lastname,
                'designation' => $designation,
                'party_designation' => $party_designation,
                'email' => $email,
                'approval_status' => $status_approval,
                'whatsapp_no'=>$whatsapp_no

            ];
            // echo json_encode($authdata);
        }
    }
}
//district 
else if ($mode == 1) {
    if (isset($postdata) && !empty($postdata)) {
        $request = json_decode($postdata);
        $firstname = $request->firstname;
        $lastname = $request->lastname;
        $whatsapp_no=$request->whatsapp_no;
        // $designation = $request->designation;
        $party_designation = $request->party_designation;
        $district = $request->district;
        $email = mysqli_real_escape_string($mysqli, trim($request->email));
        $status_approval = $request->approval_status;
        $location_id = $request->location_id;
        $user_id= $request->user_id;

        $sql = "UPDATE  user_master SET firstname = '".$firstname."', lastname='".$lastname."',whatsapp_no='".$whatsapp_no."',party_designation ='". $party_designation."',email = '".$email."',district='".$district."', approval_status = '".$status_approval."' where id = ". $user_id;
        if ($mysqli->query($sql) === TRUE) {
            $authdata = [

                'firstname' => $firstname,
                'lastname' => $lastname,
                // 'designation' => $designation,
                'party_designation' => $party_designation,
                'district' => $district,
                'email' => $email,
                'whatsapp_no'=>$whatsapp_no,
                'approval_status' => $status_approval,

            ];
            echo json_encode($authdata);
        }
    }
}
//office bearer
else {
    if (isset($postdata) && !empty($postdata)) {
        $request = json_decode($postdata);


        $firstname = $request->firstname;
        $lastname = $request->lastname;
        $age = $request->age;
        $date_of_birth = $request->date_of_birth;
        $father_name = $request->father_name;      
        $educational_qualification = $request->educational_qualification;
        $additional_qualification = $request->additional_qualification;
        $contact_no = $request->contact_no;
        $whatsapp_no = $request->whatsapp_no;
        $email = mysqli_real_escape_string($mysqli, trim($request->email));
        $profession = $request->profession;
        $address1 = $request->address1;
        $applied_role = $request->applied_role;
        $party_comments = $request->party_comments;
        $user_id= $request->user_id;
        $mother_name=$request->mother_name;
        $district=$request->district;
        $constituency=$request->constituency;

        $sql = "UPDATE  user_master SET firstname = '".$firstname."',
        lastname='".$lastname."',
         age='".$age."', 
         date_of_birth='".$date_of_birth."', 
         father_name='".$father_name."',
          educational_qualification='".$educational_qualification."',
        additional_qualification='".$additional_qualification."',
        contact_no='".$contact_no."',
        whatsapp_no='".$whatsapp_no."',
        email = '".$email."',
        profession='".$profession."',
        address1='".$address1."',
        applied_role='".$applied_role."',
        party_comments='".$party_comments."',
        mother_name='".$mother_name."',
        district='".$district."',
        constituency ='".$constituency."'
         where id = ".$user_id;
        if ($mysqli->query($sql) === TRUE) {
            $authdata = [
                //'id' => mysqli_insert_id($mysqli)

                'firstname' => $firstname,
                'lastname' => $lastname,
                'age' => $age,
                'date_of_birth' => $date_of_birth,
                'father_name' => $father_name,
                'educational_qualification' => $educational_qualification,
                'additional_qualification' => $additional_qualification,
                'contact_no' => $contact_no,
                'whatsapp_no' => $whatsapp_no,
                'email' => $email,
                'profession' => $profession,
                'address1' => $address1,
                'applied_role' => $applied_role,
                'party_comments' => $party_comments,
                'mother_name'=>$mother_name,
                'district'=>$district,
                'constituency'=>$constituency

            ];
            echo json_encode($authdata);
        }
    }
}


?>