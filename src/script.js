
const dracoLoader = new THREE.DRACOLoader();
dracoLoader.setDecoderPath( '/scripts/draco/' );
dracoLoader.preload();
let scene, camera, renderer, controls, model, sphere;

function init() {
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x000000);

  camera = new THREE.PerspectiveCamera(
    40,
    window.innerWidth / window.innerHeight,
    1,
    5000
  );
  camera.position.set(0, 5, 100);

  addLights();

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  controls = new THREE.OrbitControls(camera, renderer.domElement);

  let loader = new THREE.GLTFLoader();
  loader.setDRACOLoader(dracoLoader);

  loader.load("model/modelDraco.gltf", function (gltf) {
    console.log("hello");
    console.log(gltf);
    model = gltf.scene.children[0];
    model.position.y = -19;
    scene.add(model);

    createSphere();

    animate(); // Start animation loop
  });

  document.addEventListener('mousemove', onDocumentMouseMove);
  
}

function animate() {
  
  if (model) {
    model.rotation.z -= 0.001; // Adjust the rotation speed here (e.g., 0.001 radians per frame for slower rotation)
  }

  renderer.render(scene, camera);

  requestAnimationFrame(animate); // Request the next frame
}

function addLights() {
  // Add directional lights
  const positions = [
    [200, 0, 0],
    [-200, 0, 0],
    [0, 200, 0],
    [0, -200, 0],
    [0, 0, 200],
    [0, 0, -200]
  ];

  positions.forEach(pos => {
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.6);
    directionalLight.position.set(...pos);
    directionalLight.castShadow = true;
    scene.add(directionalLight);
  });
}

function createSphere() {
  const geometry = new THREE.SphereGeometry(200, 50, 50);
  const material = new THREE.PointsMaterial({
    color: 0xffffff,
    size: 2
  });

  sphere = new THREE.Points(geometry, material);
  scene.add(sphere);
}

function onDocumentMouseMove(event) {
  if (sphere) {
    const mouseX = (event.clientX / window.innerWidth) * 2 - 1;
    const mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    sphere.rotation.y = mouseX * 0.25; 
    sphere.rotation.x = mouseY * 0.25;
  }
}

init();
