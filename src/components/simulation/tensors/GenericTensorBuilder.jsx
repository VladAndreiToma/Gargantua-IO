import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

export default function GenericTensorBuilder() {
  const mountRef = useRef(null);
  const [mode, setMode] = useState("all");
  const cubesRef = useRef([]);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(
      70,
      mount.clientWidth / mount.clientHeight,
      0.1,
      1000
    );
    camera.position.set(6, 6, 8);
    camera.lookAt(0, 0, 0);

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setClearColor(0x000000, 0);
    renderer.sortObjects = false; // helps transparent blending
    mount.appendChild(renderer.domElement);

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.07;
    controls.target.set(0, 0, 0);
    controls.autoRotate = false;

    // Lights
    scene.add(new THREE.AmbientLight(0xffffff, 0.5));
    const pointLight = new THREE.PointLight(0xffffff, 1.2);
    pointLight.position.set(10, 10, 10);
    scene.add(pointLight);

    // Axes helper
    const axesHelper = new THREE.AxesHelper(3);
    scene.add(axesHelper);

    const axes = ["x", "y", "z"];
    const tensorGroup = new THREE.Group();
    const cubeSize = 0.8;
    const gap = 1.3;
    const cubes = [];

    // Creează cuburi pentru toți termenii T_ijk
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        for (let k = 0; k < 3; k++) {
          const geometry = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize);
          const material = new THREE.MeshStandardMaterial({
            color: new THREE.Color(
              0.25 + Math.random() * 0.25,
              0.3 + Math.random() * 0.25,
              0.4 + Math.random() * 0.25
            ),
            transparent: true,
            opacity: 0.4,
            roughness: 0.5,
            metalness: 0.2,
            side: THREE.DoubleSide,
            depthWrite: false,
            blending: THREE.NormalBlending,
          });

          const cube = new THREE.Mesh(geometry, material);

          const x = (i - 1) * gap;
          const y = (j - 1) * gap;
          const z = (k - 1) * gap;
          cube.position.set(x, y, z);

          const label = `T${axes[i]}${axes[j]}${axes[k]}`;
          cube.userData = { i, j, k, label };

          // Label sprite
          const canvas = document.createElement("canvas");
          canvas.width = 256;
          canvas.height = 256;
          const ctx = canvas.getContext("2d");
          ctx.fillStyle = "#ffffff";
          ctx.font = "bold 40px Arial";
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.fillText(label, 128, 128);

          const texture = new THREE.CanvasTexture(canvas);
          texture.minFilter = THREE.LinearFilter;
          const spriteMaterial = new THREE.SpriteMaterial({
            map: texture,
            transparent: true,
            depthTest: false,
          });
          const sprite = new THREE.Sprite(spriteMaterial);
          sprite.scale.set(1.1, 1.1, 1.1);
          cube.add(sprite);

          tensorGroup.add(cube);
          cubes.push(cube);
        }
      }
    }

    cubesRef.current = cubes;
    scene.add(tensorGroup);

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      mount.removeChild(renderer.domElement);
      renderer.dispose();
      controls.dispose();
      cubesRef.current = [];
    };
  }, []);

  // Mode filters
  useEffect(() => {
    const diag = new Set(["Txxx", "Tyyy", "Tzzz"]);

    cubesRef.current.forEach((cube) => {
      const { label } = cube.userData;
      const isDiagonal = diag.has(label);
      const startsWithX = label.startsWith("Tx");
      const startsWithY = label.startsWith("Ty");
      const startsWithZ = label.startsWith("Tz");

      let visible = true;

      switch (mode) {
        case "all":
          visible = true;
          break;
        case "normal":
          visible = isDiagonal;
          break;
        case "shear":
          visible = !isDiagonal;
          break;
        case "planex":
          visible = startsWithX;
          break;
        case "planey":
          visible = startsWithY;
          break;
        case "planez":
          visible = startsWithZ;
          break;
      }

      cube.visible = visible;
      cube.material.opacity = visible ? 0.4 : 0;
    });
  }, [mode]);

  return (
    <div className="sim-wrapper">
      <div ref={mountRef} className="sim-canvas"/>
        <div className="sim-option-row">
          <button className="sim-button" onClick={() => setMode("all")}>
            All
          </button>
          <button className="sim-button" onClick={() => setMode("normal")}>
            Normal
          </button>
          <button className="sim-button" onClick={() => setMode("shear")}>
            Shear
          </button>
        </div>
        <div className="sim-option-row">
          <button className="sim-button" onClick={() => setMode("planex")}>
            Plane X
          </button>
          <button className="sim-button" onClick={() => setMode("planey")}>
            Plane Y
          </button>
          <button className="sim-button" onClick={() => setMode("planez")}>
            Plane Z
          </button>
        </div>
      </div>
  );
}



