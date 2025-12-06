let scene, camera3D, renderer;
let player;
let lavaPlane;

function initThree() {
  const canvas = document.getElementById("three-canvas");

  renderer = new THREE.WebGLRenderer({ canvas });
  renderer.setSize(window.innerWidth, window.innerHeight);

  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x000000);

  camera3D = new THREE.PerspectiveCamera(
    60,
    window.innerWidth / window.innerHeight,
    0.1,
    100
  );
  camera3D.position.set(0, 3, 6);

  // Player Cube
  const boxGeo = new THREE.BoxGeometry(1, 1, 1);
  const boxMat = new THREE.MeshStandardMaterial({ color: 0x00ffea });
  player = new THREE.Mesh(boxGeo, boxMat);
  scene.add(player);

  // Lava floor
  const lavaGeo = new THREE.PlaneGeometry(20, 20);
  const lavaMat = new THREE.MeshStandardMaterial({
    color: 0xff4500,
    emissive: 0xff2200,
  });
  lavaPlane = new THREE.Mesh(lavaGeo, lavaMat);
  lavaPlane.rotation.x = -Math.PI / 2;
  scene.add(lavaPlane);

  // Light
  const light = new THREE.DirectionalLight(0xffffff, 1);
  light.position.set(3, 5, 2);
  scene.add(light);

  animate();
}

function animate() {
  requestAnimationFrame(animate);

  // apply body tracking movement
  player.position.x = THREE.MathUtils.lerp(
    player.position.x,
    bodyX * 3, // scale movement
    0.15
  );

  // danger check
  if (Math.abs(player.position.x) > 3.5) {
    player.material.color.set(0xff0000);
  } else {
    player.material.color.set(0x00ffea);
  }

  renderer.render(scene, camera3D);
}

window.addEventListener("DOMContentLoaded", initThree);
