<?php

//	Get the URL sent by the main page
$url = $_POST["url"];
$url = trim($url);
// A valid Twitter Status URL should look like
//	https://twitter.com/edent/status/837429292476825600

$page = $_POST["page"];

//	Is this a URL?
if (filter_var($url, FILTER_VALIDATE_URL) === false) {
	var_dump($_POST);
	die();
} else {
	$parsed_url = parse_url($url);
	//	Make sure it came from Twitter
	if ("twitter.com" != $parsed_url["host"]) {
		error("Not a Twitter URL");
	}

	//	Look at the path - get the status number
	$pieces = explode("/", $parsed_url["path"]);
	if (intval($pieces[3]) > 0) {
		$query = "{$page}?id=" . $pieces[3];

		//	Redirect
		header("Location: $query");
		exit;
	}
}

error("Something went wrong. Sorry!");

function error($message){
	$query = "index.php?id=0&error=1";
	header("Location: $query");
	exit;
}
