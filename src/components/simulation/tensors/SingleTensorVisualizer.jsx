import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import gsap from "gsap";
import { Center } from "@react-three/drei";

export default function SingleTensorVisualizer() {
  const mountRef = useRef(null);
  const cubeRef = useRef(null);
  const [iIndex, setIIndex] = useState("x");
  const [jIndex, setJIndex] = useState("y");
  const [kIndex, setKIndex] = useState("z");
  const [intensity, setIntensity] = useState(0.5);
  const spriteRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      65,
      mount.clientWidth / mount.clientHeight,
      0.1,
      1000
    );
    camera.position.set(3, 3, 5);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    const pointLight = new THREE.PointLight(0xffaa55, 1.5);
    pointLight.position.set(5, 5, 5);
    scene.add(ambientLight, pointLight);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.autoRotate = false;

    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshStandardMaterial({
      color: new THREE.Color("orange"),
      emissive: new THREE.Color("#ff6600"),
      emissiveIntensity: 0.8,
      depthTest: false,
      transparent: true,
      opacity: 0.6,
      roughness: 0.3,
      metalness: 0.4,
      side: THREE.DoubleSide,
    });
    const cube = new THREE.Mesh(geometry, material);
    cubeRef.current = cube;
    scene.add(cube);

    // === Sprite label inside cube ===
    const makeSprite = (text) => {
      const canvas = document.createElement("canvas");
      canvas.width = 512;
      canvas.height = 256;
      const ctx = canvas.getContext("2d");
      ctx.clearRect(0, 0, 512, 256);
      ctx.fillStyle = "white";
      ctx.font = "bold 120px Arial";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(text, 256, 128);
      const texture = new THREE.CanvasTexture(canvas);
      const spriteMaterial = new THREE.SpriteMaterial({
        map: texture,
        transparent: true,
        depthWrite: false,
      });
      const sprite = new THREE.Sprite(spriteMaterial);
      sprite.scale.set(1.3, 0.65, 1.3);
      return sprite;
    };

    const sprite = makeSprite(`T${iIndex}${jIndex}${kIndex}`);
    spriteRef.current = sprite;
    cube.add(sprite);

    const axesHelper = new THREE.AxesHelper(2);
    scene.add(axesHelper);

    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mount.clientWidth, mount.clientHeight);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      controls.dispose();
      renderer.dispose();
      mount.removeChild(renderer.domElement);
    };
  }, []);

  // === update sprite text when i,j,k change ===
  useEffect(() => {
    if (!spriteRef.current) return;
    const sprite = spriteRef.current;
    const canvas = document.createElement("canvas");
    canvas.width = 512;
    canvas.height = 256;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, 512, 256);
    ctx.fillStyle = "white";
    ctx.font = "bold 120px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(`T${iIndex}${jIndex}${kIndex}`, 256, 128);
    const texture = new THREE.CanvasTexture(canvas);
    sprite.material.map.dispose();
    sprite.material.map = texture;
    sprite.material.needsUpdate = true;
  }, [iIndex, jIndex, kIndex]);

  // === React to intensity changes ===
  useEffect(() => {
    const cube = cubeRef.current;
    if (!cube) return;

    const newColor = new THREE.Color().setHSL(
      0.55 + intensity * 0.1, // albastru cosmic
      1,
      0.5 + 0.1 * intensity
    );

    gsap.to(cube.material.color, {
      r: newColor.r,
      g: newColor.g,
      b: newColor.b,
      duration: 0.6,
      ease: "power1.out",
    });

    gsap.to(cube.material.emissive, {
      r: newColor.r,
      g: newColor.g,
      b: newColor.b,
      duration: 0.6,
    });

    gsap.to(cube.scale, {
      x: 1 + intensity * 0.6,
      y: 1 + intensity * 0.6,
      z: 1 + intensity * 0.6,
      duration: 0.8,
      ease: "power2.inOut",
    });
  }, [intensity]);

  return (
    <div className="sim-wrapper">
      <div ref={mountRef} className="sim-canvas"/>

      <div className="sim-option-row">
        <select value={iIndex} onChange={(e) => setIIndex(e.target.value)} className="sim-button">
          <option value="x">i = x</option>
          <option value="y">i = y</option>
          <option value="z">i = z</option>
        </select>
        <select value={jIndex} onChange={(e) => setJIndex(e.target.value)} className="sim-button">
          <option value="x">j = x</option>
          <option value="y">j = y</option>
          <option value="z">j = z</option>
        </select>
        <select value={kIndex} onChange={(e) => setKIndex(e.target.value)} className="sim-button">
          <option value="x">k = x</option>
          <option value="y">k = y</option>
          <option value="z">k = z</option>
        </select>
      </div>

      <div className="slider-wrapper">
        <label className="slider-label">Intensity (Magnitude)</label>
        <input type="range" min="0" max="1" step="0.01" value={intensity} onChange={(e) => setIntensity(parseFloat(e.target.value))} className="sim-slider"/>
      </div>

      <div className="slider-label">
        T<sub>{iIndex + jIndex + kIndex}</sub> — Component along ({iIndex}, {jIndex}, {kIndex})
      </div>
    </div>
  );
}
