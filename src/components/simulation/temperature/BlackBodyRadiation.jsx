import { useRef, useEffect, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

export default function BlackBodyRadiation() {
  const mountRef = useRef(null);
  const particlesRef = useRef([]);
  const [temperature, setTemperature] = useState(0.5); // 0=cold(red), 1=hot(blue)
  const [entropy, setEntropy] = useState(0.5); // 0=ordered, 1=chaotic

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(25, mount.clientWidth / mount.clientHeight, 0.1, 1000);
    camera.position.set(0, 0, 25);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;

    scene.add(new THREE.AmbientLight(0xffffff, 0.3));
    const pointLight = new THREE.PointLight(0xffffff, 1);
    pointLight.position.set(30, 30, 30);
    scene.add(pointLight);

    // Halo central - sferă neagră
    const haloRadius = 4;
    const haloGeometry = new THREE.SphereGeometry(haloRadius, 64, 64);
    const haloMaterial = new THREE.MeshStandardMaterial({
      color: 0x000000,
      transparent: true,
      opacity: 0.8,
      emissive: 0x111111,
      emissiveIntensity: 0.05,
    });
    const halo = new THREE.Mesh(haloGeometry, haloMaterial);
    scene.add(halo);

    // Particule pe coaja halo-ului
    const particleCount = 500;
    const particles = [];
    const group = new THREE.Group();

    for (let i = 0; i < particleCount; i++) {
      const size = Math.random() * 0.08 + 0.05;
      const geom = new THREE.SphereGeometry(size, 8, 8);
      const color = new THREE.Color(1 - temperature, 0, temperature); // albastru = hot, rosu = cold
      const mat = new THREE.MeshStandardMaterial({
        color,
        transparent: true,
        opacity: 0.8,
        emissive: color.clone(),
        emissiveIntensity: 0.5,
      });
      const p = new THREE.Mesh(geom, mat);

      // poziție uniformă pe coajă la entropy=0, deviere radială la entropy>0
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(1 - 2 * Math.random());
      const rOffset = (Math.random() - 0.5) * entropy * 2; // deviere radială proportional cu entropia
      const r = haloRadius + 0.5 + rOffset;

      p.position.set(
        r * Math.sin(phi) * Math.cos(theta),
        r * Math.sin(phi) * Math.sin(theta),
        r * Math.cos(phi)
      );

      // viteză mică inițială
      p.userData.velocity = new THREE.Vector3(
        (Math.random() - 0.5) * 0.002,
        (Math.random() - 0.5) * 0.002,
        (Math.random() - 0.5) * 0.002
      );

      particles.push(p);
      group.add(p);
    }

    scene.add(group);
    particlesRef.current = particles;

    const animate = () => {
      requestAnimationFrame(animate);

      particles.forEach((p) => {
        // Entropy = dezordine radială și aleatorie
        if (entropy > 0) {
          const chaos = new THREE.Vector3(
            (Math.random() - 0.5) * entropy * 0.01,
            (Math.random() - 0.5) * entropy * 0.01,
            (Math.random() - 0.5) * entropy * 0.01
          );
          p.userData.velocity.add(chaos);
        }

        // damping
        p.userData.velocity.multiplyScalar(0.98);

        // temperatura = viteza
        const speedFactor = 0.3 + temperature * 2; // mai fierbinte = mai rapid
        p.position.addScaledVector(p.userData.velocity, speedFactor);

        // culoare temperatura
        p.material.color.setRGB(1 - temperature, 0, temperature);
        p.material.emissive.setRGB(1 - temperature, 0, temperature);
      });

      controls.update();
      renderer.render(scene, camera);
    };

    animate();

    return () => {
      mount.removeChild(renderer.domElement);
      renderer.dispose();
      controls.dispose();
    };
  }, [temperature, entropy]);

  return (
    <div className='sim-wrapper'>
      <div ref={mountRef} className='sim-canvas'/>
      <div className="slider-wrapper">
        <label className='slider-label'>
          Temperature (Cold ↔ Hot)
        </label>
        <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={temperature}
            onChange={(e) => setTemperature(parseFloat(e.target.value))}
            className='sim-slider'
          />
        <label className='slider-label'>
          Entropy (Low ↔ High)
        </label>
        <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={entropy}
            onChange={(e) => setEntropy(parseFloat(e.target.value))}
            className='sim-slider'
          />
      </div>
    </div>
  );
}
