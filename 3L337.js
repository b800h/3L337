function render() {
	requestAnimationFrame( render ); 
	cube.rotation.x += 0.1;
	cube.rotation.y += 0.1;
	cube.position.z += 0.01;
	icosahedron.position.z += 0.01;
	icosahedron.rotation.x += 0.01;
	renderer.render( scene, camera );
}

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

var renderer = new THREE.WebGLRenderer(); renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

var geometry = new THREE.BoxGeometry( 1, 1, 1 );
var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
var cube = new THREE.Mesh( geometry, material );

var geometry = new THREE.IcosahedronGeometry(1,0);
var material = new THREE.LineBasicMaterial( {color: 0xff0000 } );
var icosahedron = new THREE.Mesh( geometry, material );

scene.add( cube );
scene.add(icosahedron);

icosahedron.position.x += 1;
cube.position.x -= 1;

camera.position.z = 5;
render();