<!doctype html>
<html lang="en-GB">
<head>
  <style> body { margin: 0; } </style>

  <script src="//unpkg.com/three"></script>
  <script src="//unpkg.com/three-spritetext"></script>

  <script src="//unpkg.com/3d-force-graph"></script>
  <!--<script src="../../dist/3d-force-graph.js"></script>-->
  <?php
  if(isset($_GET["id"])) {
  	$twid = $_GET["id"];
  } else {
  	//	Default conversation to view
  	$twid = "1427312962646298626";
  }
  ?>
</head>

<body>
  <div id="3d-graph"></div>

  <script>
    const Graph = ForceGraph3D()
      (document.getElementById('3d-graph'))
         .jsonUrl("force.json.php?id=<?php echo $twid; ?>")
        .nodeLabel('text');
        // .nodeAutoColorBy('group')
        // .linkThreeObjectExtend(true)
        // .linkThreeObject(link => {
        //   // extend link with text sprite
        //   const sprite = new SpriteText(`${link.source} > ${link.target}`);
        //   sprite.color = 'lightgrey';
        //   sprite.textHeight = 1.5;
        //   return sprite;
        // })
        // .linkPositionUpdate((sprite, { start, end }) => {
        //   const middlePos = Object.assign(...['x', 'y', 'z'].map(c => ({
        //     [c]: start[c] + (end[c] - start[c]) / 2 // calc middle point
        //   })));

          // Position sprite
          // Object.assign(sprite.position, middlePos);
        // });

    // Spread nodes a little wider
    Graph.d3Force('charge').strength(-120);

  </script>
</body>