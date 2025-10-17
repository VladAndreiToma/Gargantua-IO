import { useState, useRef, useEffect } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

export default function GravitySimulator() {
  const mountRef = useRef(null);
  const [gravityStrength, setGravityStrength] = useState(1); // 1*g
  const [mode, setMode] = useState("observe"); // "observe" sau "drag"

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    // === Scene setup ===
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      55,
      mount.clientWidth / mount.clientHeight,
      0.1,
      100
    );
    camera.position.set(4, 4, 5);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    mount.appendChild(renderer.domElement);

    // === Controls ===
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;

    // === Lights ===
    const ambient = new THREE.AmbientLight(0xffffff, 0.6);
    const point = new THREE.PointLight(0x88aaff, 1.3);
    point.position.set(5, 5, 5);
    scene.add(ambient, point);

    // === Points grid / particles ===
    const size = 6;
    const spacing = 0.5;
    const positions = [];
    const points = [];

    for (let x = -size / 2; x <= size / 2; x++) {
      for (let y = -size / 2; y <= size / 2; y++) {
        for (let z = -size / 2; z <= size / 2; z++) {
          const pos = new THREE.Vector3(x * spacing, y * spacing, z * spacing);
          positions.push(pos.x, pos.y, pos.z);
          points.push({ pos: pos.clone(), vel: new THREE.Vector3(0, 0, 0), orig: pos.clone() });
        }
      }
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(positions, 3)
    );

    const material = new THREE.PointsMaterial({
      color: new THREE.Color("#66ccff"),
      size: 0.04,
      transparent: true,
      opacity: 0.9,
    });

    const pointCloud = new THREE.Points(geometry, material);
    scene.add(pointCloud);

    // === Central mass ===
    const massGeometry = new THREE.SphereGeometry(0.12, 24, 24);
    const massMaterial = new THREE.MeshStandardMaterial({
      color: new THREE.Color("#ffaa33"),
      emissive: new THREE.Color("#ff6600"),
      emissiveIntensity: 1.2,
      roughness: 0.2,
      metalness: 0.5,
    });
    const centralMass = new THREE.Mesh(massGeometry, massMaterial);
    scene.add(centralMass);

    const targetPos = new THREE.Vector3(0, 0, 0);
    centralMass.position.copy(targetPos);

    // === Drag orb with mouse ===
    let isDragging = false;
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const onPointerDown = (event) => {
      if (mode !== "drag") return;
      const rect = mount.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObject(centralMass);
      if (intersects.length > 0) {
        isDragging = true;
        controls.enabled = false;
      }
    };

    const onPointerUp = () => {
      isDragging = false;
      controls.enabled = true;
    };

    const onPointerMove = (event) => {
      if (!isDragging) return;
      const rect = mount.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const planeZ = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
      const intersect = new THREE.Vector3();
      raycaster.ray.intersectPlane(planeZ, intersect);
      targetPos.copy(intersect);
    };

    mount.addEventListener("pointerdown", onPointerDown);
    mount.addEventListener("pointerup", onPointerUp);
    mount.addEventListener("pointermove", onPointerMove);

    // === Animation ===
    const clock = new THREE.Clock();

    function animate() {
      const delta = clock.getDelta();
      const g = gravityStrength * 0.0025; // gravitatea în multipli de g
      const positionsAttr = geometry.getAttribute("position");

      for (let i = 0; i < points.length; i++) {
        const p = points[i];

        if (mode === "observe") {
          // sink: particulele cad spre orb
          const dir = new THREE.Vector3().subVectors(centralMass.position, p.pos);
          const dist = dir.length();
          if (dist > 0.01) {
            dir.normalize();
            const force = dir.multiplyScalar(g / (dist * dist + 0.1));
            p.vel.add(force);
            p.vel.multiplyScalar(0.96);
            p.pos.addScaledVector(p.vel, delta * 60);
          }
        } else if (mode === "drag") {
          // warp vizual: punctele se curbează ușor spre orb
          const dir = new THREE.Vector3().subVectors(p.orig, centralMass.position);
          const dist = dir.length();
          dir.normalize();
          const warp = (gravityStrength * 0.5) / (dist * dist + 0.1);
          const target = new THREE.Vector3().copy(p.orig).addScaledVector(dir, -warp);
          p.pos.lerp(target, 0.15);
        }

        positionsAttr.setXYZ(i, p.pos.x, p.pos.y, p.pos.z);
      }

      positionsAttr.needsUpdate = true;
      centralMass.position.lerp(targetPos, 0.15);
      controls.update();
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    }

    animate();

    // === Resize ===
    const onResize = () => {
      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mount.clientWidth, mount.clientHeight);
    };
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      mount.removeChild(renderer.domElement);
      geometry.dispose();
      material.dispose();
      massGeometry.dispose();
      massMaterial.dispose();
      renderer.dispose();
    };
  }, [gravityStrength, mode]);

  return (
    <div className="sim-wrapper">
      <div ref={mountRef} className="sim-canvas"/>
      <div className="sim-option-row">
        <button className="sim-button" onClick={() => setMode("drag")}>Drag</button>
        <button className="sim-button" onClick={() => setMode("observe")}>Observe</button>
      </div>
      <div className="slider-wrapper">
        <label className="slider-label">Gravity Strength (g)</label>
        <input
          type="range"
          min="0"
          max="1"
          step="0.1"
          value={gravityStrength}
          onChange={(e) => setGravityStrength(parseFloat(e.target.value))}
          className="sim-slider"
        />
      </div>
    </div>
  );
}
