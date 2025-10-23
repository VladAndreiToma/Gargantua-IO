// SpaceTimeFabric.jsx
import * as THREE from "three";
import { useRef, useEffect } from "react";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

export default function SpaceTimeFabric({ mass = 1 }) {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    // --- SCENE / CAMERA / RENDERER (use container size) ---
    const width = Math.max(1, mount.clientWidth);
    const height = Math.max(1, mount.clientHeight);

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 100);
    camera.position.set(0, 5, 10);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(width, height, false);
    renderer.domElement.style.display = "block";
    renderer.domElement.style.width = "100%";
    renderer.domElement.style.height = "100%";
    mount.appendChild(renderer.domElement);

    // --- CONTROLS ---
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enablePan = true;
    controls.enableZoom = true;
    controls.enableDamping = true;
    controls.dampingFactor = 0.08;
    controls.target.set(0, 0, 0);
    controls.update();

    // --- LIGHT ---
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    // --- FABRIC GRID ---
    const geometry = new THREE.PlaneGeometry(10, 10, 100, 100);
    geometry.rotateX(-Math.PI / 2);

    const positions = geometry.attributes.position;
    const k = 1.5; // scaling factor

    for (let i = 0; i < positions.count; i++) {
      const x = positions.getX(i);
      const z = positions.getZ(i);
      const r = Math.sqrt(x * x + z * z) + 0.3;
      const y = -k * mass / r;
      positions.setY(i, y);
    }
    positions.needsUpdate = true;

    const material = new THREE.MeshStandardMaterial({
      color: new THREE.Color("#4c00ff"),
      wireframe: true,
      emissive: new THREE.Color("#3300aa"),
      emissiveIntensity: 0.6,
    });

    const fabric = new THREE.Mesh(geometry, material);
    scene.add(fabric);

    // --- MASS SPHERE ---
    const sphereGeom = new THREE.SphereGeometry(0.3 * mass, 32, 32);
    const sphereMat = new THREE.MeshStandardMaterial({
      color: "#00baff",
      emissive: "#0066ff",
      emissiveIntensity: 1.2,
      metalness: 0.8,
      roughness: 0.4,
    });
    const sphere = new THREE.Mesh(sphereGeom, sphereMat);
    sphere.position.set(0, -k * mass / 0.3, 0);
    scene.add(sphere);

    // --- ANIMATION LOOP ---
    let rafId = null;
    const clock = new THREE.Clock();

    const animate = () => {
      rafId = requestAnimationFrame(animate);
      controls.update();
      // subtle animation
      const t = clock.getElapsedTime();
      sphere.rotation.y = t * 0.1;
      renderer.render(scene, camera);
    };
    animate();

    // --- RESIZE HANDLER (use container size) ---
    const handleResize = () => {
      if (!mount) return;
      const w = Math.max(1, mount.clientWidth);
      const h = Math.max(1, mount.clientHeight);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
      renderer.setSize(w, h, false);
    };
    window.addEventListener("resize", handleResize);

    // --- CLEANUP ---
    return () => {
      // cancel animation
      if (rafId) cancelAnimationFrame(rafId);

      // remove listeners
      window.removeEventListener("resize", handleResize);

      // remove canvas from DOM (safe guard)
      try {
        if (mount && renderer?.domElement && mount.contains(renderer.domElement)) {
          mount.removeChild(renderer.domElement);
        }
      } catch (e) {
        // ignore
      }

      // dispose controls and three resources
      try { controls.dispose(); } catch (e) {}
      try { geometry.dispose(); } catch (e) {}
      try { material.dispose(); } catch (e) {}
      try { sphereGeom.dispose(); } catch (e) {}
      try { sphereMat.dispose(); } catch (e) {}
      try { renderer.dispose(); } catch (e) {}
    };
  }, [mass]);

  return (
    <div className="sim-wrapper" style={{ width: "100%", height: "100%" }}>
        <div className="sim-otpion-row">Space-Time geodezic influenced by gravity</div>
        <div className="sim-option-row">Mass bends the 4 dimensional fabric of the universe</div>
      <div className="sim-canvas" ref={mountRef} style={{ width: "100%", height: "480px" }} />
    </div>
  );
}
