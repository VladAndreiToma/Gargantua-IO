// Mascot.jsx
import React, { useRef, useEffect, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

/**
 * Mascot: "alive particle slime" + overlay chat.
 * - double-click / double-tap opens chat
 * - pointer moves distort surface
 * - container is centered and renderer size synced to CSS
 */
export default function Mascot({ height = 450 }) {
  const mountRef = useRef(null);
  const [chatOpen, setChatOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([{ from: "gargantua", text: "Hi! Let's discover things ✨" }]);
  const replyTimeouts = useRef([]);

  // chat autoscroll
  const messagesEndRef = useRef(null);
  useEffect(() => {
    if (messagesEndRef.current) messagesEndRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, chatOpen]);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    // --- ensure mount centers the canvas so it won't stick to a corner ---
    mount.style.display = "flex";
    mount.style.alignItems = "center";
    mount.style.justifyContent = "center";
    mount.style.boxSizing = "border-box";
    mount.innerHTML = "";

    // quick webgl support check
    try {
      const c = document.createElement("canvas");
      const ctx = c.getContext("webgl") || c.getContext("experimental-webgl");
      if (!ctx) throw new Error("WebGL not supported");
    } catch (err) {
      mount.innerText = "WebGL unavailable";
      return;
    }

    // sizes (mount should have explicit size from parent; Home wrapper should pass sensible width)
    const W = mount.clientWidth || 600;
    const H = typeof height === "number" ? height : mount.clientHeight || 450;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, W / H, 0.1, 100);
    camera.position.set(0, 0.5, 3.6);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    // IMPORTANT: third param true will update canvas style width/height too
    renderer.setSize(W, H, true);
    renderer.setClearColor(0x000000, 0);
    renderer.domElement.style.display = "block";
    renderer.domElement.style.width = "100%";
    renderer.domElement.style.height = "100%";
    mount.appendChild(renderer.domElement);

    // controls (kept but limited)
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enablePan = false;
    controls.enableZoom = false;
    controls.enableDamping = true;
    controls.autoRotate = false;
    controls.target.set(0, 0, 0);
    controls.update();

    // lights (soft)
    scene.add(new THREE.HemisphereLight(0xcfe6ff, 0x10111a, 0.45));
    const key = new THREE.DirectionalLight(0xffffff, 0.5);
    key.position.set(3, 5, 3);
    scene.add(key);

    // --- PARTICLES (slime) ---
    const PARTICLE_COUNT = 1400;
    const positions = new Float32Array(PARTICLE_COUNT * 3);
    const seeds = new Float32Array(PARTICLE_COUNT);
    const scales = new Float32Array(PARTICLE_COUNT);

    // distribute points inside a sphere shell-ish
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      let x, y, z;
      // sample inside unit sphere for organic look, then push toward shell with random radius
      do {
        x = Math.random() * 2 - 1;
        y = Math.random() * 2 - 1;
        z = Math.random() * 2 - 1;
      } while (x * x + y * y + z * z > 1);
      const baseR = 0.9 + Math.random() * 0.7;
      positions[i * 3] = x * baseR;
      positions[i * 3 + 1] = y * baseR;
      positions[i * 3 + 2] = z * baseR;
      seeds[i] = Math.random() * 10.0;
      scales[i] = 0.8 + Math.random() * 2.4;
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geo.setAttribute("aSeed", new THREE.BufferAttribute(seeds, 1));
    geo.setAttribute("aScale", new THREE.BufferAttribute(scales, 1));

    // uniforms
    const uniforms = {
      uTime: { value: 0.0 },
      uPixelRatio: { value: Math.min(window.devicePixelRatio || 1, 2) },
      uPointer: { value: new THREE.Vector2(10, 10) }, // offscreen default
      uClick: { value: new THREE.Vector3(10, 10, -9999) }, // x,y,startTime
      uColorA: { value: new THREE.Color(0x2ea6ff) }, // blue
      uColorB: { value: new THREE.Color(0x7a64ff) }, // violet
      uColorC: { value: new THREE.Color(0xffffff) }, // highlight
      uGlobalBrightness: { value: 1.1 },
    };

    // vertex + fragment shaders — **do not redeclare** 'position' attribute; use built-in variable.
    const material = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      uniforms,
      vertexShader: `
        precision highp float;
        attribute float aSeed;
        attribute float aScale;
        uniform float uTime;
        uniform vec2 uPointer;
        uniform vec3 uClick;
        uniform float uPixelRatio;
        varying float vSeed;
        varying float vScale;
        varying float vClickInfluence;

        // simple layered sin noise for organic surface
        float layeredNoise(vec3 p) {
          float n = 0.0;
          n += 0.20 * sin(p.x * 3.1 + uTime * 1.4 + aSeed * 1.1);
          n += 0.12 * sin(p.y * 4.2 + uTime * 0.9 + aSeed * 2.3);
          n += 0.08 * sin(p.z * 5.3 + uTime * 1.9 + aSeed * 0.7);
          return n;
        }

        void main() {
          vSeed = aSeed;
          vScale = aScale;

          // base noise-displacement (slime breathing)
          vec3 pos = position;
          float n = layeredNoise(pos) * 0.12;

          // pointer influence (projected onto XY plane)
          vec2 p = uPointer;
          float pd = 999.0;
          if (p.x < 9.0) {
            pd = distance(vec2(pos.x, pos.y), p);
          }
          float pointerBump = 0.0;
          if (pd < 1.2) {
            pointerBump = 0.35 * exp(-pd * 5.5) * (1.0 + 0.8 * sin(uTime * 6.0 + aSeed));
          }

          // click pulse influence
          float clickStart = uClick.z;
          float clickAge = uTime - clickStart;
          float clickInf = 0.0;
          if (clickStart > -100.0 && clickAge >= 0.0) {
            vec2 cp = uClick.xy;
            float cd = distance(vec2(pos.x, pos.y), cp);
            float r = 0.25 + clickAge * 0.9;
            clickInf = 1.2 * exp(- (cd - r)*(cd - r) * 12.0) * max(0.0, 1.0 - clickAge * 0.6);
          }

          float total = n + pointerBump + clickInf;

          // displace outward along normalized direction for "slime puff"
          vec3 dir = normalize(pos);
          vec3 newPos = pos + dir * total * (0.9 + aScale * 0.12);

          // compute gl_PointSize using distance and scale
          vec4 mvPos = modelViewMatrix * vec4(newPos, 1.0);
          float dist = -mvPos.z;
          float size = (4.0 + aScale * 4.0) * uPixelRatio / (dist * 0.85);
          gl_PointSize = clamp(size, 2.0, 48.0);

          vClickInfluence = clamp(pointerBump + clickInf, 0.0, 1.0);

          gl_Position = projectionMatrix * mvPos;
        }
      `,
      fragmentShader: `
        precision highp float;
        uniform vec3 uColorA;
        uniform vec3 uColorB;
        uniform vec3 uColorC;
        uniform float uTime;
        uniform float uGlobalBrightness;
        varying float vSeed;
        varying float vScale;
        varying float vClickInfluence;

        void main() {
          vec2 uv = gl_PointCoord - 0.5;
          float d = length(uv);

          float core = smoothstep(0.3, 0.0, d);   // core brightness
          float rim = smoothstep(0.75, 0.28, d);  // outer soft rim

          float h = 0.45 + 0.5 * sin(uTime * 0.6 + vSeed * 1.9);
          vec3 base = mix(uColorA, uColorB, h);

          // push towards white if pointer/click influenced
          vec3 col = mix(base, uColorC, vClickInfluence * 0.9);

          float brightness = 0.5 + 1.6 * core + 0.5 * (1.0 - d) * (vScale * 0.28);
          brightness *= uGlobalBrightness;

          float alpha = clamp(core + (1.0 - d) * 0.6 * rim, 0.0, 1.0);
          vec3 finalCol = col * brightness;

          gl_FragColor = vec4(finalCol, alpha);
          if (gl_FragColor.a < 0.02) discard;
        }
      `,
    });

    const points = new THREE.Points(geo, material);
    scene.add(points);

    // add soft inner core mesh to give volume (non-shader, simple)
    const innerGeo = new THREE.SphereGeometry(0.6, 24, 24);
    const innerMat = new THREE.MeshStandardMaterial({ color: 0x07070b, roughness: 0.7, metalness: 0.1 });
    const inner = new THREE.Mesh(innerGeo, innerMat);
    scene.add(inner);

    // interaction helpers: ray + pointer -> project to z=0 plane for pointer uniforms
    const ray = new THREE.Raycaster();
    const pointer = new THREE.Vector2();

    function pointerToPlane(clientX, clientY) {
      const rect = renderer.domElement.getBoundingClientRect();
      pointer.x = ((clientX - rect.left) / rect.width) * 2 - 1;
      pointer.y = -((clientY - rect.top) / rect.height) * 2 + 1;
      ray.setFromCamera(pointer, camera);
      const plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0.0); // z=0 plane
      const hit = new THREE.Vector3();
      const ok = ray.ray.intersectPlane(plane, hit);
      return ok ? hit : null;
    }

    // double-tap handling
    let lastTap = 0;
    function handlePointerDown(e) {
      // compute hit point for shader control & click pulse
      const hit = pointerToPlane(e.clientX, e.clientY);
      if (hit) {
        material.uniforms.uClick.value.set(hit.x, hit.y, performance.now() / 1000);
      }
      const now = performance.now();
      if (now - lastTap < 350) {
        // double-click / double-tap detected
        setChatOpen(true);
      }
      lastTap = now;
    }

    function handlePointerMove(e) {
      const hit = pointerToPlane(e.clientX, e.clientY);
      if (hit) material.uniforms.uPointer.value.set(hit.x, hit.y);
      else material.uniforms.uPointer.value.set(10, 10); // default: offscreen
    }

    // also listen for dblclick event for desktop reliability
    function handleDblClick() {
      setChatOpen(true);
    }

    renderer.domElement.addEventListener("pointerdown", handlePointerDown);
    renderer.domElement.addEventListener("pointermove", handlePointerMove);
    renderer.domElement.addEventListener("dblclick", handleDblClick);

    // animation loop
    const clock = new THREE.Clock();
    let rafId = null;
    function animate() {
      rafId = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();
      material.uniforms.uTime.value = t;

      // subtle rotations + breathing
      points.rotation.y += 0.0009;
      points.rotation.x += 0.0002;
      const breathe = 1.0 + 0.015 * Math.sin(t * 1.5);
      points.scale.set(breathe, breathe, breathe);

      inner.scale.set(1.0 + 0.01 * Math.sin(t * 2.5), 1.0 + 0.01 * Math.sin(t * 2.5), 1.0 + 0.01 * Math.sin(t * 2.5));

      controls.update();
      renderer.render(scene, camera);
    }
    animate();

    // resize handling (keep true to update CSS size as well)
    function onResize() {
      const WW = mount.clientWidth;
      const HH = mount.clientHeight;
      camera.aspect = WW / HH;
      camera.updateProjectionMatrix();
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
      renderer.setSize(WW, HH, true);
      material.uniforms.uPixelRatio.value = Math.min(window.devicePixelRatio || 1, 2);
    }
    window.addEventListener("resize", onResize);

    // cleanup
    return () => {
      cancelAnimationFrame(rafId);
      renderer.domElement.removeEventListener("pointerdown", handlePointerDown);
      renderer.domElement.removeEventListener("pointermove", handlePointerMove);
      renderer.domElement.removeEventListener("dblclick", handleDblClick);
      window.removeEventListener("resize", onResize);
      replyTimeouts.current.forEach((id) => clearTimeout(id));
      replyTimeouts.current = [];
      try {
        geo.dispose();
        material.dispose();
        innerGeo.dispose();
        innerMat.dispose();
      } catch (e) {}
      if (renderer && renderer.domElement && mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
      renderer.dispose();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [height]);

  // send message (mock reply)
  const sendMessage = (text) => {
    if (!text || !text.trim()) return;
    const t = text.trim();
    setMessages((m) => [...m, { from: "you", text: t }]);
    setInput("");
    const id = setTimeout(() => {
      const replyVariants = [
        "Interesant — spune-mi mai mult.",
        "Hmmm... asta sună cool 😄",
        "Pot să-ți arăt un exemplu vizual pentru asta.",
        "Aha — deci vrei să explorăm mai adânc.",
      ];
      setMessages((m) => [...m, { from: "gargantua", text: replyVariants[Math.floor(Math.random() * replyVariants.length)] }]);
    }, 500 + Math.random() * 800);
    replyTimeouts.current.push(id);
  };

  const onKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  return (
    <div style={{ width: "100%", boxSizing: "border-box", paddingLeft: "0.5rem", paddingRight: "0.5rem", position: "relative" }}>
      <div
        ref={mountRef}
        style={{
          width: "100%",
          height: typeof height === "number" ? `${height}px` : height,
          borderRadius: 12,
          overflow: "hidden",
          background: "transparent",
        }}
      />

      {/* Chat overlay */}
      {chatOpen && (
        <div style={overlayStyles.container}>
          <button style={overlayStyles.close} onClick={() => setChatOpen(false)} aria-label="Close chat">✕</button>
          <div style={overlayStyles.header}>Gargantua</div>

          <div style={overlayStyles.body}>
            <div style={overlayStyles.msgList} aria-live="polite">
              {messages.map((m, idx) => (
                <div key={idx} style={m.from === "you" ? overlayStyles.msgYou : overlayStyles.msgBot}>
                  <div style={{ fontSize: 13, whiteSpace: "pre-wrap" }}>{m.text}</div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            <div style={overlayStyles.inputRow}>
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={onKeyDown}
                placeholder="Type something and hit send!"
                style={overlayStyles.textarea}
                rows={2}
              />
              <button onClick={() => sendMessage(input)} style={overlayStyles.sendBtn} aria-label="Send message">Send</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// overlayStyles (same look as before, zIndex a bit higher to pop above hero)
const overlayStyles = {
  container: {
    position: "absolute",
    left: "50%",
    top: "50%",
    transform: "translate(-50%,-50%)",
    width: 360,
    maxWidth: "92%",
    zIndex: 60,
    background: "linear-gradient(180deg, rgba(6,10,28,0.98), rgba(4,6,20,0.98))",
    borderRadius: 12,
    boxShadow: "0 20px 60px rgba(2,8,30,0.7)",
    border: "1px solid rgba(120,120,255,0.08)",
    overflow: "hidden",
    color: "#dfeeff",
    paddingBottom: 12,
    display: "flex",
    flexDirection: "column",
    fontFamily: "Inter, sans-serif",
  },
  close: { position: "absolute", right: 8, top: 8, background: "transparent", color: "#dfeeff", border: "none", fontSize: 18, cursor: "pointer" },
  header: { padding: "12px 16px", borderBottom: "1px solid rgba(255,255,255,0.03)", fontWeight: 700, fontSize: 15 },
  body: { padding: "10px 12px", display: "flex", flexDirection: "column", gap: 8 },
  msgList: { maxHeight: 260, overflowY: "auto", display: "flex", flexDirection: "column", gap: 8, paddingRight: 6 },
  msgBot: { alignSelf: "flex-start", background: "linear-gradient(90deg, rgba(80,100,255,0.12), rgba(40,20,80,0.06))", padding: 8, borderRadius: 8, maxWidth: "85%", fontSize: 13 },
  msgYou: { alignSelf: "flex-end", background: "linear-gradient(90deg, rgba(80,240,200,0.08), rgba(20,40,80,0.03))", padding: 8, borderRadius: 8, maxWidth: "85%", fontSize: 13 },
  inputRow: { display: "flex", gap: 8, alignItems: "center" },
  textarea: { flex: 1, resize: "none", padding: "8px 10px", borderRadius: 8, border: "1px solid rgba(255,255,255,0.06)", background: "rgba(10,14,30,0.6)", color: "#dfeeff", outline: "none", fontSize: 14 },
  sendBtn: { padding: "8px 12px", background: "linear-gradient(90deg,#5c46ff,#2fefff)", border: "none", color: "#081022", borderRadius: 8, fontWeight: 700, cursor: "pointer" },
};
