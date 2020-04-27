/* eslint-disable no-undef */
import React, { FC } from 'react';
import dynamic from 'next/dynamic';
import { useUpdate } from 'react-use';
import '../public/static/base.css';

const colors = [
  '#FCDAD1',
  '#B3C8C8',
  '#6CB2D1',
  '#4F9EC4',
  '#D8E2DC',
  '#70B39F',
  '#82A6B3',
];

type Tuple<T> = [T,T];
function Tuple<T>([x, y]: T[]): Tuple<T> { return [x, y]; }

type Triple<T> = [T,T,T];
function Triple<T>([x, y, z]: T[]): Triple<T> { return [x, y, z]; }


const squiggle: FC = () => {
  const seed = seedNumber(8, 3);

  const moveTo = `M ${centerOf(windowSize())}`;
  
  const curveTo = Array(seed)
    .fill(0)
    .map(windowSize)
    .map(toCurveTriplet)
    .map(toCurveString)
    .join(' ');

  const path = `${moveTo} ${curveTo} Z`;

  return (
    <>
      <div onClick={useUpdate()}>
        <svg width={window.innerWidth} height={window.innerHeight}>
          <path 
            d={path} 
            style={{ 
              fill: 'none', 
              stroke: pickFrom(colors), 
              strokeWidth: seedNumber(14, 6) 
            }} 
          />
        </svg>
      </div>
    </>
  );
};

export default dynamic(() => Promise.resolve(squiggle), { ssr: false });


function limitValue (n: number): Tuple<number> {
  return [0.1 * n, 0.9 * n];
} 

function centerOf ([x, y]: Tuple<number>): Tuple<number> { 
  return [x * 0.5, y * 0.5];
}

function toRandomNum ([lower, upper]: Tuple<number>): number { 
  return Math.random() * (upper - lower) + lower;
}

function toBounds (t: Tuple<number>): Tuple<Tuple<number>> { 
  return Tuple<Tuple<number>>(
    t.map(limitValue)
  );
}

function toCoords (t: Tuple<Tuple<number>>): Tuple<number> {
  return Tuple<number>(
    t.map(toRandomNum)
  );
}

function toCurveTriplet (size): Triple<Tuple<number>> {
  return Triple<Tuple<number>>(
    Array(3).fill(size).map(toBounds).map(toCoords)
  );
} 

function toCurveString (coordTriplet: Triple<Tuple<number>>): string {
  const [[x1, y1], [x2, y2], [x, y]] = coordTriplet;
  return `C ${x1} ${y1} ${x2} ${y2} ${x} ${y}`;
}

function windowSize (): Tuple<number> {
  const { innerWidth, innerHeight } = window;
  return [innerWidth, innerHeight];
} 

function pickFrom (a: string[]): string {
  return a[Math.floor(Math.random() * a.length)];
} 

function seedNumber (seed: number, entropy: number): number {
  return Math.floor(toRandomNum([seed - entropy, seed + entropy]));
}
