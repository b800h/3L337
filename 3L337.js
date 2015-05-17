


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
    // This needs to be abstracted so that we can create different types of ship.
    var entity = new Entity(x,y,z);
    var ship = Object.create(entity);

    ship.name = name;

	ship.speed = 0;
	ship.maxspeed = 0;
	ship.weapons = []
	ship.maxweapons = 2;


	var geometry = new THREE.OctahedronGeometry(1,0);
	var material = new THREE.MeshPhongMaterial( { ambient: 0x030303, color: 0xdddddd, specular: 0x009900, shininess: 30, shading: THREE.FlatShading } );
	ship.sprite = new THREE.Mesh( geometry, material );

	ship.sprite.position.x = ship.x;
	ship.sprite.position.y = ship.y;
	ship.sprite.position.z = ship.z;

	console.log("New ship created at " + ship.x + ", " + ship.y + ", " + ship.z);

	ship.getHeading = function () {
	}

	ship.chooseTarget = function () {
	}

	ship.move = function () {
	    this.sprite.position.z += 0.01;
		this.sprite.rotation.x += 0.01;
	}

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

	torpedo.move = function () {
	    torpedo.sprite.position.x += torpedo.dx;
	    torpedo.sprite.position.y += torpedo.dy;
	    torpedo.sprite.position.z += torpedo.dz;
	}

	console.log("New torpedo created at " + torpedo.x + ", " + torpedo.y + ", " + torpedo.z);
    return torpedo
    }

function render() {
	requestAnimationFrame(render);
	for (i=0; i<ships.length; i++) {
		ships[i].move();
	}
	renderer.render(scene, camera);
	if( keyboard.pressed("z") ) {
        torpedoes.push(new Torpedo(camera.position.x,camera.position.y,camera.position.z,0,0,-1))
        scene.add(torpedoes[torpedoes.length-1].sprite)
	}
	if( keyboard.pressed("up") ) {
        camera.position.y += 0.1;
	}
	if( keyboard.pressed("down") ) {
        camera.position.y -= 0.1;
	}
	if( keyboard.pressed("left") ) {
        camera.position.x -= 0.1;
	}
	if( keyboard.pressed("right") ) {
        camera.position.x += 0.1;
	}
	if( keyboard.pressed("1")) {
	    speed = 1;
	    document.getElementById("speed").innerHTML = "S";
	}
	if( keyboard.pressed("2")) {
	    speed = 2;
        document.getElementById("speed").innerHTML = "SS";
	}
	if( keyboard.pressed("3")) {
	    speed = 3;
        document.getElementById("speed").innerHTML = "SSS";
	}
	if( keyboard.pressed("4")) {
	    speed = 4;
        document.getElementById("speed").innerHTML = "SSSS";
	}
	if( keyboard.pressed("5")) {
	    speed = 5;
        document.getElementById("speed").innerHTML = "SSSSS";
	}
	if( keyboard.pressed("6")) {
	    speed = 6;
        document.getElementById("speed").innerHTML = "SSSSSS";
	}
	if( keyboard.pressed("7")) {
	    speed = 7;
        document.getElementById("speed").innerHTML = "SSSSSSS";
	}
	if( keyboard.pressed("8")) {
	    speed = 8;
        document.getElementById("speed").innerHTML = "SSSSSSSS";
	}
	if( keyboard.pressed("9")) {
	    speed = 9;
        document.getElementById("speed").innerHTML = "SSSSSSSSS";
	}
	if( keyboard.pressed("0")) {
	    speed = 0;
        document.getElementById("speed").innerHTML = "";
	}
	for (i=0; i<torpedoes.length; i++) {
	    torpedoes[i].move();
	}
	camera.position.z -= speed/100;
}

// Set up scene

speed = 2;

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
var renderer = new THREE.WebGLRenderer({ antialias: true , autoClear: true });
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

// Turn on Keyboard Handler

var keyboard = new THREEx.KeyboardState();

// Instantiate spacecraft

var ships = [];
for (a=0; a<2; a++) {
	ships[a] = new Ship(Math.floor(Math.random()*5),Math.floor(Math.random()*5),Math.floor(Math.random()*5),"Daedalus");
	scene.add(ships[a].sprite);
	console.log(ships[a].name);
}

// Create torpedo array

torpedoes = []

//var ship = new Ship(1,1,1,"Daedalus");

camera.position.z = 5;

var light = new THREE.PointLight( 0xeeeecc, 1, 100 );
light.position.set( 50, 50, 50 );
scene.add(light);

render();