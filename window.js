window.addEventListener('DOMContentLoaded', init);

function init() {
  const width = 960;
  const height = 540;

  // レンダラーを作成
  const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#myCanvas')
  });
  renderer.setSize(width, height);
  renderer.setPixelRatio(window.devicePixelRatio);


  const loader=new THREE.loader();
  const loader0=textureLoader.load("sun.jpg");

  // シーンを作成
  const scene = new THREE.Scene();

  // カメラを作成
  const camera = new THREE.PerspectiveCamera(45, width / height, 1, 10000);
  // カメラの初期座標を設定（X座標:0, Y座標:0, Z座標:0）
  camera.position.set(0, 0, 1000);

  // 箱を作成
  const geometry = new THREE.SphereGeometry(300, 300, 300);
  const material = new THREE.MeshStandardMaterial({map:loader0,});
  const box = new THREE.Mesh(geometry, material);
  scene.add(box);

  // 平行光源
  const light = new THREE.DirectionalLight(0xFFFFFF);
  light.intensity = 2; // 光の強さを倍に
  light.position.set(1, 1, 1); // ライトの方向
  // シーンに追加
  scene.add(light);

  // 初回実行
  tick();

  function tick() {
    requestAnimationFrame(tick);

    // 箱を回転させる
    box.rotation.x += 0.01;
    box.rotation.y += 0.01;

    // レンダリング
    renderer.render(scene, camera);
  }
}