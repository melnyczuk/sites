var renderer, scene, camera;
var click;
var urls = [];
var rot = [];

for (var i = 0; i < 20; i++) {
    urls.push(i);
};

while (urls.length > 10) {
    var number = Math.floor(Math.random() * urls.length);
    urls.splice(number, 1);
}

for (var i = 0; i < urls.length; i++) {
    urls[i] = ("bin/sc-" + (urls[i] + 1) + ".jpg");
    urls[i] = (meshBuilder(
        [(64 * Math.random()) - 32, (64 * Math.random()) - 32, (64 * Math.random()) - 32], [(2 * Math.PI * Math.random()), (2 * Math.PI * Math.random()), (2 * Math.PI * Math.random())],
        urls[i]
    ));
}

$(document).ready(function() {
    init();
    animate();
    if (window.location.href.indexOf('reload') == -1) {
        setInterval(function() {
            window.location.replace(window.location.href + '?reload');
        }, 2000);
    } else scene.visible = true;
});

function init() {
    click = false;
    rot = [(2 * Math.PI * Math.random()), (2 * Math.PI * Math.random()), (2 * Math.PI * Math.random())];

    // SCENE;
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xFFFFFF);

    // CAM;
    camera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 0.1, 10000);
    camera.position.set(0, 0, Math.random() * 1024);
    camera.lookAt(new THREE.Vector3(0, 0, 0));

    // RENDERER;
    renderer = new THREE.WebGLRenderer({
        antialias: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // ADD MESHES;
    for (var i = 0; i < urls.length; i++) {
        scene.add(urls[i]);
    }
    scene.visible = false;
    render();

}

/* ADDS MESH */
function meshBuilder(position, rotation, url) {
    var loader = new THREE.TextureLoader();
    loader.crossOrigin = ''; // Enable crossorigin (allows loading from another domain);

    var texture = loader.load(url, function() {
        texture.wrapS = THREE.ClampToEdgeWrapping; // set horizontal wrapping;
        texture.wrapT = THREE.ClampToEdgeWrapping; // set vertical wrapping;
        texture.needsUpdate = true; // update texture (vital);
    }); // load from passed url;
    var material = new THREE.MeshBasicMaterial({
        map: texture,
        side: THREE.DoubleSide
    });
    var geometry = new THREE.PlaneGeometry(texture.image.width * 0.5, texture.image.height * 0.5); //set size of geometry;
    var mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(position[0], position[1], position[2]); // set position;    
    mesh.rotation.set(rotation[0], rotation[1], rotation[2]); // set rotation;
    return mesh;
}

/* DEFINE ANIMATION */
function spinCycle() {;
    for (var i = 0; i < urls.length; i++) {
        scene.children[i].rotation.x += rot[0]; // access first mesh in scene (first child)
        scene.children[i].rotation.y += rot[1]; // access second mesh in scene (second child)
        scene.children[i].rotation.z += rot[2]; // access third mesh in scene (third child)
    }
    scene.rotation.x += rot[0];
    scene.rotation.y += rot[1];
    scene.rotation.z += rot[2];
}

function quiver() {
    for (var i = 0; i < urls.length; i++) {
        scene.children[i].rotation.x += (0.01 * Math.random()) - 0.005; // access first mesh in scene (first child)
        scene.children[i].rotation.y += (0.01 * Math.random()) - 0.005; // access second mesh in scene (second child)
        scene.children[i].rotation.z += (0.01 * Math.random()) - 0.005; // access third mesh in scene (third child)
    }
}

function animate() {
    requestAnimationFrame(animate); //  enable animation;
    (click) ? spinCycle(): quiver();
    render();
}

function render() {
    renderer.render(scene, camera);
}

$(document).on('click', function() {
    event.preventDefault();
    click = !click;
    rot = [(2 * Math.PI * Math.random()) * 0.01, (2 * Math.PI * Math.random()) * 0.01, (2 * Math.PI * Math.random()) * 0.01];
});
