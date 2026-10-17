import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Environment, Lightformer, useTexture } from '@react-three/drei';
import { BallCollider, Physics, RigidBody } from '@react-three/rapier';
import type { RapierRigidBody } from '@react-three/rapier';
import { Suspense, useEffect, useMemo, useRef, useState } from 'react';
import type { MutableRefObject } from 'react';
import * as THREE from 'three';
import type { SimpleIcon } from 'simple-icons';

export interface Skill {
  name: string;
  icon: SimpleIcon;
}

// Brand colours that are too dark to read inside the glass fall back to the site's light text colour.
function logoColor(hex: string) {
  const [r, g, b] = [0, 2, 4].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255);
  const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;
  return luminance < 0.3 ? '#D7E2EA' : `#${hex}`;
}

function iconDataUrl(icon: SimpleIcon) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 24 24"><path fill="${logoColor(icon.hex)}" d="${icon.path}"/></svg>`;
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}

// Deterministic spread so the balls start from the same scattered layout every time.
function spawnPoint(i: number): [number, number, number] {
  const a = i * 2.399963; // golden angle
  const d = 3 + (i % 5) * 1.6;
  return [Math.cos(a) * d * 1.4, Math.sin(a) * d, ((i % 3) - 1) * 2];
}

const pull = new THREE.Vector3();
const pullAxes = new THREE.Vector3();
const dragTarget = new THREE.Vector3();

interface BallProps {
  url: string;
  index: number;
  size: number;
  hovered: boolean;
  onHover: (index: number | null) => void;
  dragging: MutableRefObject<number | null>;
}

function Ball({ url, index, size, hovered, onHover, dragging }: BallProps) {
  const body = useRef<RapierRigidBody>(null);
  const visual = useRef<THREE.Group>(null);
  const texture = useTexture(url);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 8;

  useEffect(() => {
    const release = () => {
      if (dragging.current === index) dragging.current = null;
    };
    window.addEventListener('pointerup', release);
    window.addEventListener('pointercancel', release);
    return () => {
      window.removeEventListener('pointerup', release);
      window.removeEventListener('pointercancel', release);
    };
  }, [dragging, index]);

  useFrame(({ pointer, viewport }, delta) => {
    const dt = Math.min(delta, 0.1);
    const rb = body.current;
    if (rb) {
      const p = rb.translation();
      if (dragging.current === index) {
        // Chase the cursor through velocity rather than teleporting, so the ball still collides
        // with its neighbours and keeps its momentum when released (a throw).
        dragTarget.set((pointer.x * viewport.width) / 2, (pointer.y * viewport.height) / 2, 0);
        rb.setLinvel({ x: (dragTarget.x - p.x) * 14, y: (dragTarget.y - p.y) * 14, z: -p.z * 14 }, true);
      } else {
        // Pull every ball toward the centre, weighted by aspect ratio so the cluster fills the screen shape.
        const aspect = viewport.aspect;
        pullAxes.set((-90 / aspect) * dt * size, -90 * aspect * dt * size, -110 * dt * size);
        pull.set(p.x, p.y, p.z).normalize().multiply(pullAxes);
        rb.applyImpulse(pull, true);
      }
    }
    if (visual.current) {
      const target = dragging.current === index ? 1.18 : hovered ? 1.1 : 1;
      const s = THREE.MathUtils.damp(visual.current.scale.x, target, 10, dt);
      visual.current.scale.setScalar(s);
    }
  });

  return (
    <RigidBody
      ref={body}
      position={spawnPoint(index)}
      colliders={false}
      linearDamping={3.5}
      angularDamping={1}
      friction={0.1}
      restitution={0.4}
      lockRotations
    >
      <BallCollider args={[size]} />
      <group ref={visual}>
        <mesh
          scale={size}
          onPointerOver={(e) => {
            e.stopPropagation();
            onHover(index);
          }}
          onPointerOut={() => onHover(null)}
          onPointerDown={(e) => {
            e.stopPropagation();
            dragging.current = index;
            onHover(index);
          }}
        >
          <sphereGeometry args={[1, 48, 48]} />
          <meshPhysicalMaterial
            transmission={1}
            thickness={0.8}
            roughness={0.02}
            ior={1.25}
            clearcoat={1}
            clearcoatRoughness={0}
            attenuationColor="#B98CFF"
            attenuationDistance={4}
            specularIntensity={1}
            envMapIntensity={2.2}
            color="#F2EEFF"
          />
        </mesh>
        {/* The logo floats inside the glass and is seen through the refraction. */}
        <mesh scale={size * 0.95}>
          <planeGeometry args={[1, 1]} />
          <meshBasicMaterial map={texture} alphaTest={0.4} toneMapped={false} side={THREE.DoubleSide} />
        </mesh>
      </group>
    </RigidBody>
  );
}

