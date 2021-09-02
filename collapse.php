<!DOCTYPE html>
<html lang="en-GB">
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
	<link rel="author" href="https://orcid.org/0000-0002-9265-9069">
	<meta name="flattr:id" content="49zjz5">
	<meta name="monetization" content="$ilp.uphold.com/ieELEKD7epqw">
	<script src="/js/d3.v7.min.js"></script>
	<script src="/js/SVG2Bitmap.js"></script>
	<link rel="stylesheet" type="text/css" href="/style.css" />
</head>
<body>
	<div id="horizontal-tree">
		<svg id="tree" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
		</svg>
	</div>
	<?php require ('controls.php'); ?>
	<div id="bottom"> Colours represent reply times:
		<span style="color: #FA5050; margin: 20px;">5&nbsp;minutes</span>
		<span style="color: #E9FA50; margin: 20px;">10&nbsp;minutes</span>
		<span style="color: #F5F1D3; margin: 20px;">1&nbsp;hour</span>
		<span style="color: #47D8F5; margin: 20px;">3&nbsp;hours+</span>
		<button id="fs" onclick="launchIntoFullscreen(document.documentElement);"><span style="color: #000000;">Go Full Screen</span></button>
		<button id="dlSVG" onclick="downloadSVG();"><span style="color: #000000;">Download SVG</span></button>
		<button id="dlPNG" onclick="downloadPNG();"><span style="color: #000000;">Download PNG</span></button>
	</div>
<script>
// https://bl.ocks.org/d3noob/918a64abe4c3682cac3b4c3c852a698d
var treeData = <?php echo $json; ?>

// Set the dimensions and margins of the diagram
var margin = {top: 10, right: 10, bottom: 10, left: 10},
    width = 2048 - margin.left - margin.right,
    height = 720 - margin.top - margin.bottom;

//	http://stackoverflow.com/questions/17558649/d3-tree-layout-separation-between-nodes-using-nodesize
var nodeWidth  = 48;	//	Default Twitter avatar size
var nodeHeight = 48;
var horizontalSeparationBetweenNodes =  10;
var verticalSeparationBetweenNodes   =  50;

// append the svg object to the body of the page
// appends a 'group' element to 'svg'
// moves the 'group' element to the top left margin
var svg = d3.select(document.getElementById('tree')).append("svg")
	.attr("id", "tree")
   .attr("width", width + margin.right + margin.left)
   .attr("height", height + margin.top + margin.bottom)
   .attr("transform", "translate("
      + margin.left + "," + margin.top + ")");

//	Invisible rectangle to allow zoom and pan from anywhere.
svg.append("rect")
	.attr("class", "underlay")
	.attr("width", width)
	.attr("height", height)
	.attr("opacity", 0);

g = svg.append("g")


var i = 0,
   duration = 750,
   root;

//	Create the tree layout - ensure the nodes are spaced correctly
var treemap = d3.tree()
	.size([width, height])
	.nodeSize([nodeWidth + horizontalSeparationBetweenNodes, nodeHeight + verticalSeparationBetweenNodes])
	.separation(function(a, b) {
		return a.parent == b.parent ? 1 : 1.25;
	});


// Assigns parent, children, height, depth
root = d3.hierarchy(treeData, function(d) { return d.children; });
root.x0 = height / 2;
root.y0 = 0;

// Collapse after the second level
root.children.forEach(collapse);

update(root);

const zoom = d3.zoom()
   .extent([[0, 0], [width, height]])
   .scaleExtent([.1, 8])
   .on("zoom", zoomed);

svg.call(zoom);

function zoomed({transform}) {
   g.attr("transform", transform);
}
console.log("1st gHeight = " + g.node().getBBox().height);

// Fit the SVG
zoomToFit();

console.log("post gHeight = " + g.node().getBBox().height);

function zoomToFit() {
   //	Rectangle of the div
	let clientRect = document.getElementById('tree').getBoundingClientRect();

	//	Dimensions of the SVG
	var svgWidth  = (svg.node().getBBox().width);
	var svgHeight = (svg.node().getBBox().height);

	console.log("gHeight = " + g.node().getBBox().height);

	console.log("clientRect.height = " + clientRect.height);
	//	Calculate zoom
	let zoomLevel = Math.min(clientRect.height / g.node().getBBox().height, .75);
	console.log("zoomLevel = " + zoomLevel);

   svg.transition()
      .duration(1000)
         .call(
            zoom.transform,
            d3.zoomIdentity
               .translate(	24, 360 )
               .scale(zoomLevel)
            );
}


