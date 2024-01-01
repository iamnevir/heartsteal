"use client";
import * as THREE from "three";
import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { brainData } from "@/public/data/brain";
import { BrainParticles } from "./brain-particles";
import Tubes from "./brain-tubes";

export default function BrainCanvas() {
  const PATHS = brainData.economics[0].paths;
  let brainCurves: any[] = [];
  PATHS.forEach((path) => {
    let points = [];
    for (let i = 0; i < path.length; i += 3) {
      points.push(new THREE.Vector3(path[i], path[i + 1], path[i + 2]));
    }
    let tempcurve = new THREE.CatmullRomCurve3(points);
    brainCurves.push(tempcurve);
  });
  return (
    <Canvas camera={{ position: [0, 0, 0.25], near: 0.001, far: 5 }}>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <Tubes allthecurve={brainCurves} />
      <BrainParticles allthecurve={brainCurves} />
      <OrbitControls
        enableZoom={false}
        autoRotate
        enablePan={false}
        enableDamping={false}
        autoRotateSpeed={0.3}
      />
    </Canvas>
  );
}
