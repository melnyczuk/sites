import React, { FC, useState } from 'react';
import { useAsync } from 'react-use';
import { Canvas, useFrame } from 'react-three-fiber';
import { 
  ClampToEdgeWrapping,
  FrontSide,
  Mesh,
  PlaneGeometry,
  Texture,
  TextureLoader,
  UVMapping,
} from 'three';

import '../public/static/base.css';

const ROCK_PATH = '/static/ahirespngofarock.png';
const SPEED = 0.01;

const {
  innerWidth = 500,
  innerHeight = 500,
// eslint-disable-next-line no-undef
} = typeof(window) === 'undefined' ? {} : window;

const getTexture = async (): Promise<Texture> => {
  return await new TextureLoader().load(ROCK_PATH, (tex) => {
    tex.mapping = UVMapping;
    tex.wrapS = ClampToEdgeWrapping;
    tex.wrapT = ClampToEdgeWrapping;
    tex.needsUpdate = true;
  });
};


const Rock: FC = () => {
  const [time, setTime] = useState(0);

  const { error, value } = useAsync(getTexture);

  useFrame(({ scene }) => {   
    const { geometry } = scene.children[0] as Mesh & { geometry: PlaneGeometry};
    
    setTime(time + SPEED);

    geometry.vertices.forEach((vert, i, { length }) => 
      vert.setZ(64 * Math.cos(time + (i % length)))
    );

    geometry.verticesNeedUpdate = true;
  });

  return error ? null : (
    <mesh> 
      <planeGeometry 
        attach="geometry" 
        args={[innerHeight * 0.8, innerHeight, 5, 5]} 
      />
      <meshStandardMaterial 
        transparent
        attach="material"
        map={value} 
        side={FrontSide}
      />
    </mesh>
  );
};

const ahirespngofarock: FC = () => (
  <div style={{ width: innerWidth, height: innerHeight }} >
    <Canvas camera={{
      far: 10000,
      position: [0, 0, 500],
      rotation: [-Math.PI / 250, Math.PI / 100, 0],
    }}>
      <ambientLight />
      <Rock />
    </Canvas>
  </div>
);

export default ahirespngofarock;
