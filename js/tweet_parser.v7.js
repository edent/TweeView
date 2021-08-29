// https://bl.ocks.org/d3noob/16570808ff5f8cb729aec224e9318f76

// set the dimensions and margins of the diagram
var margin = {top: 40, right: 90, bottom: 50, left: 90},
    width = 1024 - margin.left - margin.right,
    height = 1600 - margin.top - margin.bottom;

//	http://stackoverflow.com/questions/17558649/d3-tree-layout-separation-between-nodes-using-nodesize
var nodeWidth  = 48;	//	Default Twitter avatar size
var nodeHeight = 48;
var horizontalSeparationBetweenNodes =  10;
var verticalSeparationBetweenNodes   =  50;

//	Create the tree layout - ensure the nodes are spaced correctly
var treemap = d3.tree()
	.size([width, height])
	.nodeSize([nodeWidth + horizontalSeparationBetweenNodes, nodeHeight + verticalSeparationBetweenNodes])
	.separation(function(a, b) {
		return a.parent == b.parent ? 1 : 1.25;
	});

//  assigns the data to a hierarchy using parent-child relationships
var nodes = d3.hierarchy(treeData);

// maps the node data to the tree layout
nodes = treemap(nodes);

// append the svg obgect to the body of the page
// appends a 'group' element to 'svg'
// moves the 'group' element to the top left margin
var svg = d3.select(document.getElementById('tree')).append("svg")
	.attr("width","100%")
	.attr("height", height + margin.top + margin.bottom);

//	Invisible rectangle to allow zoom and pan from anywhere.
svg.append("rect")
	.attr("class", "underlay")
	.attr("width", width)
	.attr("height", height)
	.attr("opacity", 0);

g = svg.append("g")

// adds the links between the nodes
var link = g.selectAll(".link")
   .data( nodes.descendants().slice(1))
   .enter().append("path")
   .attr('stroke', colourEdge.bind(this))
   .attr("class", "link")
   // .attr('stroke', '#ff0000')
   .attr('opacity', 1)
   //	No background for path
   .attr('fill', 'none')
   .attr("d", function(d) {
      return "M" + d.x + "," + d.y
         + "C" + d.x + "," + (d.y + d.parent.y) / 2
         + " " + d.parent.x + "," +  (d.y + d.parent.y) / 2
         + " " + d.parent.x + "," + d.parent.y;
      });

// adds each node as a group
var node = g.selectAll(".node")
   .data(nodes.descendants())
   .enter().append("g")
   .attr("class", function(d) {
      return "node" +
         (d.children ? " node--internal" : " node--leaf");
      })
      .attr("transform", function(d) {
         return "translate(" + d.x + "," + d.y + ")";
      });

// Hover text
node.append("title")
	.text(function(d) { return d.data.tweet.bodyText; });

//	Add the Avatars
node.append("image")
	.attr("xlink:href",function(d) { return d.data.tweet.avatar; })
	.attr("height", "48px")
	.attr("width", "48px")
	.attr("transform","translate(-24 -24)");

//	Scale and position everything correctly
var svgWidth = (svg.node().getBBox().width);
var svgX = svgWidth / 4;
var clientRect = document.getElementById('tree').getBoundingClientRect();
var svgHeight = (svg.node().getBBox().height);
var zoomLevel = Math.min(clientRect.height / svgHeight, clientRect.width / svgWidth, 1);

const zoom = d3.zoom()
   .extent([[0, 0], [width, height]])
   .scaleExtent([.1, 8])
   .on("zoom", zoomed);

svg.call(zoom);

function zoomed({transform}) {
   g.attr("transform", transform);
}


// Fit the SVG
zoomToFit();

function zoomToFit() {
   //	Rectangle of the div
	let clientRect = document.getElementById('tree').getBoundingClientRect();

	//	Dimensions of the SVG
	var svgWidth  = (svg.node().getBBox().width);
	var svgHeight = (svg.node().getBBox().height);

	//	The centre of the SVG
	var svgX = svgWidth / 4;

	//	Calculate zoom
	let zoomLevel = Math.min(clientRect.height / svgHeight, clientRect.width / svgWidth, 1);

   svg.transition()
      .duration(1000)
         .call(
            zoom.transform,
            d3.zoomIdentity
               .translate(	(clientRect.width/2), 45 )
               .scale(zoomLevel)
            );
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