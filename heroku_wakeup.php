<?php
// Heroku server disconnects after an hour of downtime
// Wake up it with cron

$url  = 'http://phonemodelbot.herokuapp.com';
$agent= 'Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1; SV1; .NET CLR 1.0.3705; .NET CLR 1.1.4322)';

$ch = curl_init();
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
curl_setopt($ch, CURLOPT_VERBOSE,        true);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_USERAGENT,      $agent);
curl_setopt($ch, CURLOPT_URL,            $url);

curl_exec($ch);
?>