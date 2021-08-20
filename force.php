<!doctype html>
<html lang="en-GB">
<head>
  <style> body { margin: 0; } </style>

  <script src="//unpkg.com/three"></script>
  <script src="//unpkg.com/three/examples/js/controls/TrackballControls.js"></script>

  <script src="//unpkg.com/three-forcegraph"></script>
<!-- https://vasturiano.github.io/three-forcegraph/example/basic/ -->
</head>
<?php
if(isset($_GET["id"])) {
	$twid = $_GET["id"];
} else {
	//	Default conversation to view
	$twid = "1427312962646298626";
}
?>
<body>
  <div id="3d-graph"></div>

  <script>
    const N = 100;

    //   Load from JSON
    const Graph = new ThreeForceGraph()
      .jsonUrl("force.json.php?id=<?php echo $twid; ?>")
      .nodeColor(0xff0000)
      .linkOpacity(1)
      .linkCurvature(.1)
      .linkWidth(1)
      .linkDirectionalArrowLength(5)
      .linkDirectionalArrowColor(0x00ff00)
      .linkDirectionalParticles(2)
      .linkDirectionalParticleWidth(3);
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