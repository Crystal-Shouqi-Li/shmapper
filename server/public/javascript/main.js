var camera, scene, renderer;
var boxMesh = [];
var sphereMesh = [];
var colors = [new THREE.Color( 'red' ), new THREE.Color( 'orange' ),
            new THREE.Color( 'yellow' ), new THREE.Color( 'green' ),
            new THREE.Color( 'green' ), new THREE.Color( 'blue' ),
            new THREE.Color( 'purple' )];
var colorIndex = 0;
var light;
var geometry, s_geometry;
var words = ["Hello", "Clare", "HI"];
var material;
var decay = false;
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

    light = new THREE.AmbientLight( 0xffffff );
    scene.add( light );

    renderer = new THREE.WebGLRenderer();
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );

    geometry = new THREE.BoxGeometry( 120, 120, 120 );
    material = new THREE.MeshLambertMaterial();
    
    addBoxes();

    controls = new THREE.OrbitControls( camera, renderer.domElement );
    controls.addEventListener( 'change', render );
    controls.enableZoom = false;

    window.addEventListener( 'resize', onWindowResize, false );

    s_geometry = new THREE.SphereGeometry( 10, 10, 10 );
    for ( var i = 0; i < 300; i++ ) {
        sphereMesh.push(new THREE.Mesh( s_geometry, material ));
    }

    
    animate();
}

function addBoxes() {
    geometry = new THREE.BoxGeometry( 350/words.length, 350/words.length, 350/words.length );
    // material = new THREE.MeshLambertMaterial();

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

    for( var i = 0; i < words.length; i++ ) {
        explode(i);
        setTimeout(addSpheres, 3500);
    }
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

function changeColor() {
    for ( var i = 0; i < sphereMesh.length; i++ ) {
        sphereMesh[i].color.set(colors[colorIndex]);
        colorIndex++;
    }
}

var sphereClone = [];
function addSpheres() {

    sphereClone = [];
    for ( var i = 0; i < sphereMesh.length; i++ ) {
        sphereClone.push(sphereMesh[i]);
    }
    for ( var i = 0; i < sphereClone.length; i++ ) {
        sphereClone[i].position.x = ( Math.random() - 0.5 ) * 1000;
        sphereClone[i].position.y = ( Math.random() - 0.5 ) * 1000;
        sphereClone[i].position.z = ( Math.random() - 0.5 ) * 1000;
        scene.add( sphereClone[i] );
        sphereClone[i].updateMatrix();
       // sphereClone[i].matrixAutoUpdate = false;
    }

    decay = true;

    setTimeout(function( ) {
        for ( var i = 0; i < sphereClone.length; i++ ) {
            scene.remove( sphereClone[i] );
        }
        decay = false;

    }, 7000);

}

function animate() {
    requestAnimationFrame( animate );
    controls.update();
    for (var i = 0; i < boxMesh.length; i++) {
        boxMesh[i].rotation.x += (i % 2 == 0) ? -.005 : .005;
        boxMesh[i].rotation.y += (i % 2 == 0) ? -.01 : .01;
    }

    if (decay) { 
        for (var i = 0; i < sphereClone.length; i++) {
            sphereClone[i].position.y -=  ( Math.random() ) * 2.5;
        }
    }
    render();
}

function changeSize(i) {
    if(((boxMesh[i].userData.count % 40) - 20) < 0 ) {
        increaseSize( i , 0.05 );
    } else {
        decreaseSize( i, 0.05 );
    }
    boxMesh[i].userData.count++;

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