function Entity (x,y,z) {
    this.x = x;
    this.y = y;
    this.z = z;
}

function Meteor (x,y,z) {
    var entity = new Entity(x,y,z);
    var meteor = Object.create(entity);
    return meteor;
}

function Ship (x,y,z,name) {
    var entity = new Entity(x,y,z);
    var ship = Object.create(entity);
    ship.name = name;
	var geometry = new THREE.OctahedronGeometry(1,0);
	var material = new THREE.MeshPhongMaterial( { ambient: 0x030303, color: 0xdddddd, specular: 0x009900, shininess: 30, shading: THREE.FlatShading } );
	ship.sprite = new THREE.Mesh( geometry, material );
	ship.sprite.position.x = ship.x;
	ship.sprite.position.y = ship.y;
	ship.sprite.position.z = ship.z;
	console.log("New ship created at " + ship.x + ", " + ship.y + ", " + ship.z);
    return ship;
}

function Torpedo (x,y,z,dx,dy,dz) {
    var entity = new Entity(x,y,z)
    var torpedo = Object.create(entity)
	var geometry = new THREE.SphereGeometry(1,0,0);
	var material = new THREE.MeshBasicMaterial( { color: 0xffffff } );
	torpedo.sprite = new THREE.Mesh( geometry, material );
	torpedo.sprite.position.x = torpedo.x;
	torpedo.sprite.position.y = torpedo.y;
	torpedo.sprite.position.z = torpedo.z;
	torpedo.dx = dx;
	torpedo.dy = dy;
	torpedo.dz = dz;
	console.log("New torpedo created at " + torpedo.x + ", " + torpedo.y + ", " + torpedo.z);
    return torpedo
    }

function render() {
	requestAnimationFrame(render);
	for (i=0; i<ships.length; i++) {
		ships[i].sprite.position.z += 0.01;
		ships[i].sprite.rotation.x += 0.01;
	}
	torpedo[0].sprite.position.z += torpedo[0].dz
	renderer.render(scene, camera);
}

// Set up scene

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
var renderer = new THREE.WebGLRenderer({ antialias: true , autoClear: true });
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

// Instantiate spacecraft

var ships = [];
for (a=0; a<2; a++) {
	ships[a] = new Ship(Math.floor(Math.random()*5),Math.floor(Math.random()*5),Math.floor(Math.random()*5),"Daedalus");
	scene.add(ships[a].sprite);
	console.log(ships[a].name);
}

// Instantiate torpedo

var torpedo = []
torpedo[0] = new Torpedo(0,0,0,0,0,-1)
scene.add(torpedo[0].sprite)

//var ship = new Ship(1,1,1,"Daedalus");

camera.position.z = 5;

var light = new THREE.PointLight( 0xeeeecc, 1, 100 );
light.position.set( 50, 50, 50 );
scene.add(light);

render();