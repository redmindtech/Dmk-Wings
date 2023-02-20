<?php
$curl = curl_init();



        curl_setopt_array($curl, array(
            CURLOPT_URL => 'https://graph.facebook.com/v15.0/115641688109792/messages',
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_ENCODING => '',
            CURLOPT_MAXREDIRS => 10,
            CURLOPT_TIMEOUT => 0,
            CURLOPT_FOLLOWLOCATION => true,
            CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
            CURLOPT_CUSTOMREQUEST => 'POST',
            CURLOPT_POSTFIELDS     => json_encode(array(
                'messaging_product' => "whatsapp",
                'recipient_type'    => "individual",
                'to'                => '919791603352',
                'type'              => "template",
               
                'template'          => array(
                    'name'     => "template2",
                //    ' language-and-locale-code'=>"en_US",
                
                    'language' => array(
                        // // 'code' => "ode",
                        //  'code' => " English (United States)",
                        'code' => "en_US"
                        // "language"=>{"code":"en_US"}
                    ),
            //         'components'=> array(
            //             array(
            //                 'type'=>"body",
            //                 'parameters'=> array(
            //                     array(
            //                     'type'=>"text",
            //                     'text'=>'online',
            //     ),
            //     array(
            //         'type'=>"text",
            //         'text'=>'4-3-23/4pm',
            //          )
            //       )
            //      )
            //  )
             )
            )),
           
           
            CURLOPT_HTTPHEADER     => array(
                'Authorization: Bearer EAAHROdmfOsUBAL1u6KZCdxV7P28Ny4YSTrzIYTlYEfXS06ZC272jBNZCPQNqDlqU9I8rZCEpHTeLTDB3pYU1nf1tldZCiEHKzJveecPZC93ni6PZAdwLZBKe3EZBSYZBovGT0a3ZC5EAcZCm23qcJ6d6yOlPD5KWM3e0PkrFiUj1YuqfraQotZA3n3aZAK',
                'Content-Type: application/json',
            ),
        ));

        $response = curl_exec($curl);
        curl_close($curl);
         echo $response;
        
    // }
    // echo json_encode($authdata);
    //  }
     ?>