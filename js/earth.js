let maplo = "images/2_no_clouds_4kn.jpg"; //"images/2_no_clouds_4k.jpg";//
let clds = "images/fair_clouds_4kn.png"; //"images/fair_clouds_4k.png";//
let lines = "images/fair_lines_4k.png";

const Earth3D = () => {
	var webglEl = document.getElementById("webgl");

	if (!Detector.webgl) {
		Detector.addGetWebGLMessage(webglEl);
		return;
	}

	var width = window.innerWidth,
		height = window.innerHeight;

	// Earth params
	var radius = 1,
		segments = 64,
		rotation = 3;

	var scene = new THREE.Scene();

	var camera = new THREE.PerspectiveCamera(45, width / height, 0.01, 1000);
	camera.position.z = 3;

	var renderer = new THREE.WebGLRenderer();
	renderer.setSize(width, height);

	scene.add(new THREE.AmbientLight(0x555555));

	var light = new THREE.DirectionalLight(0xffffff, 1);
	light.position.set(5, 3, 5);
	scene.add(light);

	scene.add(new THREE.AmbientLight(0x333333));
	// light = new THREE.DirectionalLight(0x333333, 1);
	light.position.set(2, 2, 2);
	scene.add(light);

	var sphere = createSphere(radius, segments);
	sphere.rotation.y = rotation;
	scene.add(sphere);

	var clouds = createClouds(radius, segments);
	clouds.rotation.y = rotation;
	scene.add(clouds);

	var latLon = createLines(radius, segments);
	latLon.rotation.y = rotation;
	scene.add(latLon);

	var stars = createStars(90, 64);
	scene.add(stars);

	var controls = new THREE.TrackballControls(camera);

	webglEl.appendChild(renderer.domElement);

	render();

	function render() {
		controls.update();
		sphere.rotation.y += 0.0005;
		clouds.rotation.y += 0.0005;
		latLon.rotation.y += 0.0005;
		requestAnimationFrame(render);
		renderer.render(scene, camera);
	}
	function createSphere(radius, segments) {
		return new THREE.Mesh(
			new THREE.SphereGeometry(radius, segments, segments),
			new THREE.MeshPhongMaterial({
				map: THREE.ImageUtils.loadTexture(maplo),
				bumpMap: THREE.ImageUtils.loadTexture("images/elev_bump_4k.jpg"),
				bumpScale: 0.005,
				specularMap: THREE.ImageUtils.loadTexture("images/water_4k.png"),
				specular: new THREE.Color("grey")
			})
		);
	}

	function createClouds(radius, segments) {
		return new THREE.Mesh(
			new THREE.SphereGeometry(radius + 0.003, segments, segments),
			new THREE.MeshPhongMaterial({
				map: THREE.ImageUtils.loadTexture(clds),
				transparent: true
			})
		);
	}

	function createLines(radius, segments) {
		return new THREE.Mesh(
			new THREE.SphereGeometry(radius + 0.1, segments, segments),
			new THREE.MeshPhongMaterial({
				map: THREE.ImageUtils.loadTexture(lines),
				transparent: true
			})
		);
	}

	function createStars(radius, segments) {
		return new THREE.Mesh(
			new THREE.SphereGeometry(radius, segments, segments),
			new THREE.MeshBasicMaterial({
				map: THREE.ImageUtils.loadTexture("images/galaxy_starfield.png"),
				side: THREE.BackSide
			})
		);
	}
};

Earth3D();

// setInterval(()=>{
// 	if(maplo == "images/2_no_clouds_4kn.jpg"){
// 		maplo ="images/2_no_clouds_4k.jpg";
// 		clds = "images/fair_clouds_4k.png";
// 	}else{
// 		maplo == "images/2_no_clouds_4kn.jpg";
// 		clds = "images/fair_clouds_4kn.png";
// 	}
// 	Earth3D();
// }, 10000);