function Pointer({ active, dragging }: { active: MutableRefObject<boolean>; dragging: MutableRefObject<number | null> }) {
  const body = useRef<RapierRigidBody>(null);
  const target = useMemo(() => new THREE.Vector3(), []);

  useFrame(({ pointer, viewport }) => {
    // Park the collider far away when the cursor isn't over the canvas so it doesn't hollow out the cluster.
    // It's also parked while dragging, otherwise it would shove away the ball being held.
    if (active.current && dragging.current === null) target.set((pointer.x * viewport.width) / 2, (pointer.y * viewport.height) / 2, 0);
    else target.set(0, 100, 0);
    body.current?.setNextKinematicTranslation(target);
  });

  return (
    <RigidBody ref={body} type="kinematicPosition" colliders={false} position={[0, 100, 0]}>
      <BallCollider args={[1.6]} />
    </RigidBody>
  );
}

function Rig() {
  const camera = useThree((st) => st.camera);
  const aspect = useThree((st) => st.size.width / st.size.height);
  useEffect(() => {
    camera.position.z = aspect < 1 ? 36 : 21;
  }, [camera, aspect]);
  return null;
}

export default function SkillBalls({ skills }: { skills: Skill[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const pointerActive = useRef(false);
  const dragging = useRef<number | null>(null);
  const [inView, setInView] = useState(false);
  const [hovered, setHovered] = useState<number | null>(null);
  const urls = useMemo(() => skills.map((s) => iconDataUrl(s.icon)), [skills]);
  const sizes = useMemo(() => skills.map((_, i) => 1 + ((i * 37) % 7) * 0.06), [skills]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const visibility = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting));
    visibility.observe(el);
    return () => visibility.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.cursor = hovered === null ? '' : 'grab';
  }, [hovered]);

  return (
    <div className="relative">
      <div
        ref={containerRef}
        className="h-screen min-h-[560px] w-full"
        // Vertical swipes still scroll the page on touch screens; horizontal drags move the balls.
        style={{ touchAction: 'pan-y' }}
        onPointerEnter={() => (pointerActive.current = true)}
        onPointerLeave={() => (pointerActive.current = false)}
      >
        <Canvas
          camera={{ position: [0, 0, 19], fov: 32, near: 1, far: 100 }}
          dpr={[1, 2]}
          frameloop={inView ? 'always' : 'never'}
          gl={{ antialias: true, alpha: true }}
          onPointerMissed={() => setHovered(null)}
        >
          {/* An opaque background keeps the refraction dark instead of sampling a transparent buffer. */}
          <color attach="background" args={['#0C0C0C']} />
          <ambientLight intensity={0.4} />
          <spotLight position={[20, 20, 25]} penumbra={1} angle={0.3} intensity={2} decay={0} />
          <Rig />
          <Suspense fallback={null}>
            <Physics gravity={[0, 0, 0]} paused={!inView}>
              <Pointer active={pointerActive} dragging={dragging} />
              {skills.map((skill, i) => (
                <Ball
                  key={skill.name}
                  url={urls[i]}
                  index={i}
                  size={sizes[i]}
                  hovered={hovered === i}
                  onHover={setHovered}
                  dragging={dragging}
                />
              ))}
            </Physics>
            {/* Built from local light panels, so no HDR file is downloaded. */}
            <Environment resolution={256}>
              <group rotation={[-Math.PI / 3, 0, 1]}>
                <Lightformer form="rect" intensity={4} rotation-x={Math.PI / 2} position={[0, 6, -4]} scale={[14, 4, 1]} />
                <Lightformer form="circle" intensity={5} rotation-x={Math.PI / 2} position={[0, 5, -9]} scale={2} />
                <Lightformer form="circle" intensity={3} rotation-y={Math.PI / 2} position={[-5, 1, -1]} scale={2} />
                <Lightformer form="rect" intensity={2} position={[0, 0, 12]} scale={[20, 6, 1]} />
                <Lightformer form="rect" color="#B600A8" intensity={5} rotation-y={Math.PI / 2} position={[-6, -1, -1]} scale={[12, 1.5, 1]} />
                <Lightformer form="rect" color="#BE4C00" intensity={4} rotation-y={-Math.PI / 2} position={[10, 1, 0]} scale={[12, 1.5, 1]} />
              </group>
            </Environment>
          </Suspense>
        </Canvas>
      </div>
      <p
        className="pointer-events-none absolute bottom-8 left-0 right-0 text-center font-medium uppercase tracking-widest text-[#D7E2EA] transition-opacity duration-200"
        style={{ fontSize: 'clamp(0.9rem, 1.6vw, 1.25rem)', opacity: hovered === null ? 0.4 : 1 }}
      >
        {hovered === null ? 'Grab, throw or push the balls' : skills[hovered].name}
      </p>
    </div>
  );
}
