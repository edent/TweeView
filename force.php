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
   <script src="/js/TrackballControls.js"></script>
   <script src="/js/three-forcegraph.min.js"></script>
</head>
<?php
if(isset($_GET["id"])) {
	$twid = $_GET["id"];
	$json_url = "force.json.php?id={$twid}";
} else {
	//	Default conversation to view
	$json_url = "demo/force.small.json";
}
?>
<body>
  <div id="3d-graph"></div>
  <?php require ('controls.php'); ?>

  <script>
    const N = 100;

    //   Load from JSON
    const Graph = new ThreeForceGraph()
      .jsonUrl("<?php echo $json_url; ?>")
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