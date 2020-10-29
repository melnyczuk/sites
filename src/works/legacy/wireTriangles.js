var scene, camera, renderer;
var line, mesh, t;

setup();
animate();

function setup() {
  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.z = 65;

  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  var geometry = new THREE.Geometry();
  geometry.vertices.push(new THREE.Vector3(0, 0, 0));
  for (var i = 1; i < 50; i++) {
    geometry.vertices.push(
      new THREE.Vector3(
        i * (Math.random() - Math.random()),
        i * (Math.random() - Math.random()),
        i * (Math.random() - Math.random())
      )
    );
  }
  geometry.vertices.push(new THREE.Vector3(0, 0, 0));

  var material = new THREE.LineBasicMaterial({ color: 0xffffff });

  line = new THREE.Line(geometry, material);
  scene.add(line);
}

function animate() {
  requestAnimationFrame(animate);
  line.rotation.x += 0.01;
  line.rotation.y += 0.01;
  line.rotation.z += 0.01;
  renderer.render(scene, camera);
  t++;
}
