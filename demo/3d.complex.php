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
      .label {
         background-color: #000;
      }

      .avatar {
         float: left;
      }
   </style>

   <script src="/js/three.js"></script>

   <script src="/js/3d-force-graph.min.js"></script>
</head>

<body>
   <div id="3d-graph"></div>
   <script type="module">
      import { UnrealBloomPass } from '//cdn.skypack.dev/three/examples/jsm/postprocessing/UnrealBloomPass.js';
      const Graph = ForceGraph3D()
      (document.getElementById('3d-graph'))
         .jsonUrl("force.complex.json")
         .backgroundColor("#000")
         .nodeLabel('text')
         .nodeColor(0xff0000)
         .nodeVal('likes')
         .linkOpacity(1)
         .linkCurvature(0)
         .linkWidth(2)
         .linkDirectionalParticles(1)
         .linkDirectionalParticleWidth(4);

      const bloomPass = new UnrealBloomPass();
      bloomPass.strength = 3;
      bloomPass.radius = 1;
      bloomPass.threshold = 0.1;
      Graph.postProcessingComposer().addPass(bloomPass);

      // Spread nodes a little wider
      Graph.d3Force('charge').strength(-300);

  </script>
</body>