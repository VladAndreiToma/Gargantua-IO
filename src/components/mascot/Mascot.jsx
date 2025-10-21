// BlackHoleMascotWithChat.jsx
import React, { useRef, useEffect, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

/**
 * Mascot + chat: orb vizual + overlay chat funcțional (send, mock reply, autoscroll)
 */
export default function Mascot({ height = 450 }) {
  const mountRef = useRef(null);
  const [chatOpen, setChatOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    { from: "gargantua", text: "Hi! Lets discover things✨" },
  ]);

  // păstrăm id-urile timeout-urilor pentru cleanup
  const replyTimeouts = useRef([]);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    // dimensiuni
    const W = mount.clientWidth || 600;
    const H = mount.clientHeight || height;

    // scena / camera / renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, W / H, 0.1, 100);
    camera.position.set(0, 0.6, 4);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(W, H);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    // controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enablePan = false;
    controls.enableZoom = false;
    controls.enableDamping = true;
    controls.autoRotate = false;

    // lumini
    const hemi = new THREE.HemisphereLight(0xcfe6ff, 0x404060, 0.6);
    const key = new THREE.DirectionalLight(0xffffff, 0.6);
    key.position.set(4, 6, 4);
    const subtleBlue = new THREE.PointLight(0x6b49ff, 0.5, 10);
    subtleBlue.position.set(-2, 1.5, 3.5);
    scene.add(hemi, key, subtleBlue);

    // core
    const coreGeo = new THREE.SphereGeometry(0.9, 32, 32);
    const coreMat = new THREE.MeshStandardMaterial({
      color: 0x000000,
      roughness: 0.7,
      metalness: 0.05,
      transparent: true,
      opacity: 0.98,
    });
    const core = new THREE.Mesh(coreGeo, coreMat);
    scene.add(core);

    // rim, glow
    const rimGeo = new THREE.SphereGeometry(1.06, 32, 32);
    const rimMat = new THREE.MeshBasicMaterial({
      color: 0x5b3bff,
      transparent: true,
      opacity: 0.12,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const rim = new THREE.Mesh(rimGeo, rimMat);
    scene.add(rim);

    const glowGeom = new THREE.SphereGeometry(1.5, 32, 32);
    const glowMat = new THREE.MeshBasicMaterial({
      color: 0x6b49ff,
      transparent: true,
      opacity: 0.12,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const glowMesh = new THREE.Mesh(glowGeom, glowMat);
    scene.add(glowMesh);

    // shell particles
    const PARTICLE_COUNT = 900;
    const positions = new Float32Array(PARTICLE_COUNT * 3);
    const seeds = new Float32Array(PARTICLE_COUNT);
    const radii = new Float32Array(PARTICLE_COUNT);

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const u = Math.random();
      const theta = Math.acos(2 * u - 1);
      const phi = Math.random() * Math.PI * 2;
      const baseR = 1.25 + Math.random() * 0.7;
      const x = baseR * Math.sin(theta) * Math.cos(phi);
      const y = baseR * Math.sin(theta) * Math.sin(phi);
      const z = baseR * Math.cos(theta);
      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;
      seeds[i] = Math.random() * 10.0;
      radii[i] = 0.7 + Math.random() * 1.3;
    }

    const shellGeo = new THREE.BufferGeometry();
    shellGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    shellGeo.setAttribute("aSeed", new THREE.BufferAttribute(seeds, 1));
    shellGeo.setAttribute("aRad", new THREE.BufferAttribute(radii, 1));

    const shellMat = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      uniforms: {
        uTime: { value: 0 },
        uScale: { value: 1.0 },
        uColorA: { value: new THREE.Color(0x4a3bff) },
        uColorB: { value: new THREE.Color(0x8fb8ff) },
        uOpacity: { value: 0.95 },
        uPixelRatio: { value: new THREE.Vector2(Math.min(window.devicePixelRatio, 2), 0) },
      },
      vertexShader: `
        attribute float aSeed;
        attribute float aRad;
        uniform float uTime;
        uniform float uScale;
        uniform vec2 uPixelRatio;
        varying float vSeed;
        varying float vRad;
        varying vec3 vPos;
        void main(){
          vSeed = aSeed;
          vRad = aRad;
          vPos = position;
          vec3 dir = normalize(position);
          float b = 0.10 * sin(uTime * 1.6 + aSeed * 2.3) + 0.04 * cos(uTime * 2.2 + aSeed * 1.9);
          float swirl = 0.09 * sin(uTime * 0.7 + length(position.xy) * 4.2 + aSeed * 1.1);
          vec3 newPos = position + dir * (b + swirl) * uScale;
          vec4 mvPosition = modelViewMatrix * vec4(newPos, 1.0);
          gl_Position = projectionMatrix * mvPosition;
          gl_PointSize = (2.0 + aRad * 1.4) * uPixelRatio.x;
          gl_PointSize *= clamp(1.0 / (-mvPosition.z * 0.18), 0.5, 3.0);
        }
      `,
      fragmentShader: `
        uniform float uTime;
        uniform vec3 uColorA;
        uniform vec3 uColorB;
        uniform float uOpacity;
        varying float vSeed;
        varying float vRad;
        varying vec3 vPos;
        void main(){
          vec2 c = gl_PointCoord - 0.5;
          float dist = length(c);
          float alpha = smoothstep(0.6, 0.0, dist);
          float m = 0.5 + 0.5 * sin(uTime * 1.4 + vSeed);
          vec3 col = mix(uColorA, uColorB, m) * (0.7 + 0.6 * (1.0 - dist));
          gl_FragColor = vec4(col, alpha * uOpacity * 0.95);
          if (gl_FragColor.a < 0.01) discard;
        }
      `,
    });

    const shellPoints = new THREE.Points(shellGeo, shellMat);
    scene.add(shellPoints);

    // veil
    const veilGeo = new THREE.SphereGeometry(1.18, 64, 64);
    const vertCount = veilGeo.attributes.position.count;
    const vSeeds = new Float32Array(vertCount);
    for (let i = 0; i < vertCount; i++) vSeeds[i] = Math.random() * 6.0;
    veilGeo.setAttribute("vSeed", new THREE.BufferAttribute(vSeeds, 1));

    const veilMat = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uOpacity: { value: 0.22 },
        uColor: { value: new THREE.Color(0x2a2f6f) },
      },
      transparent: true,
      depthWrite: false,
      side: THREE.DoubleSide,
      vertexShader: `
        attribute float vSeed;
        uniform float uTime;
        varying float vSeedV;
        void main(){
          vSeedV = vSeed;
          vec3 n = normal;
          float d = 0.08 * sin(uTime * 1.9 + vSeed * 2.1 + position.y * 4.2);
          vec3 pos = position + n * d;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
        }
      `,
      fragmentShader: `
        uniform float uOpacity;
        uniform vec3 uColor;
        varying float vSeedV;
        void main(){
          float band = 0.5 + 0.5 * sin(vSeedV * 4.0);
          vec3 col = mix(uColor, vec3(0.5,0.45,0.95), 0.25) * (0.7 + 0.3 * band);
          gl_FragColor = vec4(col, uOpacity);
        }
      `,
    });

    const veil = new THREE.Mesh(veilGeo, veilMat);
    scene.add(veil);

    // interaction
    const ray = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    let isHover = false;

    function onPointerMove(e) {
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      ray.setFromCamera(mouse, camera);
      isHover = ray.intersectObject(core).length > 0;
      renderer.domElement.style.cursor = isHover ? "pointer" : "auto";
    }

    function onPointerDown(e) {
      if (isHover) setChatOpen(true);
    }

    renderer.domElement.addEventListener("pointermove", onPointerMove);
    renderer.domElement.addEventListener("pointerdown", onPointerDown);

    // animație
    const clock = new THREE.Clock();
    let rafId = null;
    function animate() {
      rafId = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      shellMat.uniforms.uTime.value = t;
      shellMat.uniforms.uScale.value = 1.0 + 0.08 * Math.sin(t * 1.6);
      veilMat.uniforms.uTime.value = t;

      const pulse = 1.0 + 0.015 * Math.sin(t * 2.5);
      core.scale.set(pulse, pulse, pulse);
      rim.scale.set(pulse * 1.02, pulse * 1.02, pulse * 1.02);
      glowMesh.scale.set(1.0 + 0.03 * Math.sin(t * 1.8), 1.0 + 0.03 * Math.sin(t * 1.8), 1.0 + 0.03 * Math.sin(t * 1.8));

      controls.update();
      renderer.render(scene, camera);
    }
    animate();

    // resize
    function onResize() {
      const WW = mount.clientWidth;
      const HH = mount.clientHeight;
      camera.aspect = WW / HH;
      camera.updateProjectionMatrix();
      renderer.setSize(WW, HH);
    }
    window.addEventListener("resize", onResize);

    // cleanup
    return () => {
      cancelAnimationFrame(rafId);
      renderer.domElement.removeEventListener("pointermove", onPointerMove);
      renderer.domElement.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("resize", onResize);

      // clear any reply timeouts
      replyTimeouts.current.forEach((id) => clearTimeout(id));
      replyTimeouts.current = [];

      // dispose three objects
      shellGeo.dispose();
      shellMat.dispose();
      veilGeo.dispose();
      veilMat.dispose();
      coreGeo && coreGeo.dispose && coreGeo.dispose();
      coreMat && coreMat.dispose && coreMat.dispose();
      rimGeo && rimGeo.dispose && rimGeo.dispose();
      rimMat && rimMat.dispose && rimMat.dispose();
      glowGeom && glowGeom.dispose && glowGeom.dispose();
      glowMat && glowMat.dispose && glowMat.dispose();

      if (renderer && renderer.domElement && mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [height]);

  // ========================
  // Chat logic (front-end only, mock replies)
  // ========================
  const messagesEndRef = useRef(null);

  useEffect(() => {
    // autoscroll la fiecare mesaj nou
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  }, [messages, chatOpen]);

  const sendMessage = (text) => {
    if (!text || !text.trim()) return;
    const t = text.trim();
    setMessages((m) => [...m, { from: "you", text: t }]);
    setInput("");

    // simulăm un răspuns AI (random delay 400-900ms)
    const delay = 400 + Math.random() * 900;
    const id = setTimeout(() => {
      // exemplu simplu: răspuns bazat pe text
      const reply = generateMockReply(t);
      setMessages((m) => [...m, { from: "gargantua", text: reply }]);
    }, delay);
    replyTimeouts.current.push(id);
  };

  // generăm un reply mock — în realitate chemi backendul aici
  function generateMockReply(userText) {
    // răspunsuri simple, adaptabile
    const l = userText.toLowerCase();
    if (l.includes("hi") || l.includes("salut") || l.includes("hello")) {
      return "Salut! Cu ce te pot ajuta azi?";
    }
    if (l.includes("black") || l.includes("negru") || l.includes("gaură")) {
      return "Misterios... gaura neagră îți zâmbește dincolo de orizont.";
    }
    if (l.includes("cum") || l.includes("ce") || l.includes("explică")) {
      return "Pot explica fizica vizuală sau putem face o simulare — ce preferi?";
    }
    // default
    const variants = [
      "Interesant — spune-mi mai mult.",
      "Hmmm... asta sună cool 😄",
      "Pot să-ți arăt un exemplu vizual pentru asta.",
      "Aha — deci vrei să explorăm mai adânc.",
    ];
    return variants[Math.floor(Math.random() * variants.length)];
  }

  // handler pentru Enter în input
  const onKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  // ========================
  // UI render
  // ========================
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
          <button
            style={overlayStyles.close}
            onClick={() => setChatOpen(false)}
            aria-label="Close chat"
          >
            ✕
          </button>

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
              <button
                onClick={() => sendMessage(input)}
                style={overlayStyles.sendBtn}
                aria-label="Send message"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// overlay styles extinse
const overlayStyles = {
  container: {
    position: "absolute",
    left: "50%",
    top: "50%",
    transform: "translate(-50%,-50%)",
    width: 360,
    maxWidth: "92%",
    zIndex: 1,
    background: "linear-gradient(180deg, rgba(6,10,28,0.98), rgba(4,6,20,0.98))",
    borderRadius: 12,
    boxShadow: "0 20px 60px rgba(2,8,30,0.7)",
    border: "1px solid rgba(120,120,255,0.08)",
    overflow: "hidden",
    color: "#dfeeff",
    paddingBottom: 12,
    display: "flex",
    flexDirection: "column",
    fontFamily:'Inter',
  },
  close: {
    position: "absolute",
    right: 8,
    top: 8,
    background: "transparent",
    color: "#dfeeff",
    border: "none",
    fontSize: 18,
    cursor: "pointer",
  },
  header: {
    padding: "12px 16px",
    borderBottom: "1px solid rgba(255,255,255,0.03)",
    fontWeight: 700,
    fontSize: 15,
  },
  body: {
    padding: "10px 12px",
    display: "flex",
    flexDirection: "column",
    gap: 8,
  },
  msgList: {
    maxHeight: 260,
    overflowY: "auto",
    display: "flex",
    flexDirection: "column",
    gap: 8,
    paddingRight: 6,
  },
  msgBot: {
    alignSelf: "flex-start",
    background: "linear-gradient(90deg, rgba(80,100,255,0.12), rgba(40,20,80,0.06))",
    padding: 8,
    borderRadius: 8,
    maxWidth: "85%",
    fontSize: 13,
  },
  msgYou: {
    alignSelf: "flex-end",
    background: "linear-gradient(90deg, rgba(80,240,200,0.08), rgba(20,40,80,0.03))",
    padding: 8,
    borderRadius: 8,
    maxWidth: "85%",
    fontSize: 13,
  },
  inputRow: {
    display: "flex",
    gap: 8,
    alignItems: "center",
  },
  textarea: {
    flex: 1,
    resize: "none",
    padding: "8px 10px",
    borderRadius: 8,
    border: "1px solid rgba(255,255,255,0.06)",
    background: "rgba(10,14,30,0.6)",
    color: "#dfeeff",
    outline: "none",
    fontSize: 14,
  },
  sendBtn: {
    padding: "8px 12px",
    background: "linear-gradient(90deg,#5c46ff,#2fefff)",
    border: "none",
    color: "#081022",
    borderRadius: 8,
    fontWeight: 700,
    cursor: "pointer",
  },
};
