<?php
$curl = curl_init();



        curl_setopt_array($curl, array(
            CURLOPT_URL => 'https://graph.facebook.com/v15.0/105852852434085/messages',
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
                'to'                =>'916385567748',
                'type'              => "template",
               
                'template'          => array(
                    'name'     => "create_meeting",
                    'language' => array(
                        'code' => "en_US",
                    ),
                    'components'=> array(
                        array(
                            'type'=>"body",
                            'parameters'=> array(
                                array(
                                'type'=>"text",
                                'text'=>'RAGA'
                ),
                array(
                    'type'=>"text",
                    'text'=>"12/3/2023"
                     )
                  )
                 )
             ))
            )),           
           
            CURLOPT_HTTPHEADER     => array(
                'Authorization: Bearer EAAV28ZAOnmikBAHotn8bvL8yO63rV40Nnn4oOwEqxT9ZCUHqgdvKcPfw7oi0iZBz9nlR5eZCJbYQF0OTRcOi6HduOPj9lyzpbi2ZCFtgZCWLXHjlU4mppm4guiJziEkD7bLcZAaqtYXc2vJqmunug8icQLZClG53LoxJnGcOjHz9z9R2XRZCFzSG15NSQJggcWFNipZB9BhycQwZAUCSP8cFAvI',
                'Content-Type: application/json',
            ),
        ));

        $response = curl_exec($curl);
        curl_close($curl);
          echo $response;
        
     ?>
