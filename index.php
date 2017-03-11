<!DOCTYPE html>
<html>
<?php
// ini_set('display_errors',1);
// ini_set('display_startup_errors',1);
// error_reporting(E_ALL|E_STRICT);

//	Import the Functions
require_once("tweeview.php");

if(isset($_GET["id"])) {
	$twid = $_GET["id"];
} else {
	//	Default conversation to view
	$twid = "837429292476825600";
}

$error = "";
if(isset($_GET["error"])) {
	$error = "alert('That is not a valid Twitter status URL. It should look like https://twitter.com/edent/status/837429292476825600');";
}

$conversation = get_conversation($twid);

?>
<head>
	<title>TweeView</title>
	<meta charset="UTF-8">
	<script src="https://d3js.org/d3.v4.min.js"></script>
	<script src="tweet_parser.js?cache=1"></script>
	<script>
	// Find the right method, call on correct element
	function launchIntoFullscreen(element) {
		if(element.requestFullscreen) {
			element.requestFullscreen();
		} else if(element.mozRequestFullScreen) {
			element.mozRequestFullScreen();
		} else if(element.webkitRequestFullscreen) {
			element.webkitRequestFullscreen();
		} else if(element.msRequestFullscreen) {
			element.msRequestFullscreen();
		}
	}
	</script>

	<link rel="stylesheet" href="https://cdn.jsdelivr.net/semantic-ui/2.2.8/semantic.min.css">
	<style type="text/css">
		body {
			overflow-y: hidden;
		}
		a {
			cursor: pointer;
		}
		input {
			width: 100%;
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
			width: 75%;
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
			width: 25%;
			background: #eee;
			overflow-x: hidden;
		}

		#infoBox {
			padding: 18px;
			background-color: #fff;
			box-shadow: 0 1px 10px #ccc;
			/*position: absolute;*/
		}

		/* Bottom Bar */
		#bottom {
			position: absolute;
			bottom: 5px;
			left: 5px;
			color: #eee;
			background-color: rgba(51, 51, 51, 0.8);
		}

		/* Feed-related elements */
		#feedContainer {
			overflow-y: auto;
			/*position: absolute;*/
			bottom: 0;
			top: 0;
			/*padding-top: 120px;*/
			width: 100%;
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
			</svg>
			<div id="bottom"> Colours represent reply times:
				<span style="color: #FA5050; margin: 20px;">5&nbsp;minutes</span>
				<span style="color: #E9FA50; margin: 20px;">10&nbsp;minutes</span>
				<span style="color: #F5F1D3; margin: 20px;">1&nbsp;hour</span>
				<span style="color: #47D8F5; margin: 20px;">3&nbsp;hours+</span>
				<button id="fs" onclick="launchIntoFullscreen(document.documentElement);"><span style="color: #000000;">Go Full Screen</span></button>
			</div>
		</div>
		<div id="sidebar">
			<div id="feedContainer">
				<div id="infoBox">
					<p>Welcome to <a href="https://github.com/edent/TweeView">TweeView</a> - a Tree-based way to visualise Twitter conversations.</p>
					<form action="importer.php" method="post">
						<input type="url" name="url" required placeholder="Paste a Twitter status URL here...">
						<button>Generate TweeView</button>
					</form>
				</div>
				<div id="feedInner">
					<div class="ui comments" id="feed">
					</div>
				</div>
			</div>
		</div>
	</div>
	<script id="initialization"><?php echo $conversation; ?></script>
	<script><?php echo $error; ?></script>
</body>
</html>
