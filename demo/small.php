<!DOCTYPE html>
<html>
<head>
	<title>TweeView</title>
	<meta charset="UTF-8">
	<script src="/js/d3.v4.min.js"></script>
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
	<style type="text/css">
		body {
			overflow-y: hidden;
			font-family: sans-serif;
		}
		a {
			cursor: pointer;
		}
		path {
			stroke-width: 8px;
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
			width: 100%;
		}

		/* Bottom Bar */
		#bottom {
			position: absolute;
			bottom: 5px;
			left: 5px;
			color: #eee;
			background-color: rgba(51, 51, 51, 0.8);
		}

	</style>
</head>
<body>
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
			</div>
		</div>
	</div>
	<script>
		var treeData = <?php echo file_get_contents("small.json"); ?>;
	</script>

	<script src="/js/tweet_parser.js?cache=2"></script>

</body>
</html>