// Collapse the node and all it's children
function collapse(d) {
   if(d.children) {
      d._children = d.children
      d._children.forEach(collapse)
      d.children = null
      }
   }

function update(source) {

   // Assigns the x and y position for the nodes
   var treeData = treemap(root);

   // Compute the new tree layout.
   var nodes = treeData.descendants(),
      links = treeData.descendants().slice(1);

   // Normalize for fixed-depth.
   nodes.forEach(function(d){ d.y = d.depth * 180});

  // ****************** Nodes section ***************************

   // Update the nodes...
   var node = g.selectAll('g.node')
      .data(nodes, function(d) {return d.id || (d.id = ++i); });

   // Enter any new modes at the parent's previous position.
   var nodeEnter = node.enter().append('g')
      .attr('class', 'node')
      .attr("transform", function(d) {
         return "translate(" + source.y0 + "," + source.x0 + ")";
      })
   .on('click', click);

   nodeEnter.append('text')
      .attr("transform", "translate(30 8)")
      .attr("style", "stroke: #475396; stroke-width: 1px;")
      .text( function(d) {
         var kids = d.data.children.length;
         if (kids > 0) {
            return kids;
         } else {
            return "";
         }
      });

   //  Add Avatar
   nodeEnter.append("image")
      .attr("xlink:href",function(d) { return d.data.tweet.avatar; })
      .attr("height", "48px")
      .attr("width", "48px")
      .attr("transform","translate(-24 -24)");

  // Add labels for the nodes
  // nodeEnter.append('text')
  //     .attr("dy", ".35em")
  //     .attr("x", function(d) {
  //         return d.children || d._children ? -13 : 13;
  //     })
  //     .attr("text-anchor", function(d) {
  //         return d.children || d._children ? "end" : "start";
  //     })
  //     .text(function(d) { return d.data.name; });

   nodeEnter.append('title')
      .text(function(d) { return d.data.tweet.bodyText; });

   // UPDATE
   var nodeUpdate = nodeEnter.merge(node);

   // Transition to the proper position for the node
   nodeUpdate.transition()
      .duration(duration)
      .attr("transform", function(d) {
         return "translate(" + d.y + "," + d.x + ")";
      });



   // Remove any exiting nodes
   var nodeExit = node.exit().transition()
      .duration(duration)
      .attr("transform", function(d) {
         return "translate(" + source.y + "," + source.x + ")";
      })
   .remove();


  // ****************** links section ***************************

   // Update the links...
   var link = g.selectAll('path.link')
      .data(links, function(d) { return d.id; });

   // Enter any new links at the parent's previous position.
   var linkEnter = link.enter().insert('path', "g")
      .attr("class", "link")
		.attr('stroke', colourEdge.bind(this))
      .attr('d', function(d){
         var o = {x: source.x0, y: source.y0}
         return diagonal(o, o)
   });

   // UPDATE
   var linkUpdate = linkEnter.merge(link);

   // Transition back to the parent element position
   linkUpdate.transition()
      .duration(duration)
      .attr('d', function(d){ return diagonal(d, d.parent) });

   // Remove any exiting links
   var linkExit = link.exit().transition()
      .duration(duration)
      .attr('d', function(d) {
         var o = {x: source.x, y: source.y}
         return diagonal(o, o)
      })
      .remove();

   // Store the old positions for transition.
   nodes.forEach(function(d){
      d.x0 = d.x;
      d.y0 = d.y;
   });

   // Creates a curved (diagonal) path from parent to the child nodes
   function diagonal(s, d) {
      path = `M ${s.y} ${s.x}
         C ${(s.y + d.y) / 2} ${s.x},
         ${(s.y + d.y) / 2} ${d.x},
         ${d.y} ${d.x}`

      return path
   }

   // Toggle children on click.
   function click(event, d) {
      if (d.children) {
         d._children = d.children;
         d.children = null;
      } else {
         d.children = d._children;
         d._children = null;
      }
		update(d);
		// zoomToFit();
   }
}
function colourEdge(edgeTarget) {
	let timeIntervals = [
		300,
		600,
		3600,
		10800
	];
	let timeColors = [
		'#FA5050',
		'#E9FA50',
		'#F5F1D3',
		'#47D8F5'
	];
	let colorScale = d3.scaleSqrt()
		.domain(timeIntervals)
		.range(timeColors);

	let data = edgeTarget.data;

	let timeDelta = (data.tweet.time - edgeTarget.parent.data.tweet.time) / 1000;
	return colorScale(timeDelta).toString();
}

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
</body>
