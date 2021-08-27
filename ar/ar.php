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
      .yOffset(1.8)
      .nodeAutoColorBy('group')
      .nodeRelSize(5)
      .linkWidth(1.5)
      .nodeOpacity(0.9)
      .linkOpacity(0.3)
      .linkColor(() => 'darkgrey');
  </script>
</body>