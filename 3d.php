<!doctype html>
<html lang="en-GB">
<head>
   <title>TweeView</title>
	<meta charset="UTF-8">
   <link rel="stylesheet" type="text/css" href="/style.css" />
   <script src="/js/three.js"></script>
   <script src="/js/3d-force-graph.min.js"></script>

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
   <?php require ('controls.php'); ?>

   <script type="module">
      import { UnrealBloomPass } from '//cdn.skypack.dev/three/examples/jsm/postprocessing/UnrealBloomPass.js';
      const Graph = ForceGraph3D()
      (document.getElementById('3d-graph'))
         .jsonUrl("force.json.php?id=<?php echo $twid; ?>")
         .backgroundColor("#000")
         .nodeLabel('text')
         .nodeColor(0xff0000)
         .nodeVal('likes')
         .linkOpacity(1)
         .linkCurvature(.1)
         .linkWidth(1)
         .linkDirectionalParticles(2)
         .linkDirectionalParticleWidth(3);
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
      const bloomPass = new UnrealBloomPass();
      bloomPass.strength = 3;
      bloomPass.radius = 1;
      bloomPass.threshold = 0.1;
      Graph.postProcessingComposer().addPass(bloomPass);

      // Spread nodes a little wider
      Graph.d3Force('charge').strength(-300);

  </script>
</body>