// https://bl.ocks.org/d3noob/b024fcce8b4b9264011a1c3e7c7d70dc

// ************** Generate the tree diagram	 *****************
// set the dimensions and margins of the diagram
// set the dimensions and margins of the diagram
var margin = {top: 40, right: 90, bottom: 50, left: 90},
	 width = 1024 - margin.left - margin.right,
	 height = 1024 - margin.top - margin.bottom;

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

//	Assign the data to a hierarchy using parent-child relationships
var nodes = d3.hierarchy(treeData);

//	Maps the node data to the tree layout
nodes = treemap(nodes);

//	Set the zoom events
var zoom = d3.zoom()
	//	Max zoom out, Max zoom in
	.scaleExtent([0.1, 2])
	.on('zoom', zoomer);

//	It is the g Element which needs to be transformed
function zoomer() {
	let x = d3.event.transform.x;
	let y = d3.event.transform.y;
	let scale = d3.event.transform.k;
	g.attr('transform', `translate(${x} ${y}) scale(${scale})`);
};

// append the svg object to the body of the page
// appends a 'group' element to 'svg'
// moves the 'group' element to the top left margin
var svg = d3.select(document.getElementById('tree')).append("svg")
	.attr("width","100%")
	.attr("height", height + margin.top + margin.bottom)
	.call(zoom)
	// .on("dblclick.zoom", null)
g = svg.append("g");

// adds the links between the nodes
var link = g.selectAll(".link")
	.data( nodes.descendants().slice(1))
	.enter().append("path")
	//	Colour of path
	// .attr('stroke', '#ff0000')
	.attr('stroke', colorEdge.bind(this))
	//	Make path visible
	.attr('opacity', 1)
	//	No background for path
	.attr('fill', 'none')
	//	Control path colour with CSS
	// .attr("class", "link")
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
	.attr("transform","translate(-24 -24)")
	.attr("onclick",function(d) {
		if (d.parent != null) {
			return "console.log('" + d.data.tweet.id + " - " +  d.parent.data.tweet.id  +"')";
		} else {
			return "console.log('" + d.data.tweet.id + "')";
		}
	});
	// .attr("onclick",function(d) {
	// 	return "showThread("+d+")";
	// });

//	Scale and position everything correctly
var svgWidth = (svg.node().getBBox().width);
var svgX = svgWidth / 4;
var clientRect = document.getElementById('tree').getBoundingClientRect();
// console.log("clientRect.width is " + clientRect.width);
var svgHeight = (svg.node().getBBox().height);
// let clientRect = this.container.node().getBoundingClientRect();
var zoomLevel = Math.min(clientRect.height / svgHeight, clientRect.width / svgWidth, 1);

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

	//	It is the initial SVG which is zoomed, not the g
	//	http://stackoverflow.com/questions/38597582/d3-js-pan-and-zoom-jumps-when-using-mouse-after-programatic-zoom
	svg.transition()
		.duration(1500)
		.call(zoom.transform, d3.zoomIdentity.translate(
			(clientRect.width/2), 45
		)
		.scale(zoomLevel)
	);
}

function colorEdge(edgeTarget) {
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
	// if (data instanceof TweetNode) {
		let timeDelta = (data.tweet.time - edgeTarget.parent.data.tweet.time) / 1000;
		return colorScale(timeDelta).toString();
	// }
	// else {
	// 	return '#fff';
	// }
}

// adds the text to the node

//	Add a retweeted count above the node
node.append("text")
	.attr("dy", "")
	.attr("y", -25 )
	.style("text-anchor", "middle")
	.style("fill", "#00ff00")
	.style("font-family", "sans-serif")
	.style("stroke", "#000000")
	.style("stroke-width", ".75px")
	.style("font-size", "1.5em")
	.text(function(d) {
		if (d.data.tweet.retweets > 0) {
			var count = d.data.tweet.retweets;
			if (count >= 1000) {
				count = Math.round(count / 1000);
				count = count.toString() + "K";
			}
			return count + "♻";
		}
	});

//	Add a favourite count bellow the node
node.append("text")
	.attr("dy", "")
	.attr("y", 42)
	.style("text-anchor", "middle")
	.style("fill", "#ff0000")
	.style("font-family", "sans-serif")
	.style("stroke", "#000000")
	.style("stroke-width", ".75px")
	.style("font-size", "1.5em")
	.text(function(d) {
		if (d.data.tweet.favs > 0) {
			var count = d.data.tweet.favs;
			if (count >= 1000) {
				count = Math.round(count / 1000);
				count = count.toString() + "K";
			}
			return count + "♥";
		}
	});
