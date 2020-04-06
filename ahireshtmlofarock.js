const rockPath = 'ahirespngofarock.png';


(function() {
    let click, t;
    let scene, cam, renderer; 
    
    init();
    animate();
    
    click = false;
    
    if (window.location.href.indexOf('reload') == -1) {
        setInterval(function() {
            window.location.replace(window.location.href + '?reload');
        }, 2000);
    } else scene.visible = true;

    function init() {
        t = 0;
        scene = new THREE.Scene();
        scene.background = new THREE.Color(0x101010);

        cam = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 0.1, 10000);
        cam.lookAt(new THREE.Vector3(0, 0, 0));
        cam.rotation.set(-Math.PI / 200, Math.PI / 100, 0);
        cam.position.set(2048, 0, 2048);

        let renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(renderer.domElement);

        scene.add(addImage(rockPath));
        scene.visible = false;

        render();

        return { scene, cam, renderer };
    }

    function addImage(url) {
        var loader = new THREE.TextureLoader();
        loader.crossOrigin = '';

        var tex = loader.load(url, function() {
            tex.wrapS = THREE.ClampToEdgeWrapping;
            tex.wrapT = THREE.ClampToEdgeWrapping;
            tex.needsUpdate = true;
        });

        var mat = new THREE.MeshBasicMaterial({ map: tex, transparent: true, side: THREE.FrontSide });
        var geo = new THREE.PlaneGeometry(window.innerHeight * 0.8, window.innerHeight, 5, 5); //set size of geometry;
        var mesh = new THREE.Mesh(geo, mat);

        return mesh;
    }

    function wave(geometry) {
        const len = geometry.vertices.length
        geometry.vertices.forEach(({ z }, i) => {
            z = 64 * Math.cos(t + (i % len));
        });
        geometry.verticesNeedUpdate = true;
    }

    function animate() {
        t += 0.01;
        requestAnimationFrame(animate); //  enable animation;
        wave(scene.children[0]);
        setBackgroundColour(click ? 0x101010 : 0xFFFFFF);
        render();
    }

    function render() {
        cam.rotation.y = Math.PI / 4;
        renderer.render(scene, cam);
    }

    const setBackgroundColour = colour => scene.background = new THREE.Color(colour);

    $(document).on('click', function() {
        event.preventDefault();
        click = !click;
    });

    $(window).on('resize', function() {
        scene.children[0].geo = new THREE.PlaneGeometry(window.innerHeight * 0.8, window.innerHeight, 5, 5);
        renderer.setSize(window.innerWidth, window.innerHeight);
        render();
    });
})();