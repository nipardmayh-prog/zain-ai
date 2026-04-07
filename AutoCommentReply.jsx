// =============================================================
// HeroScene — ZAIN branded 3D canvas (lazy-loaded)
// =============================================================
import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Bloom, EffectComposer } from '@react-three/postprocessing';
import ParticleField from './ParticleField';
import FloatingObjects from './FloatingObjects';

export default function HeroScene() {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.3} />
          <pointLight position={[10, 10, 10]} intensity={0.8} color="#0A84FF" />
          <pointLight position={[-10, -10, -10]} intensity={0.5} color="#00FFB2" />
          <pointLight position={[0, 5, 5]} intensity={0.3} color="#1a8cff" />

          <ParticleField count={600} />
          <FloatingObjects />

          <EffectComposer>
            <Bloom luminanceThreshold={0.2} luminanceSmoothing={0.9} intensity={0.8} radius={0.8} />
          </EffectComposer>
        </Suspense>
      </Canvas>
    </div>
  );
}
