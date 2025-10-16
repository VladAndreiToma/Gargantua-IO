import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

export default function SelectiveTensor() {
  const mountRef = useRef(null);
  const cubesRef = useRef([]);
  const [selectedCube, setSelectedCube] = useState(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    // Scene & Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      mount.clientWidth / mount.clientHeight,
      0.1,
      1000
    );
    const initialCameraPos = new THREE.Vector3(5, 5, 5);
    camera.position.copy(initialCameraPos);

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    mount.appendChild(renderer.domElement);

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;

    // Lights
    scene.add(new THREE.AmbientLight(0xffffff, 0.6));
    const point = new THREE.PointLight(0xffffff, 1);
    point.position.set(5, 10, 5);
    scene.add(point);

    // Cubes with labels
    const axes = ["x", "y", "z"];
    const group = new THREE.Group();
    const gap = 1.5;

    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        for (let k = 0; k < 3; k++) {
          const geometry = new THREE.BoxGeometry(1, 1, 1);
          const material = new THREE.MeshStandardMaterial({
            color: new THREE.Color(Math.random(), Math.random(), Math.random()),
          });
          const cube = new THREE.Mesh(geometry, material);
          cube.position.set((i - 1) * gap, (j - 1) * gap, (k - 1) * gap);
          const label = `T${axes[i]}${axes[j]}${axes[k]}`;
          cube.userData.label = label;

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
          const spriteMaterial = new THREE.SpriteMaterial({
            map: texture,
            transparent: true,
            depthTest: false,
          });
          const sprite = new THREE.Sprite(spriteMaterial);
          sprite.scale.set(1.5, 1.5, 1.5);
          sprite.position.set(0, 1.2, 0);
          cube.add(sprite);

          group.add(cube);
          cubesRef.current.push(cube);
        }
      }
    }

    scene.add(group);

    // Raycaster
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const handleClick = (event) => {
      const rect = mount.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(cubesRef.current);
      if (intersects.length > 0) {
        setSelectedCube(intersects[0].object);
      }
    };

    mount.addEventListener("click", handleClick);

    // Animation
    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();

      if (selectedCube) {
        const offset = new THREE.Vector3(0, 0, 3);
        const targetPos = selectedCube.position.clone().add(offset);
        camera.position.lerp(targetPos, 0.1);
        controls.target.lerp(selectedCube.position, 0.1);
      } else {
        camera.position.lerp(initialCameraPos, 0.05);
        controls.target.lerp(new THREE.Vector3(0, 0, 0), 0.05);
      }

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      mount.removeEventListener("click", handleClick);
      mount.removeChild(renderer.domElement);
      renderer.dispose();
      controls.dispose();
    };
  }, [selectedCube]);

  return (
    <div style={{ textAlign: "center", display: "flex", flexDirection: "column", gap: "1rem" }}>
      {selectedCube && (
        <button
          onClick={() => setSelectedCube(null)}
          style={{ width: "120px", margin: "0 auto", padding: "0.5rem", fontWeight: "bold" }}
        >
          Back
        </button>
      )}
      <div
        ref={mountRef}
        style={{ width: "100%", height: "500px", background: "#111" }}
      />
    </div>
  );
}

