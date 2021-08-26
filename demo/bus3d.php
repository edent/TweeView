<!doctype html>
<html lang="en-GB">
<head>
  <style> body { margin: 0; }

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
   .label {
      background-color: #000;
   }

   .avatar {
      float: left;
   }
   </style>

  <script src="//unpkg.com/three"></script>
  <script src="//unpkg.com/three-spritetext"></script>

  <script src="//unpkg.com/3d-force-graph"></script>

</head>

<body>
  <div id="3d-graph"></div>
  <div id="feedContainer">
     <div id="infoBox">
        <p>Welcome to <a href="https://github.com/edent/TweeView">TweeView</a> - a Tree-based way to visualise Twitter conversations.</p>
        <img id="download"/>
     </div>
     <div id="feedInner">
        <div class="ui comments" id="feed">
           Only works for Tweets sent in the last 7 days.
        </div>
     </div>
  </div>
  <script type="module">
     import { UnrealBloomPass } from '//cdn.skypack.dev/three/examples/jsm/postprocessing/UnrealBloomPass.js';    const Graph = ForceGraph3D()
      (document.getElementById('3d-graph'))
         .jsonUrl("bus3d.json")
         .backgroundColor("#000")
         .nodeLabel('text')
         .nodeColor(0xff0000)
         .nodeVal('likes')
         .linkOpacity(1)
         .linkCurvature(0)
         .linkWidth(3)
         .linkDirectionalParticles(2)
         .linkDirectionalParticleWidth(6);
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
    Graph.d3Force('charge').strength(-120);

  </script>
</body>