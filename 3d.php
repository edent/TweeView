<!doctype html>
<html lang="en-GB">
<head>
   <title>TweeView</title>
	<meta charset="UTF-8">
   <link rel="author" href="https://orcid.org/0000-0002-9265-9069">
   <meta name="flattr:id" content="49zjz5">
   <meta name="monetization" content="$ilp.uphold.com/ieELEKD7epqw">
   <link rel="stylesheet" type="text/css" href="/style.css" />
   <script src="/js/three.js"></script>
   <script src="/js/3d-force-graph.min.js"></script>

<?php
if(isset($_GET["id"])) {
	$twid = $_GET["id"];
	$json_url = "force.json.php?id={$twid}";
} else {
	//	Default conversation to view
	$json_url = "demo/force.small.json";
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
         .jsonUrl("<?php echo $json_url; ?>")
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