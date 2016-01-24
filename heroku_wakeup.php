<?php
// Heroku server disconnects after an hour of downtime
// Wake up it with cron

$url   = 'http://phonemodelbot.herokuapp.com';
$agent = 'Mozilla/5.0 (Windows; U; Windows NT 6.1; en-US; rv:1.9.2.12) Gecko/20101026 Firefox/3.6.12';

$ch = curl_init();
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
curl_setopt($ch, CURLOPT_VERBOSE,        true);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_USERAGENT,      $agent);
curl_setopt($ch, CURLOPT_URL,            $url);

curl_exec($ch);
?>