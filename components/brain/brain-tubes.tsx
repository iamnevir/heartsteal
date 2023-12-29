//@ts-nocheck
import { shaderMaterial } from "@react-three/drei";
import { extend, useFrame, useThree } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

const Tube = ({ curve }: any) => {
  const brainMat = useRef<any>();
  const { viewport } = useThree();

  useFrame(({ clock, mouse }: any) => {
    brainMat.current.uniforms.time.value = clock.getElapsedTime();
    brainMat.current.uniforms.mouse.value = new THREE.Vector3(
      (mouse.x * viewport.width) / 2,
      (mouse.y * viewport.width) / 2,
      0
    );
  });
  const BrainMaterial = shaderMaterial(
    {
      time: 0,
      color: new THREE.Color(2.5, 0.7, 10),
      mouse: new THREE.Vector3(0, 0, 0),
    },
    //vector shader
    /*glsl*/ `
        varying vec2 vUv;
        uniform float time;
        uniform vec3 mouse;
        varying float vProgress;
        void main(){
            vUv = uv;
            vProgress = smoothstep(-1.,1.,sin(vUv.x*8.+time*3.));

            vec3 p = position;
            float maxDist = 0.2;
            float dist = length(mouse-p);
            if(dist<maxDist){
                vec3 dir = normalize(mouse-p);
                dir*=(1.-dist/maxDist);
                p-=dir*0.03;
            }
            gl_Position = projectionMatrix*modelViewMatrix*vec4
            (p,1.0);
        }
        `,
    /*glsl*/ `
        varying vec2 vUv;
        uniform float time;
        uniform vec3 color;
        varying float vProgress;
        void main(){
            vec3 finalColor =mix(color,color*0.25,vProgress);
            // float hideCorners = smoothstep(0.,0.5,vUv.x);
             float hideCorners = smoothstep(1.,0.9,vUv.x);
             float hideCorners1 = smoothstep(0.,0.1,vUv.x);
            // vec3 finalColor =mix(color1,color2,vProgress);
           gl_FragColor.rgba = vec4(vec3(vProgress),1.);
           gl_FragColor.rgba = vec4(finalColor,
            hideCorners*hideCorners1 );

        }
        `
  );

  extend({ BrainMaterial });

  return (
    <>
      <mesh>
        <tubeGeometry args={[curve, 64, 0.0015, 4, false]} />

        <brainMaterial
          ref={brainMat}
          side={THREE.DoubleSide}
          transparent={true}
          depthTest={false}
          depthWrite={false}
          bleding={THREE.AdditiveBlending}
        />
      </mesh>
    </>
  );
};
const Tubes = ({ allthecurve }: any) => {
  return (
    <>
      {allthecurve.map((curve: any, index: any) => (
        <Tube curve={curve} key={index} />
      ))}
    </>
  );
};
export default Tubes;
