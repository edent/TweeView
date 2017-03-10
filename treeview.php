<!DOCTYPE html>
<html>
<?php
function twitter_format($tweet) {
	//	Twitter Entities to HTML adapted from http://stackoverflow.com/a/15390225/1127699
	$text = $tweet['full_text']; //	Using full_text to get extended tweets
	$entities = isset($tweet['entities']) ? $tweet['entities'] : array();

	$replacements = array();
	if (isset($entities['hashtags'])) {
		foreach ($entities['hashtags'] as $hashtag) {
			list ($start, $end) = $hashtag['indices'];
			$replacements[$start] = array($start, $end,
			"<a href=\"https://twitter.com/search?q={$hashtag['text']}\">#{$hashtag['text']}</a>");
		}
	}
	if (isset($entities['urls'])) {
		foreach ($entities['urls'] as $url) {
			list ($start, $end) = $url['indices'];
			$replacements[$start] = array($start, $end,
			"<a href=\"{$url['expanded_url']}\">{$url['display_url']}</a>");
		}
	}
	if (isset($entities['user_mentions'])) {
		foreach ($entities['user_mentions'] as $mention) {
			list ($start, $end) = $mention['indices'];
			$replacements[$start] = array($start, $end,
			"<a href=\"https://twitter.com/{$mention['screen_name']}\">@{$mention['screen_name']}</a>");
		}
	}
	if (isset($entities['media'])) {
		foreach ($entities['media'] as $media) {
			list ($start, $end) = $media['indices'];
			$replacements[$start] = array($start, $end,
			"<a href=\"{$media['url']}\">{$media['display_url']}</a>");
		}
	}

	// sort in reverse order by start location
	krsort($replacements);

	foreach ($replacements as $replace_data) {
		list ($start, $end, $replace_text) = $replace_data;
		//	Twitter counts by CHARACTER - so you need a Multibyte aware PHP installation
		$text = mb_substr($text, 0, $start, 'UTF-8').$replace_text.mb_substr($text, $end, NULL, 'UTF-8');
	}

	return $text;
}
?>
<head>
	<title>TweeView</title>
	<meta charset="UTF-8">
	<script src="https://d3js.org/d3.v4.min.js"></script>
	<script src="tweet_parser.js"></script>
	<link rel="stylesheet" href="https://cdn.jsdelivr.net/semantic-ui/2.2.8/semantic.min.css">
	<style type="text/css">
		a {
			cursor: pointer;
		}
		/* Tree containers */

		#tree {
			width: 100%;
			height: 100%;
			background-color: #333;
		}

		#treeContainer {
			position: absolute;
			top: 0;
			left: 0;
			bottom: 0;
			right: 500px;
		}

		.selected rect {
			stroke: #f55;
			stroke-width: 4px;
		}
		/* Sidebar and info box styles. */

		#sidebar {
			position: absolute;
			top: 0;
			right: 0;
			bottom: 0;
			width: 500px;
			background: #eee;
			overflow-x: hidden;
		}

		#infoBox {
			padding: 18px;
			background-color: #fff;
			box-shadow: 0 1px 10px #ccc;
			position: absolute;
		}
		/* Feed-related elements */

		#feedContainer {
			overflow-y: scroll;
			position: absolute;
			bottom: 0;
			top: 0;
			padding-top: 120px;
		}

		#feedInner {
			padding: 18px;
		}
		/* Tweet content styles */

		.text {
			white-space: pre-wrap;
		}

		.text a.twitter-atreply s {
			text-decoration: none;
		}

		.text .Emoji,
		.text .twitter-hashflag-container img {
			height: 1.25em;
			vertical-align: -0.3em;
		}

		.text .u-hidden {
			display: none;
		}

		.text b {
			font-weight: normal;
		}

		.u-hiddenVisually {
			display: none;
		}

		.dropzone {
			padding: 10px;
			border: 1px dashed #aaf;
			background-color: #f4f4f4;
			text-align: center;
			color: #888;
		}
	</style>
</head>
<body>
	<div id="page">
		<div id="treeContainer">
			<svg id="tree">
				<style>
					.has_more_icon {
						visibility: hidden;
					}
					.has_more .has_more_icon {
						visibility: visible;
					}
				</style>
				<defs>
					<symbol id="has_more">
						<g transform="translate(20 20)">
							<circle r="18" fill="#800" stroke-width="2px" stroke="#fff" stroke-location="inside"></circle>
							<circle r="3" cx="-9" fill="#fff"></circle>
							<circle r="3" cx="0" fill="#fff"></circle>
							<circle r="3" cx="9" fill="#fff"></circle>
						</g>
					</symbol>
				</defs>
			</svg>
			<div style="position: absolute; bottom: 5px; left: 5px; color: #eee; background-color: rgba(51, 51, 51, 0.8);"> Colors represent reply times:
				<span style="color: #FA5050; margin: 20px;">5&nbsp;minutes</span>
				<span style="color: #E9FA50; margin: 20px;">10&nbsp;minutes</span>
				<span style="color: #F5F1D3; margin: 20px;">1&nbsp;hour</span>
				<span style="color: #47D8F5; margin: 20px;">3&nbsp;hours+</span>
			</div>
		</div>
		<div id="sidebar">
			<div id="feedContainer">
				<div id="feedInner">
					<div class="ui comments" id="feed">
					</div>
				</div>
			</div>
			<div id="infoBox">
				<p>Welcome to TweeView - a Tree-based way to visualise Twitter conversations.</p>
			</div>
		</div>
	</div>
	<script id="initialization">
