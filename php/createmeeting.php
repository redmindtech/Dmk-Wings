<?php

include("database.php");
 
// $postdata = file_get_contents("php://input");
// if(isset($postdata) && !empty($postdata))
//     {
//     $request = json_decode($postdata);
//     $meeting_name=$request->meeting_name;
//     $meeting_time=$request->meeting_time;
//     $meeting_date = $request->meeting_date;
//     $participants = $request->participants;
//     $constituency = $request->constituency;
//     $meeting_type = $request->meeting_type;
//     $meeting_location = $request->meeting_location;	
//     $comments = $request->comments;



// $sql = "INSERT INTO meetings ( date, time, meeting_location, meeting_name, meeting_type,  participants, constituency, comments,status)VALUES ( '$meeting_date', '$meeting_time', '$meeting_location', '$meeting_name', '$meeting_type',  '$participants', '$constituency', '$comments','Active')";
// if ($mysqli->query($sql) === TRUE) {
//     $authdata = [
//         'meeting_name'=>$meeting_name,
//        'meeting_time'=>$meeting_time,
//         'meeting_date' => $meeting_date,
//         'participants' => $participants,
//         'constituency' => $constituency,
//         'meeting_type' => $meeting_type,
//         'meeting_location' =>$meeting_location,	
//         'comments' => $comments,
//         'status' => 'Active'
//     ];
//     // echo json_encode($authdata);
//     }
$district=['SALEM','ERODE'];
$participants=2;
    if($participants == 1)
    {
        $sql="SELECT  id,whatsapp_no,email,district,CONCAT(firstname,' ',lastname) as name FROM user_master where category='OB'";
        if ($result = mysqli_query($mysqli, $sql)) {
            $cr = 0;
            while ($row = mysqli_fetch_assoc($result)) {
               $show_user[$cr]['id'] = $row['id'];
               $show_user[$cr]['name'] = $row['name'];
               $show_user[$cr]['whatsapp_no'] = $row['whatsapp_no'];
               $show_user[$cr]['email'] = $row['email'];     
               $show_user[$cr]['district'] = $row['district'];         
               $cr++;
  }
  echo json_encode(['data' =>  $show_user]);
}}
else if($participants == 2){

    $sql="SELECT id,whatsapp_no,email,district,CONCAT(firstname,' ',lastname) as name FROM user_master WHERE district IN ($district);";
        if ($result = mysqli_query($mysqli, $sql)) {
            $cr = 0;
            while ($row = mysqli_fetch_assoc($result)) {
               $show_user[$cr]['id'] = $row['id'];
                $show_user[$cr]['name'] = $row['name'];
               $show_user[$cr]['whatsapp_no'] = $row['whatsapp_no'];
               $show_user[$cr]['email'] = $row['email'];      
               $show_user[$cr]['district'] = $row['district'];         
               $cr++;
  }
  echo json_encode(['data' =>  $show_user]);
}
else {
  http_response_code(404);
}

          
    }
// }
    //  $number = ['971501843028'];
//      $number = ['919791603352'];
//     $date1 = date_create("$meeting_date");
//    $date= date_format($date1,"d/m/Y ");
// $count= count($number); 

// for( $i=0;$i<$count;$i++){
// $curl = curl_init();


//         curl_setopt_array($curl, array(
//             CURLOPT_URL => 'https://graph.facebook.com/v15.0/115641688109792/messages',
//             CURLOPT_RETURNTRANSFER => true,
//             CURLOPT_ENCODING => '',
//             CURLOPT_MAXREDIRS => 10,
//             CURLOPT_TIMEOUT => 0,
//             CURLOPT_FOLLOWLOCATION => true,
//             CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
//             CURLOPT_CUSTOMREQUEST => 'POST',
//             CURLOPT_POSTFIELDS     => json_encode(array(
//                 'messaging_product' => "whatsapp",
//                 'recipient_type'    => "individual",
//                 'to'                => $number[$i],
//                 'type'              => "template2",
               
//                 'template'          => array(
//                     'name'     => "create_meeting",
//                     'language' => array(
//                         'code' => "en_US",
//                     ),
//                     'components'=> array(
//                         array(
//                             'type'=>"body",
//                             'parameters'=> array(
//                                 array(
//                                 'type'=>"text",
//                                 'text'=>$meeting_type,
//                 ),
//                 array(
//                     'type'=>"text",
//                     'text'=>$meeting_date
//                      )
//                   )
//                  )
//              ))
//             )),
           
           
//             CURLOPT_HTTPHEADER     => array(
//                 'Authorization: Bearer EAAHROdmfOsUBAL1u6KZCdxV7P28Ny4YSTrzIYTlYEfXS06ZC272jBNZCPQNqDlqU9I8rZCEpHTeLTDB3pYU1nf1tldZCiEHKzJveecPZC93ni6PZAdwLZBKe3EZBSYZBovGT0a3ZC5EAcZCm23qcJ6d6yOlPD5KWM3e0PkrFiUj1YuqfraQotZA3n3aZAK',
//                 'Content-Type: application/json',
//             ),
//         ));

//         $response = curl_exec($curl);
//         curl_close($curl);
//         // echo $response;
        
//     }
//     echo json_encode($authdata);
//
// }