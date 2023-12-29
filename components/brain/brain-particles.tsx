import { randomRange } from "@/lib/utils";
import { shaderMaterial } from "@react-three/drei";
import { extend, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
export const BrainParticles = ({ allthecurve }: any) => {
  let density = 10;
  let numberOfPoints = density * allthecurve.length;
  const myPoints = useRef<any>([]);
  const brainGeo = useRef<any>();
  let positions = useMemo(() => {
    let positions = [];
    for (let i = 0; i < numberOfPoints; i++) {
      positions.push(
        randomRange(-1, 1),
        randomRange(-1, 1),
        randomRange(-1, 1)
      );
    }
    return new Float32Array(positions);
  }, []);
  let randoms = useMemo(() => {
    let randoms = [];
    for (let i = 0; i < numberOfPoints; i++) {
      randoms.push(randomRange(0.3, 1));
    }
    return new Float32Array(randoms);
  }, []);
  useEffect(() => {
    for (let i = 0; i < allthecurve.length; i++) {
      for (let j = 0; j < density; j++) {
        myPoints.current.push({
          currentOffset: Math.random(),
          speed: Math.random() * 0.01,
          curve: allthecurve[i],
          curPosition: Math.random(),
        });
      }
    }
  }, []);

  useFrame(({ clock }: any) => {
    let curpositions = brainGeo.current.attributes.position.array;
    for (let i = 0; i < myPoints.current.length; i++) {
      myPoints.current[i].curPosition += myPoints.current[i].speed;
      myPoints.current[i].curPosition = myPoints.current[i].curPosition % 1;

      let curPoint = myPoints.current[i].curve.getPointAt(
        myPoints.current[i].curPosition
      );
      curpositions[i * 3] = curPoint.x;
      curpositions[i * 3 + 1] = curPoint.y;
      curpositions[i * 3 + 2] = curPoint.z;
    }
    brainGeo.current.attributes.position.needsUpdate = true;
  });

  const BrainParticleMaterial = shaderMaterial(
    { time: 0, color: new THREE.Color(0.5, 0.7, 1) },
    //vector shader
    /*glsl*/ `
      varying vec2 vUv;
      uniform float time;
      varying float vProgress;
      attribute float randoms;
      void main(){
          vUv = uv;
          gl_Position = projectionMatrix*modelViewMatrix*vec4
          (position,1.0);
          vProgress = smoothstep(-1.,1.,sin(vUv.x*8.+time*3.));
  
          vec4 mvPosition = modelViewMatrix*vec4(position,1.0);
          gl_PointSize = randoms*2. * (1./-mvPosition.z);
      }
      `,
    /*glsl*/ `
      uniform float time;
      void main(){
          float disc =length(gl_PointCoord.xy - vec2(0.5));
          float opacity =0.9*smoothstep(0.8,0.1,disc);
          gl_FragColor = vec4(vec3(opacity),0.3);
      }
      `
  );
  extend({ BrainParticleMaterial });

  return (
    <points>
      <bufferGeometry attach="geometry" ref={brainGeo}>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-randoms"
          count={randoms.length}
          array={randoms}
          itemSize={1}
        />
      </bufferGeometry>
      <brainParticleMaterial
        attach="material"
        transparent={true}
        depthTest={false}
        depthWrite={false}
        bleding={THREE.AdditiveBlending}
      />
    </points>
  );
};
