<!DOCTYPE html>
<html>
<?php

//	Import the Functions
require_once("tweeview.php");

if(isset($_GET["id"])) {
	$twid = $_GET["id"];
	$json = get_conversation($twid);
} else {
	//	Default conversation to view
	$json = file_get_contents("demo/small.json");
}

$error = "";
if(isset($_GET["error"])) {
	$error = "alert('That is not a valid Twitter status URL. It should look like https://twitter.com/edent/status/837429292476825600');";
}

?>
<head>
	<title>TweeView</title>
	<meta charset="UTF-8">
	<script src="/js//d3.v7.min.js"></script>
	<script src="/js/SVG2Bitmap.js"></script>
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
	<link rel="stylesheet" type="text/css" href="/style.css" />
</head>
<body>
	<div class="box">
   	<div class="ribbon"><span>⚠️ BETA! ⚠️</span></div>
	</div>
	<div id="page">
		<div id="treeContainer">
			<svg id="tree" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
			</svg>
			<div id="bottom"> Colours represent reply times:
				<span style="color: #FA5050; margin: 20px;">5&nbsp;minutes</span>
				<span style="color: #E9FA50; margin: 20px;">10&nbsp;minutes</span>
				<span style="color: #F5F1D3; margin: 20px;">1&nbsp;hour</span>
				<span style="color: #47D8F5; margin: 20px;">3&nbsp;hours+</span>
				<button id="fs" onclick="launchIntoFullscreen(document.documentElement);"><span style="color: #000000;">Go Full Screen</span></button>
				<button id="dlSVG" onclick="downloadSVG();"><span style="color: #000000;">Download SVG</span></button>
				<button id="dlPNG" onclick="downloadPNG();"><span style="color: #000000;">Download PNG</span></button>
			</div>
		</div>
	</div>
	<?php require ('controls.php'); ?>
	<script>
		var treeData = <?php echo $json; ?>;
	</script>

	<script>
		//	Download Buttons

		function downloadSVG(){
			//	https://gist.github.com/benjymous/eb690239ccd2789b4c1ae3331241437c
			svgData = document.getElementById("tree").outerHTML
			svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' })
			filename = "<?php echo $twid; ?>.svg"
			fileUrl = URL.createObjectURL(svgBlob)
			downloadLink = document.createElement('a')
			downloadLink.href = fileUrl
			downloadLink.download = filename
			document.body.appendChild(downloadLink)
			downloadLink.click()
			document.body.removeChild(downloadLink)
		}

		function downloadPNG(){
			//	Set a temporary home for the image
			var download = document.getElementById("download");
			download.onload = function() {
				window.open(encodeURI(download.src));
				//	Delete the temporary image
				download.src = "";
			}
			SVG2Bitmap(document.querySelector('svg'), download)
		}
	</script>
	<script src="/js/tweet_parser.v7.js"></script>

</body>
</html>
