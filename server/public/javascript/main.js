var camera, scene, renderer;
var mesh = [];
init();
animate();

function init() {
    var aspect = window.innerWidth / window.innerHeight;
    camera = new THREE.PerspectiveCamera( 75, aspect, 0.1, 1000 );
    camera.position.z = 400;
    scene = new THREE.Scene();
    var geometry = new THREE.BoxGeometry( 100, 100, 100 );
    var material = new THREE.MeshBasicMaterial();
    mesh[0] = new THREE.Mesh( geometry, material );
    mesh[1] = new THREE.Mesh( geometry, material );
    mesh[1].position.x = 200;
    mesh[1].position.y = 200;
    scene.add( mesh[0] );
    scene.add( mesh[1] );

    renderer = new THREE.WebGLRenderer();
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );

    controls = new THREE.OrbitControls( camera, renderer.domElement );
    controls.addEventListener( 'change', render );
    controls.enableZoom = false;

    window.addEventListener( 'resize', onWindowResize, false );
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
}

function animate() {
    requestAnimationFrame( animate );
    controls.update();
    for (var i = 0; i < mesh.length; i++) {
        mesh[i].rotation.x += (i % 2 == 0) ? -.005 : .005;
        mesh[i].rotation.y += (i % 2 == 0) ? -.01 : .01;
    }
    changeSize();
    render();
}

var count = 0;
function changeSize() {
    for (var i = 0; i < mesh.length; i++) {
        if ( count < 20 ) {
            increaseSize( i, 0.05 );
            count++;
            if ( count == 20 ) {
                count = 40;
            }
        } else {
            decreaseSize( i, 0.05 );
            count--;
            if ( count == 20 ) {
                count = 0;
            }
        }
    }
}

function increaseSize(i, amnt) {
    mesh[i].scale.x += amnt;
    mesh[i].scale.y += amnt;
    mesh[i].scale.z += amnt;
}

function decreaseSize(i, amnt) {
    mesh[i].scale.x -= amnt;
    mesh[i].scale.y -= amnt;
    mesh[i].scale.z -= amnt;
}

function render() {
    renderer.render( scene, camera );
}