<?php
// ini_set('display_errors',1);
// ini_set('display_startup_errors',1);
// error_reporting(E_ALL|E_STRICT);

//	Get CodeBird (https://github.com/jublonet/codebird-php)
require_once ('codebird.php');
//	Get the API keys
require_once("config.php");

//	We get the Conversation ID from `?id=839241756520628224`
if(isset($_GET["id"])) {
	$twid = $_GET["id"];
} else {
	//	The default ID
	//	This is from the thread introducing this
	$twid = "837429292476825600";
}

//	Initialise CodeBird
\Codebird\Codebird::setConsumerKey($consumer_key, $consumer_secret);
$cb = \Codebird\Codebird::getInstance();
$cb->setToken($access_token, $access_token_secret);

//	We want data returned as an array
$cb->setReturnFormat(CODEBIRD_RETURNFORMAT_ARRAY);

function execute_codebird($function, $api_options = NULL) {
	GLOBAL $cb;
	//	Add alt tags
	//	https://blog.twitter.com/2016/alt-text-support-for-twitter-cards-and-the-rest-api
	$api_options['include_ext_alt_text']=true;
	//	Add Long Text Supported
	//	https://dev.twitter.com/overview/api/upcoming-changes-to-tweets
	$api_options['tweet_mode']='extended';
	try {
		$result = $cb->$function($api_options);
		if($result->errors) {
			//	Twitter returned an error to be displayed to the user.
			$error_message = $result->errors[0]->message;
			$error_code = $result->errors[0]->code;
			echo "<h2>"._(ERROR)."</h2>"."<p>".sprintf(_(ERROR_TWITTER_MESSAGE), $error_message, $error_code)."</p>";
			die();
		}
		return $result;
	} catch (Exception $e) {
		//	General error occurred$api_options
		echo "<pre>".sprintf(_(ERROR_TWITTER_MESSAGE), $e->getMessage(), $e->getCode())."</pre>";
		die();
	}
}

//	Is this the maximum number we can get from the API?
//	Can we page through these results?
$api_options = array("id" => $twid, "count" => "200");

//	Use the monkey-patched API call
$conversation = execute_codebird("conversation_show_ID",$api_options);

//	Remove elements we don't care about
unset($conversation['httpstatus']);
unset($conversation['rate']);

// print_r($conversation);

//	Iterate through the data, getting every individual post
$references = array();
foreach ($conversation as $post)
{
	//	Get the data from the post
	$id = $post['id_str'];
	$parent = $post['in_reply_to_status_id_str'];
	$text = $post['full_text'];
	$bodyHTML = twitter_format($post);
	$username = $post['user']['screen_name'];
	$name = $post['user']['name'];
	$avatar = $post['user']['profile_image_url_https'];
	$time = strtotime($post['created_at'])*1000;

	//	Place the post in the array based on its ID
	$references[$id] = array(
		"tweet" => array(
			"reply_to" => $parent,
			"images"   => array(),	//	TODO
			"username" => htmlspecialchars($username,ENT_QUOTES),
			"name"     => htmlspecialchars($name,ENT_QUOTES),
			"bodyText" => htmlspecialchars($text,ENT_QUOTES),
			"bodyHtml" => $bodyHTML,
			"id"       => $id,
			"avatar"   => $avatar,
			"time"     => $time,
			"replies"  => 0,
		),
		"children" => array()
	);
}

//	Create the Tree
$tree = array();

//	Iterate through the references, using `&` means this is a reference,
//	http://php.net/manual/en/language.references.php
foreach ($references as &$post)
{
	$id = $post['tweet']['id'];
	$parentId = $post['tweet']['reply_to'];

	//	If this is the start of the conversation
	if (!$parentId)
	{
		$tree[] =& $references[$id];
	}
	//	If this is a reply, add it as a child of its parent
	else
	{
		$references[$parentId]['children'][] =& $post;
	}
	//	Clear the reference
	unset($post);
}
//	Get rid of all the null values - otherwise things screw up
$tree = array_filter($tree);

//	Pretty Print so we can visually assess if this has worked
$output = json_encode($tree,JSON_PRETTY_PRINT);
//	Trim the "[" and "]"
$output = substr($output, 1, -1);

//	Output into the JavaScript
echo "Treeverse.initializeForStaticData(document.getElementById('tweetContainer')," . $output .");";
?>
		</script>
	</body>
</html>
