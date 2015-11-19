<?php
// Transparent 1px by 1px PNG
function displayImage() {
	header('Content-Type: image/png');
	echo base64_decode('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABAQMAAAAl21bKAAAAA1BMVEUAAACnej3aAAAAAXRSTlMAQObYZgAAAApJREFUCNdjYAAAAAIAAeIhvDMAAAAASUVORK5CYII=');
}

function getClientId() {
	return $_GET['cid'] == '' ? generateUuid() : $_GET['cid'];
}

function generateUuid() {
	return sprintf(
		'%04x%04x-%04x-%04x-%04x-%04x%04x%04x',
		mt_rand(0, 0xffff),
		mt_rand(0, 0xffff),
		mt_rand(0, 0xffff),
		mt_rand(0, 0x0fff) | 0x4000,
		mt_rand(0, 0x3fff) | 0x8000,
		mt_rand(0, 0xffff),
		mt_rand(0, 0xffff),
		mt_rand(0, 0xffff)
	);
}

function buildParameters() {
	return array(
		'v' => 1,
		'tid' => 'UA-3638032-11', //set tracking ID here
		'ds' => 'collect.php',
		'z' => $_GET['z'],
		'cid' => getClientId(),
		'uip' => $_SERVER['REMOTE_ADDR'],
		'ua' => $_SERVER['HTTP_USER_AGENT'],
		'dr' => $_GET['dr'],
		'sr' => $_GET['sr'],
		'vp' => $_GET['vp'],
		'de' => $_GET['de'],
		'sd' => $_GET['sd'],
		'ul' => $_GET['ul'],
		'je' => $_GET['je'],
		'fl' => $_GET['fl'],
		't' => 'event',
		'ni' => 1,
		'dl' => $_GET['dl'],
		'dt' => $_GET['dt'],
		'ec' => 'universal analytics on ' . $_GET['dl'],
		'ea' => $_GET['ea'],
		'el' => ''
	);
}

function sendEvent($parameters) {
	$curl = curl_init();
	curl_setopt_array($curl, array(
		CURLOPT_USERAGENT => $_SERVER['HTTP_USER_AGENT'],
		CURLOPT_URL => 'https://www.google-analytics.com/collect',
		CURLOPT_POST => count($parameters),
		CURLOPT_POSTFIELDS => http_build_query($parameters),
		CURLOPT_RETURNTRANSFER => true
	));
	curl_exec($curl);
	curl_close($curl);
}

$parameters = buildParameters();
sendEvent($parameters);
displayImage();
?>