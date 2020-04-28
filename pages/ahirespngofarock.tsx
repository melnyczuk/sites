/* eslint-disable no-undef */
import React, { FC, useState } from 'react';
import dynamic from 'next/dynamic';
import { useAsync } from 'react-use';
import { Canvas, useFrame, useThree } from 'react-three-fiber';
import {
  ClampToEdgeWrapping,
  Color,
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
const BULGE = 36;


const Rock: FC = () => {
  const { gl } = useThree();
  const [time, setTime] = useState(0);
  const [color, setColor] = useState(0);
  const { error, value } = useAsync(texture);

  useFrame(({ scene }) => {
    setTime(time + SPEED);
    (scene.children[1] as Mesh).geometry = geometry(time);
    gl.setClearColor(new Color(0x101010), color);
    gl.setSize(innerWidth, innerHeight);
  });

  return error ? null : (
    <mesh onClick={(): void => { setColor(color ? 0 : 1); }} >
      <planeGeometry attach="geometry" />
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
  <div style={{ width: '100%', height: '100%' }} >
    <Canvas
      camera={{
        aspect: 1,
        far: 10000,
        near: 0.1,
        position: [0, 0, 1000],
        rotation: [-Math.PI / 250, Math.PI / 100, 0],
      }}
    >
      <ambientLight />
      <Rock />
    </Canvas>
  </div>
);

export default dynamic(() => Promise.resolve(ahirespngofarock), { ssr: false });


function geometry (time: number): PlaneGeometry {
  const geo = new PlaneGeometry(innerHeight, innerHeight, 5, 5);
  geo.vertices.forEach((vert, i, { length }) =>
    vert.setZ(BULGE * Math.cos(time + (i % length)))
  );
  geo.verticesNeedUpdate = true;
  return geo;
}

async function texture (): Promise<Texture> {
  return await new TextureLoader().load(ROCK_PATH, (tex) => {
    tex.mapping = UVMapping;
    tex.wrapS = ClampToEdgeWrapping;
    tex.wrapT = ClampToEdgeWrapping;
    tex.needsUpdate = true;
  });
}
