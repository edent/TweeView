<!doctype html>
<html lang="en-GB">
<head>
   <style>
      body {
         margin: 0;
         overflow-x: hidden;
         overflow-y: hidden;
         font-family: sans;
         background-color: #aaa;
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

  <script src="/js/three.js"></script>
  <script src="/js/TrackballControls.js"></script>

  <script src="/js/three-forcegraph.min.js"></script>
</head>
<body>
  <div id="3d-graph"></div>

  <script>
    const N = 100;

    //   Load from JSON
    const Graph = new ThreeForceGraph()
      .jsonUrl("gun.json")
      .nodeColor(0x0000ff)
      .nodeRelSize(8)
      .linkOpacity(1)
      .linkCurvature(0)
      .linkWidth(3)
      .linkDirectionalArrowLength(15)
      .linkDirectionalArrowColor(0x00ff00);
    // Setup renderer
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById('3d-graph').appendChild(renderer.domElement);

    // Setup scene
    const scene = new THREE.Scene();
    scene.add(Graph);
    scene.add(new THREE.AmbientLight(0xbbbbbb));

    // Setup camera
    const camera = new THREE.PerspectiveCamera();
    camera.far = 10000;
    camera.aspect = window.innerWidth/window.innerHeight;
    camera.updateProjectionMatrix();
    camera.lookAt(Graph.position);
    camera.position.z = Math.cbrt(N) * 180;

    // Add camera controls
    const tbControls = new THREE.TrackballControls(camera, renderer.domElement);

    // Kick-off renderer
    (function animate() { // IIFE
      Graph.tickFrame();

      // Frame cycle
      tbControls.update();
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    })();
  </script>
</body>
