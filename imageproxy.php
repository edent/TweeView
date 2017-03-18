<?php
	//	Get the image URL variables
	$image_path = urldecode($_GET["path"]);

	$avatar_URL_normal = "https://pbs.twimg.com/profile_images/" . $image_path;

	//	There is *usually* a bigger image.
	$avatar_URL = str_replace('_normal.', '.', $avatar_URL_normal);

	//	Set up the global variables
	$curl = curl_init();
	$content_type = "";

	function get_image($url) {
		global $curl, $content_type;
		curl_setopt($curl, CURLOPT_URL, $url);
		curl_setopt($curl, CURLOPT_HEADER, false);
		curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
		curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, false);

		$image = curl_exec($curl);
		//	We need the content type to differentiate between JPG, PNG, etc.
		$content_type = curl_getinfo($curl, CURLINFO_CONTENT_TYPE);
		return $image;
	}

	//	Try to get the image
	$image = get_image($avatar_URL);

	// Check HTTP status code
	if (!curl_errno($curl)) {
		switch ($http_code = curl_getinfo($curl, CURLINFO_HTTP_CODE)) {
			case 200:  # OK
				break;
			case 404:
				//	Kill the old curl
				curl_close ($curl);
				$curl = curl_init();
				//	Try again with the smaller avatar
				$image = get_image($avatar_URL_normal);
				break;
			default:
				echo 'Unexpected HTTP code: ', $http_code, "\n";
				die();
		}
	} else {
		die();
	}

header('Content-type: ' . $content_type);
echo $image;
curl_close ($curl);
die();
