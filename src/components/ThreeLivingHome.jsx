import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { useNexa } from '../context/NexaContext';

export default function ThreeLivingHome() {
  const containerRef = useRef(null);
  const { rooms, activeScreen, selectedRoomId } = useNexa();
  const [webglSupported, setWebglSupported] = useState(true);

  // References to keep track of scene items across renders
  const sceneRef = useRef(null);
  const roomLightsRef = useRef({});
  const cameraRef = useRef(null);
  const targetCamPosRef = useRef(new THREE.Vector3(18, 14, 22));
  const targetLookAtRef = useRef(new THREE.Vector3(0, 3, 0));
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  // Update camera targets whenever activeScreen or selectedRoomId changes
  useEffect(() => {
    if (!cameraRef.current) return;

    if (activeScreen === 'smarthome') {
      if (selectedRoomId === 'master-bedroom') {
        targetCamPosRef.current.set(-6, 9, 14);
        targetLookAtRef.current.set(-4, 6, 0);
      } else if (selectedRoomId === 'kitchen') {
        targetCamPosRef.current.set(10, 6, 14);
        targetLookAtRef.current.set(4, 2, 0);
      } else if (selectedRoomId === 'study') {
        targetCamPosRef.current.set(8, 9, 14);
        targetLookAtRef.current.set(4, 6, 0);
      } else if (selectedRoomId === 'entrance') {
        targetCamPosRef.current.set(16, 5, 16);
        targetLookAtRef.current.set(7, 1, 0);
      } else {
        // Living room
        targetCamPosRef.current.set(-6, 6, 14);
        targetLookAtRef.current.set(-4, 2, 0);
      }
    } else if (activeScreen === 'vehicles') {
      targetCamPosRef.current.set(16, 5, 15);
      targetLookAtRef.current.set(6, 1, 1);
    } else if (activeScreen === 'security') {
      targetCamPosRef.current.set(22, 18, 22);
      targetLookAtRef.current.set(0, 2, 0);
    } else if (activeScreen === 'assistant') {
      targetCamPosRef.current.set(14, 15, 20);
      targetLookAtRef.current.set(0, 4, 0);
    } else {
      // Default / Overview / Bills / Health / Briefing
      targetCamPosRef.current.set(18, 14, 22);
      targetLookAtRef.current.set(0, 3, 0);
    }
  }, [activeScreen, selectedRoomId]);

  // Update room lights when rooms state changes
  useEffect(() => {
    rooms.forEach(room => {
      const light = roomLightsRef.current[room.id];
      if (light) {
        const targetIntensity = room.isLit ? 1.8 : 0.08;
        light.intensity = targetIntensity;
      }
    });
  }, [rooms]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Check WebGL availability
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (!gl) {
        setWebglSupported(false);
        return;
      }
    } catch (e) {
      setWebglSupported(false);
      return;
    }

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.fog = new THREE.FogExp2(0x03060b, 0.025);

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 1000);
    camera.position.set(18, 14, 22);
    camera.lookAt(0, 3, 0);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    container.appendChild(renderer.domElement);

    // 2. Ambient & Atmospheric Lighting
    const ambientLight = new THREE.AmbientLight(0x0e223d, 1.2);
    scene.add(ambientLight);

    const moonLight = new THREE.DirectionalLight(0x54e7ff, 0.7);
    moonLight.position.set(25, 35, 20);
    scene.add(moonLight);

    const rimLight = new THREE.DirectionalLight(0x9a86ff, 0.5);
    rimLight.position.set(-20, 20, -15);
    scene.add(rimLight);

    // 3. Foundation & Holographic Grid
    const gridHelper = new THREE.GridHelper(40, 40, 0x54e7ff, 0x102847);
    gridHelper.position.y = -0.05;
    scene.add(gridHelper);

    // Base podium
    const podiumGeo = new THREE.BoxGeometry(26, 0.6, 18);
    const podiumMat = new THREE.MeshStandardMaterial({
      color: 0x071224,
      roughness: 0.8,
      metalness: 0.3
    });
    const podium = new THREE.Mesh(podiumGeo, podiumMat);
    podium.position.set(0, -0.3, 0);
    scene.add(podium);

    // 4. Architectural Cutaway Modern Villa
    // Materials
    const concreteMat = new THREE.MeshStandardMaterial({
      color: 0x0c1b33,
      roughness: 0.7,
      metalness: 0.2
    });

    const glassMat = new THREE.MeshPhysicalMaterial({
      color: 0x54e7ff,
      transparent: true,
      opacity: 0.22,
      roughness: 0.1,
      metalness: 0.9,
      transmission: 0.7,
      ior: 1.5
    });

    const frameMat = new THREE.MeshStandardMaterial({
      color: 0x18375e,
      roughness: 0.4,
      metalness: 0.8
    });

    const houseGroup = new THREE.Group();

    // Slabs (Ground Floor, First Floor, Roof Cantilever)
    const groundSlab = new THREE.Mesh(new THREE.BoxGeometry(22, 0.3, 14), concreteMat);
    groundSlab.position.set(0, 0.15, 0);
    houseGroup.add(groundSlab);

    const midSlab = new THREE.Mesh(new THREE.BoxGeometry(21, 0.3, 13), concreteMat);
    midSlab.position.set(0, 3.8, 0);
    houseGroup.add(midSlab);

    const roofSlab = new THREE.Mesh(new THREE.BoxGeometry(23, 0.3, 15), concreteMat);
    roofSlab.position.set(0, 7.5, 0);
    houseGroup.add(roofSlab);

    // Vertical structural columns & rear architectural spine
    const spineWall = new THREE.Mesh(new THREE.BoxGeometry(21.6, 7.4, 0.4), concreteMat);
    spineWall.position.set(0, 3.8, -6.5);
    houseGroup.add(spineWall);

    // Interior dividing wall (Center spine)
    const dividerWall = new THREE.Mesh(new THREE.BoxGeometry(0.3, 7.2, 13), concreteMat);
    dividerWall.position.set(0, 3.8, 0);
    houseGroup.add(dividerWall);

    // Large architectural Glass facade panes (cutaway view: front open, sides glass)
    const leftGlass = new THREE.Mesh(new THREE.BoxGeometry(0.1, 7.2, 12.8), glassMat);
    leftGlass.position.set(-10.5, 3.8, 0);
    houseGroup.add(leftGlass);

    const rightGlass = new THREE.Mesh(new THREE.BoxGeometry(0.1, 7.2, 12.8), glassMat);
    rightGlass.position.set(10.5, 3.8, 0);
    houseGroup.add(rightGlass);

    // Architectural pergola louvers on roof
    for (let i = -7; i <= 7; i += 1.4) {
      const slat = new THREE.Mesh(new THREE.BoxGeometry(0.15, 0.4, 6), frameMat);
      slat.position.set(i, 7.8, 4.2);
      houseGroup.add(slat);
    }

    // --- ROOM DETAILS & LIGHTS ---

    // 1. Living Room (Ground Floor Left: x: -5, y: 1.8, z: 0)
    const sofa = new THREE.Mesh(new THREE.BoxGeometry(4.2, 0.7, 2), frameMat);
    sofa.position.set(-5, 0.6, -1);
    houseGroup.add(sofa);

    const tvConsole = new THREE.Mesh(new THREE.BoxGeometry(4.6, 0.5, 0.6), frameMat);
    tvConsole.position.set(-5, 0.5, 3.5);
    houseGroup.add(tvConsole);

    const livingLight = new THREE.PointLight(0x54e7ff, 1.8, 12, 1.2);
    livingLight.position.set(-5, 3.2, 0);
    houseGroup.add(livingLight);
    roomLightsRef.current['living-room'] = livingLight;

    // Glowing pendant fixture
    const livingFixture = new THREE.Mesh(
      new THREE.CylinderGeometry(0.6, 0.6, 0.15, 16),
      new THREE.MeshBasicMaterial({ color: 0x54e7ff })
    );
    livingFixture.position.set(-5, 3.6, 0);
    houseGroup.add(livingFixture);

    // 2. Kitchen & Dining (Ground Floor Right: x: 5, y: 1.8, z: 0)
    const island = new THREE.Mesh(new THREE.BoxGeometry(3.8, 1.1, 1.8), frameMat);
    island.position.set(5, 0.8, -0.5);
    houseGroup.add(island);

    const diningTable = new THREE.Mesh(new THREE.BoxGeometry(4.2, 0.8, 2.2), frameMat);
    diningTable.position.set(5, 0.7, 3);
    houseGroup.add(diningTable);

    const kitchenLight = new THREE.PointLight(0xffb547, 1.6, 12, 1.2);
    kitchenLight.position.set(5, 3.2, 0);
    houseGroup.add(kitchenLight);
    roomLightsRef.current['kitchen'] = kitchenLight;

    const kitchenFixture = new THREE.Mesh(
      new THREE.CylinderGeometry(0.5, 0.5, 0.15, 16),
      new THREE.MeshBasicMaterial({ color: 0xffb547 })
    );
    kitchenFixture.position.set(5, 3.6, 0);
    houseGroup.add(kitchenFixture);

    // 3. Master Bedroom (Upper Floor Left: x: -5, y: 5.5, z: 0)
    const bed = new THREE.Mesh(new THREE.BoxGeometry(3.6, 0.7, 4.2), frameMat);
    bed.position.set(-5, 4.4, -1.5);
    houseGroup.add(bed);

    const bedroomLight = new THREE.PointLight(0x9a86ff, 0.3, 11, 1.2);
    bedroomLight.position.set(-5, 6.9, 0);
    houseGroup.add(bedroomLight);
    roomLightsRef.current['master-bedroom'] = bedroomLight;

    const bedroomFixture = new THREE.Mesh(
      new THREE.CylinderGeometry(0.5, 0.5, 0.15, 16),
      new THREE.MeshBasicMaterial({ color: 0x9a86ff })
    );
    bedroomFixture.position.set(-5, 7.3, 0);
    houseGroup.add(bedroomFixture);

    // 4. Study & Office (Upper Floor Right: x: 5, y: 5.5, z: 0)
    const desk = new THREE.Mesh(new THREE.BoxGeometry(3.8, 0.8, 1.6), frameMat);
    desk.position.set(5, 4.5, -2);
    houseGroup.add(desk);

    const studyLight = new THREE.PointLight(0x00e5a3, 1.6, 11, 1.2);
    studyLight.position.set(5, 6.9, 0);
    houseGroup.add(studyLight);
    roomLightsRef.current['study'] = studyLight;

    const studyFixture = new THREE.Mesh(
      new THREE.CylinderGeometry(0.5, 0.5, 0.15, 16),
      new THREE.MeshBasicMaterial({ color: 0x00e5a3 })
    );
    studyFixture.position.set(5, 7.3, 0);
    houseGroup.add(studyFixture);

    // 5. Entrance / Garage & EV Charging Dock (Ground Right Perimeter)
    const garageFloor = new THREE.Mesh(new THREE.BoxGeometry(8, 0.25, 10), concreteMat);
    garageFloor.position.set(15, 0.12, 0);
    houseGroup.add(garageFloor);

    // EV Car silhouette
    const evBody = new THREE.Mesh(
      new THREE.BoxGeometry(3.2, 1.2, 5.4),
      new THREE.MeshStandardMaterial({ color: 0x0a2244, roughness: 0.3, metalness: 0.85 })
    );
    evBody.position.set(15, 0.9, 0);
    houseGroup.add(evBody);

    // EV glowing headlight strip
    const evHeadlight = new THREE.Mesh(
      new THREE.BoxGeometry(2.8, 0.1, 0.15),
      new THREE.MeshBasicMaterial({ color: 0x54e7ff })
    );
    evHeadlight.position.set(15, 0.8, 2.72);
    houseGroup.add(evHeadlight);

    // EV Charger pedestal
    const chargerPedestal = new THREE.Mesh(
      new THREE.BoxGeometry(0.4, 1.8, 0.4),
      new THREE.MeshStandardMaterial({ color: 0x18375e, metalness: 0.8 })
    );
    chargerPedestal.position.set(12, 1.0, -3.2);
    houseGroup.add(chargerPedestal);

    const chargerGlow = new THREE.Mesh(
      new THREE.SphereGeometry(0.12, 16, 16),
      new THREE.MeshBasicMaterial({ color: 0x00e5a3 })
    );
    chargerGlow.position.set(12, 1.8, -3.2);
    houseGroup.add(chargerGlow);

    const entranceLight = new THREE.PointLight(0x54e7ff, 1.2, 14, 1.2);
    entranceLight.position.set(13, 3.5, 2);
    houseGroup.add(entranceLight);
    roomLightsRef.current['entrance'] = entranceLight;

    scene.add(houseGroup);

    // 5. Floating Digital Ecosystem Particles
    const particleCount = 180;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      particlePositions[i * 3] = (Math.random() - 0.5) * 44;
      particlePositions[i * 3 + 1] = Math.random() * 22;
      particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 36;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0x54e7ff,
      size: 0.28,
      transparent: true,
      opacity: 0.55,
      blending: THREE.AdditiveBlending
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // 6. Orbital Holographic Rings above House
    const ringGeo1 = new THREE.TorusGeometry(8, 0.04, 8, 80);
    const ringMat1 = new THREE.MeshBasicMaterial({ color: 0x54e7ff, transparent: true, opacity: 0.35 });
    const ring1 = new THREE.Mesh(ringGeo1, ringMat1);
    ring1.rotation.x = Math.PI / 2.2;
    ring1.position.set(0, 9.5, 0);
    scene.add(ring1);

    const ringGeo2 = new THREE.TorusGeometry(12, 0.03, 8, 80);
    const ringMat2 = new THREE.MeshBasicMaterial({ color: 0x9a86ff, transparent: true, opacity: 0.22 });
    const ring2 = new THREE.Mesh(ringGeo2, ringMat2);
    ring2.rotation.x = Math.PI / 2.5;
    ring2.position.set(0, 9.8, 0);
    scene.add(ring2);

    // 7. Mouse Parallax Listeners
    const handleMouseMove = (e) => {
      mouseRef.current.targetX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseRef.current.targetY = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Resize handler
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth || window.innerWidth;
      const h = container.clientHeight || window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    // 8. Animation Loop
    let animId;
    let clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth mouse lerp
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.05;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.05;

      // Camera lerp to target
      camera.position.x += (targetCamPosRef.current.x + mouseRef.current.x * 1.5 - camera.position.x) * 0.04;
      camera.position.y += (targetCamPosRef.current.y - mouseRef.current.y * 1.0 - camera.position.y) * 0.04;
      camera.position.z += (targetCamPosRef.current.z - camera.position.z) * 0.04;
      camera.lookAt(targetLookAtRef.current);

      // Rotate rings gently
      ring1.rotation.z = elapsedTime * 0.08;
      ring2.rotation.z = -elapsedTime * 0.05;

      // Float particles
      const positions = particleGeo.attributes.position.array;
      for (let i = 1; i < particleCount * 3; i += 3) {
        positions[i] += 0.012;
        if (positions[i] > 22) positions[i] = 0;
      }
      particleGeo.attributes.position.needsUpdate = true;

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      particleGeo.dispose();
      particleMat.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
        overflow: 'hidden',
        background: 'radial-gradient(ellipse at 50% 30%, #0d223f 0%, #07101f 50%, #03060b 100%)'
      }}
    >
      {/* Darkening Scrim Layer to ensure 100% text readability across all modules */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: activeScreen === 'smarthome'
            ? 'linear-gradient(to right, rgba(3, 6, 11, 0.85) 0%, rgba(3, 6, 11, 0.55) 45%, rgba(3, 6, 11, 0.75) 100%)'
            : activeScreen === 'overview'
            ? 'linear-gradient(135deg, rgba(3, 6, 11, 0.82) 0%, rgba(7, 16, 31, 0.70) 50%, rgba(3, 6, 11, 0.88) 100%)'
            : 'rgba(3, 6, 11, 0.84)',
          backdropFilter: 'blur(3px)',
          WebkitBackdropFilter: 'blur(3px)',
          transition: 'all 0.4s ease'
        }}
      />

      {/* Fallback architectural cutaway SVG if WebGL is disabled */}
      {!webglSupported && (
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <svg width="800" height="500" viewBox="0 0 800 500" fill="none" opacity="0.4">
            <rect x="150" y="80" width="500" height="340" stroke="#54E7FF" strokeWidth="2" strokeDasharray="6 6"/>
            <line x1="150" y1="240" x2="650" y2="240" stroke="#54E7FF" strokeWidth="2"/>
            <line x1="400" y1="80" x2="400" y2="420" stroke="#54E7FF" strokeWidth="2"/>
            <circle cx="275" cy="160" r="12" fill={rooms[1]?.isLit ? "#9A86FF" : "#18375E"}/>
            <text x="250" y="200" fill="#F3F7FC" fontSize="14" fontFamily="sans-serif">Master Bedroom</text>
            <circle cx="525" cy="160" r="12" fill={rooms[3]?.isLit ? "#00E5A3" : "#18375E"}/>
            <text x="500" y="200" fill="#F3F7FC" fontSize="14" fontFamily="sans-serif">Study & Office</text>
            <circle cx="275" cy="320" r="12" fill={rooms[0]?.isLit ? "#54E7FF" : "#18375E"}/>
            <text x="250" y="360" fill="#F3F7FC" fontSize="14" fontFamily="sans-serif">Living Room</text>
            <circle cx="525" cy="320" r="12" fill={rooms[2]?.isLit ? "#FFB547" : "#18375E"}/>
            <text x="500" y="360" fill="#F3F7FC" fontSize="14" fontFamily="sans-serif">Kitchen & Dining</text>
          </svg>
        </div>
      )}
    </div>
  );
}
