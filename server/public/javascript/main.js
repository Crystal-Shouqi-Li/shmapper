var camera, scene, renderer;
var boxMesh = [];
var sphereMesh = [];
var words = ["Hello", "Clare", "HI"];
//wait();
init();
/*
function wait() {
    // print "Enter Words"
    // wait for socket call to init
}
*/
function init() {
    var aspect = window.innerWidth / window.innerHeight;
    camera = new THREE.PerspectiveCamera( 75, aspect, 0.1, 10000 );
    camera.position.z = 1000;
    scene = new THREE.Scene();

    renderer = new THREE.WebGLRenderer();
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );

    var geometry = new THREE.BoxGeometry( 120, 120, 120 );
    var material = new THREE.MeshBasicMaterial();
    for ( var i = 0; i < words.length; i++ ) {
        boxMesh[i] = new THREE.Mesh( geometry, material );
        boxMesh[i].userData.count = 0;
    }
    //screen width is 2100 with camera at 1000 and 75 degrees
    var sectionSize = 2100 / boxMesh.length;
    //screen from -1050 to 1050
    var pos = (sectionSize / 2) - 1050;

    for ( var i = 0; i < boxMesh.length; i++ ) {
        boxMesh[i].position.x = pos + ( i * sectionSize );
        scene.add( boxMesh[i] );
    }

    controls = new THREE.OrbitControls( camera, renderer.domElement );
    controls.addEventListener( 'change', render );
    controls.enableZoom = false;

    window.addEventListener( 'resize', onWindowResize, false );

    for( var i = 0; i < words.length; i++ ) {
        explode(i);
    }
    animate();
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
}

function explode(index) {
        boxMesh[index].userData.loop =
            setInterval(changeSize, 30, index);
}

function animate() {
    requestAnimationFrame( animate );
    controls.update();
    for (var i = 0; i < boxMesh.length; i++) {
        boxMesh[i].rotation.x += (i % 2 == 0) ? -.005 : .005;
        boxMesh[i].rotation.y += (i % 2 == 0) ? -.01 : .01;
    }
    render();
}

function changeSize(i) {
   // console.log(((count % 40) - 20));
    if(((boxMesh[i].userData.count % 40) - 20) < 0 ) {
        increaseSize( i , 0.05 );
    } else {
        decreaseSize( i, 0.05 );
    }
    boxMesh[i].userData.count++;

    /*
    if ( boxMesh[i].userData.count < 20 ) {
        increaseSize( i, 0.05 );
        boxMesh[i].userData.count++;
        if ( boxMesh[i].userData.count == 20 ) {
            boxMesh[i].userData.count = 40;
        }
    } else {
        decreaseSize( i, 0.05 );
        boxMesh[i].userData.count--;
        if ( boxMesh[i].userData.count == 20 ) {
            boxMesh[i].userData.count = 0;
        }
    }
*/
    if ( boxMesh[i].userData.count >= 100 ) {
        clearInterval(boxMesh[i].userData.loop);
        boxMesh[i].visible = false;
    }


}

function increaseSize(i, amnt) {
    boxMesh[i].scale.x += amnt;
    boxMesh[i].scale.y += amnt;
    boxMesh[i].scale.z += amnt;
}

function decreaseSize(i, amnt) {
    boxMesh[i].scale.x -= amnt;
    boxMesh[i].scale.y -= amnt;
    boxMesh[i].scale.z -= amnt;
}

function render() {
    renderer.render( scene, camera );
}