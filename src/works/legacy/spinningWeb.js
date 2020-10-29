var camera, scene, renderer;
var canvas, context;
var mesh;
var w, h;

init();
animate();

function init() {
  /* Scene */
  scene = new THREE.Scene();

  /* Camera: maybe make cam.z variable? */
  camera = new THREE.OrthographicCamera(
    window.innerWidth / -2,
    window.innerWidth / 2,
    window.innerHeight / 2,
    window.innerHeight / -2,
    -500,
    1000
  );

  //PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 50;

  /* Renderer */
  renderer = new THREE.WebGLRenderer();
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  /* Window Resizing */
  window.addEventListener('resize', onWindowResize, false);

  /* Background Color */
  renderer.setClearColor(0x3355ff);
  document.body.style.background = '#3355FF';

  w = window.innerWidth;
  h = window.innerHeight;
  console.log(w + ' ' + h);

  /* Geometry */
  var geometry = new THREE.Geometry();
  for (var x = -w; x < w; x++) {
    for (var y = -w; y < w; y++) {
      geometry.vertices.push(new THREE.Vector3(x, y, 0));
    }
  }

  /* Material */
  var material = new THREE.LineBasicMaterial({ color: 0xccaa00 });

  /* Mesh */
  mesh = new THREE.Line(geometry, material);
  scene.add(mesh);
}

function animate() {
  requestAnimationFrame(animate);
  mesh.rotation.z += 0.001;
  //mesh.rotation.y += 2 + 0.001 * Math.sin(mesh.rotation.z);
  render();
}

function render() {
  renderer.render(scene, camera);
}

function onWindowResize() {
  w = window.innerWidth * 0.5;
  h = window.innerHeight * 0.5;
  console.log(w + ' ' + h);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  render();
}
