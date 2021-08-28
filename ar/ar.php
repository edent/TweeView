<head>
  <style>body { margin: 0; }</style>

  <script src="/js/aframe-master.js"></script>
  <script src="/js/aframe-ar.min.js"></script>
  <script src="/js/3d-force-graph-ar.js"></script>
</head>

<body>
  <div id="3d-graph"></div>

  <script>
  const Graph = ForceGraphAR()
    (document.getElementById('3d-graph'))
      .jsonUrl('/demo/small.json')
      .glScale(160)
      .yOffset(1)
      .nodeRelSize(10)
      .nodeOpacity(0.9)
      .linkOpacity(0.9)
      .nodeColor(0x0000ff)
      .linkOpacity(1)
      .linkCurvature(0)
      .linkWidth(2)
      .linkDirectionalArrowLength(6)
      .linkDirectionalArrowColor(0x00ff00)
      .linkColor(() => 'red');
  </script>
</body>