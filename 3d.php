<!doctype html>
<html lang="en-GB">
<head>
   <style>
      body {
         margin: 0;
         overflow-x: hidden;
         overflow-y: hidden;
         font-family: sans;
      }
      a {
         color: lightblue;
      }
      #feedContainer {
         position: absolute;
         top: 10px;
         right: 10px;
         font-size: 1em;
         background: #f0f8ff12;
         width: 25%;
         padding: 1em;
         color: #fff;
         font-family: sans-serif;
      }
      #hide-button {
         float: right;
      }
      .label {
         background-color: #000;
      }

      .avatar {
         float: left;
      }
   </style>

   <script src="https://unpkg.com/three"></script>
   <script src="https://unpkg.com/three-spritetext"></script>

   <script src="https://unpkg.com/3d-force-graph"></script>

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
   <div id="feedContainer">
      <div id="infoBox">
         <div id="infoBox">
            <p>Welcome to <a href="https://github.com/edent/TweeView">TweeView</a> - a Tree-based way to visualise Twitter conversations.</p>
            <form action="importer.php" method="post">
               <input type="url" name="url" id="urlBox" required placeholder="Paste a Twitter status URL here...">
               <input type="hidden" name="page" value="3d.php">
               <button>Generate TweeView</button>
            </form>
            <p>Made in 🇬🇧 by <a href="https://twitter.com/edent">@edent</a></p>
            <img id="download"/>
         </div>
         <div id="feedInner">
            <div class="ui comments" id="feed">
               Note - only works for Tweets sent in the last 7 days.
            </div>
         </div>
      </div>
      <button id="hide-button" onclick="this.parentNode.style.display = 'none';">Hide</button>
   </div>

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