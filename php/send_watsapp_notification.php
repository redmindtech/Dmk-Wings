<?php
$number = ['919500195940'];

$curl = curl_init();

curl_setopt_array($curl, array(
    CURLOPT_URL            => 'https://graph.facebook.com/v15.0/105852852434085/messages',
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_ENCODING       => '',
    CURLOPT_MAXREDIRS      => 10,
    CURLOPT_TIMEOUT        => 0,
    CURLOPT_FOLLOWLOCATION => true,
    CURLOPT_HTTP_VERSION   => CURL_HTTP_VERSION_1_1,
    CURLOPT_CUSTOMREQUEST  => 'POST',
    CURLOPT_POSTFIELDS     => json_encode(array(
        'messaging_product' => "whatsapp",
        'recipient_type'    => "individual",
        'to'                => "918300761317",
        'type'              => "template",
        'template'          => array(
            'name'     => "create_meeting",
            'language' => array(
                'code' => "en_US",
            ),
            'components' => array(
                 array(
                'type' => "body",
                'parameters' => array(
                    array(
                        'type' => "text",
                        'text' => "Shyamala"
                    ),
                    array(
                        'type' => "text",
                        'text' => "15-02-2023"
                    )
                )
            )
            ))
    )),
    CURLOPT_HTTPHEADER     => array(
        'Authorization: Bearer EAAV28ZAOnmikBAFkrTO64LDOptkSZBl0T7a5GGw8PBZBRr4pIRlxZCHAEgaltZBiliDVFXudqz6oiVRgrBMCR2vB00tFiWjPyLLnSvZCdOIrWhVzQLA8K8ukuRZA0cpormDt5c9mVM4a4APepM4rks8SP7kp9VD1uNlaywVQcP9rxQ3SxGmE8T48TlaXnveoQhFeoQIBZB7z2P28KbZCSHwUk',
        'Content-Type: application/json',
    ),
));

$response = curl_exec($curl);
curl_close($curl);
echo $response;