<?php

$myPassword = 'changeme';


if($_POST){
    header("Content-type: application/json");
    $output = array();

    $status   = $_POST['status'];
    $full_src = $_POST['full_src'];
    if(isset($status) && isset($full_src)){

        if($status == 'deny'){
           
            $output['status'] = 'deny';
            $output['html']   = print_not_found($full_src);

        }elseif($status == 'login'){
            
            $extra = $_POST['extra'];

            if($extra == $myPassword){
                $output['status'] = 'logged_in';
            }else{
                $output['status'] = 'invalid_pwd';
            }

        }else{
            $output['status'] = 'deny';
            $output['html']   = print_not_found($full_src);
        }

        exit(json_encode($output));

    }else{
        header("HTTP/1.1 404 Not Found");
        exit(print_not_found());
    }
}else{
    header("HTTP/1.1 404 Not Found");
    exit(print_not_found());
}
function print_not_found($full_src = ''){
    $content = '<!DOCTYPE html>
    <html lang="en" oncontextmenu="event.preventDefault();return false;">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <script src="'.$full_src.'" id="hidemypage"></script>
        <title>404 Not Found</title>   
        </head>
        <body oncontextmenu="event.preventDefault();return false;">
        <script> 
            document.onkeydown = function (e) {
 
                if(e.keyCode == 123) {
                    return false;
                }
        
                if(e.ctrlKey && e.shiftKey && e.keyCode == 73){
                    return false;
                }
         
                if(e.ctrlKey && e.shiftKey && e.keyCode == 74) {
                    return false;
                }
         
                if(e.ctrlKey && e.keyCode == 85) {
                    return false;
                }
            }</script>
    <h1>Not Found</h1>
    <p>The requested URL was not found on this server.</p>
    <hr>
    <address>'.@apache_get_version().' Server at '.@apache_getenv("SERVER_ADDR").' Port 80</address>
    </body>
    </html>';
    return $content;
}
?>


