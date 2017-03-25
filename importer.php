<?php

//	Get the URL sent by the main page
$url = $_POST["url"];

// A valid Twitter Status URL should look like
//	https://twitter.com/edent/status/837429292476825600

//	Is this a URL?
if (filter_var($url, FILTER_VALIDATE_URL) === false) {
	error();
} else {
	$parsed_url = parse_url($url);
	//	Make sure it came from Twitter
	if ("twitter.com" != $parsed_url["host"]) {
		error();
	}

	//	Look at the path - get the status number
	$pieces = explode("/", $parsed_url["path"]);
	if (intval($pieces[3]) > 0) {
		$query = "index.php?id=" . $pieces[3];

		//	Any extras
		if(isset($_POST['rt'])){
			$query .= "&rt";
		}

		if(isset($_POST['fav'])){
			$query .= "&fav";
		}

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
