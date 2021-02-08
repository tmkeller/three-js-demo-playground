console.log( "script.js included")

var scene = new THREE.Scene(  );
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

window.addEventListener( 'resize', function() {
    var width = window.innerWidth;
    var height = window.innerHeight;
    renderer.setSize( width, height );
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
});

controls = new THREE.OrbitControls( camera, renderer.domElement )

// create the shape
var geometry = new THREE.BoxGeometry( 1.5, 1.5, 1.5 );
var cubeMaterials = [
    new THREE.MeshBasicMaterial( { map: new THREE.TextureLoader().load( 'img/chomie.png' ), side: THREE.DoubleSide } ), // Right side
    new THREE.MeshPhongMaterial( { map: new THREE.TextureLoader().load( 'img/tim.png' ), side: THREE.DoubleSide } ), // Left side
    new THREE.MeshLambertMaterial( { map: new THREE.TextureLoader().load( 'img/sam.png' ), side: THREE.DoubleSide } ), // Top side
    new THREE.MeshPhongMaterial( { map: new THREE.TextureLoader().load( 'img/rita.png' ), side: THREE.DoubleSide } ), // Bottom side
    new THREE.MeshLambertMaterial( { map: new THREE.TextureLoader().load( 'img/sandcat.png' ), side: THREE.DoubleSide } ), // Front side
    new THREE.MeshBasicMaterial( { map: new THREE.TextureLoader().load( 'img/radcat.png' ), side: THREE.DoubleSide } )  // Back side
]

// create a material, color, or image texture.
var material = new THREE.MeshFaceMaterial( cubeMaterials );
var cube = new THREE.Mesh( geometry, material );
scene.add( cube ); 

camera.position.z = 3;

var floorGeometry = new THREE.BoxGeometry( 10, 1, 10 );
var floorMaterial = new THREE.MeshLambertMaterial( { map: new THREE.TextureLoader().load( 'img/chomie.png' ), side: THREE.DoubleSide });
var floorCube = new THREE.Mesh( floorGeometry, floorMaterial );
floorCube.position.y = -5;
scene.add( floorCube );

var ceilingGeometry = new THREE.BoxGeometry( 10, 1, 10 );
var ceilingMaterial = new THREE.MeshLambertMaterial( { map: new THREE.TextureLoader().load( 'img/tim.png' ), side: THREE.DoubleSide });
var ceilingCube = new THREE.Mesh( ceilingGeometry, ceilingMaterial );
ceilingCube.position.y = 5;
scene.add( ceilingCube );

var leftWallGeometry = new THREE.BoxGeometry( 1, 10, 10 );
var leftWallMaterial = new THREE.MeshLambertMaterial( { map: new THREE.TextureLoader().load( 'img/sam.png' ), side: THREE.DoubleSide });
var leftWallCube = new THREE.Mesh( leftWallGeometry, leftWallMaterial );
leftWallCube.position.x = -5;
scene.add( leftWallCube );

var rightWallGeometry = new THREE.BoxGeometry( 1, 10, 10 );
var rightWallMaterial = new THREE.MeshLambertMaterial( { map: new THREE.TextureLoader().load( 'img/rita.png' ), side: THREE.DoubleSide });
var rightWallCube = new THREE.Mesh( rightWallGeometry, rightWallMaterial );
rightWallCube.position.x = 5;
scene.add( rightWallCube );

var ambientLight = new THREE.AmbientLight( 0xFFFFFF, 1.0 );
scene.add( ambientLight );

// game logic
var update = function() {
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
};

// Draw scene
var render = function() {
    renderer.render( scene, camera );
};

// run game loop ( update, render, repeat )
var GameLoop = function(  ) {
    requestAnimationFrame( GameLoop );

    update();
    render();
};

GameLoop();