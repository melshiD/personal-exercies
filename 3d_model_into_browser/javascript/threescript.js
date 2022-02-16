import {OBJLoader} = require('three/examples/jsm/loaders/OBJLoader');

let scene;
function init(){
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xdddddd);
    camera = new THREE.PerspectiveCamera(40, window.innerwidth/window.innerHeight, 1, 5000);
    hlight = new THREE.AmbientLight (0x404040, 100);
    scene.add(hlight);
    renderer = new THREE.WebGLRenderer({antialias: true});
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    let loader = new OBJLoader();
    loader.load('./assets/web_head_smaller_2.obj', function(obj) {
        scene.add(obj.scene);
        renderer.render(scene, camera);
    });
}
init();
