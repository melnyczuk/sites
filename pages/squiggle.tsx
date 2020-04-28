/* eslint-disable no-undef */
import React, { FC, useRef, RefObject } from 'react';
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

type Coord = Tuple<number>;
function Coord(a): Coord { return Tuple<number>(a); }

type Bounds = Tuple<Tuple<number>>;
function Bounds(a): Bounds { return Tuple<Tuple<number>>(a); }


const squiggle: FC = () => {
  const svg = useRef();
  const seed = seedNumber(8, 3);

  const moveTo = `M ${centerOf(windowSize())}`;
  
  const curveTo = Array(seed)
    .fill(0)
    .map(windowSize)
    .map(toCurveTriplet)
    .map(toCurveString)
    .join(' ');

  const path = `${moveTo} ${curveTo} Z`;

  const stroke = pickFrom(colors);

  const gutters = decimate(windowSize());
  
  const maxDownloadButtonHeight = 96;
  const downloadButtonHeight = Math.min(gutters[1], maxDownloadButtonHeight);
  const downloadButtonFontSize = `${downloadButtonHeight * 0.6}px`;

  const weight = Math.min(...decimate(gutters), maxDownloadButtonHeight);
  const strokeSeed = weight + 4;
  const strokeEntropy = weight - 3;
  const strokeWidth = seedNumber(strokeSeed, strokeEntropy); 

  return (
    <>
      <svg 
        ref={svg} 
        onClick={useUpdate()} 
        width={window.innerWidth} 
        height={window.innerHeight}
      >
        <path 
          d={path} 
          style={{ fill: 'none', stroke, strokeWidth }} 
        />
      </svg>
      <button 
        onClick={(): void => downloadSVG(svg)}
        style={{ 
          fontSize: downloadButtonFontSize,
          height: downloadButtonHeight,
          width: '100%', 
          border: 'none', 
          outline: 'none',
          background: 'white',
          overflow: 'hidden',
          color: stroke,
        }}
      >
          download
      </button>
    </>
  );
};

export default dynamic(() => Promise.resolve(squiggle), { ssr: false });


function windowSize (): Coord {
  const { innerWidth, innerHeight } = window;
  return [innerWidth, innerHeight];
} 

function pickFrom <T> (a: T[]): T {
  return a[Math.floor(Math.random() * a.length)];
} 

function seedNumber (seed: number, entropy: number): number {
  return Math.floor(toRandomNum([seed - entropy, seed + entropy]));
}

function limitValue (n: number): Tuple<number> {
  return [0.1 * n, 0.9 * n];
} 

function first ([x]: Tuple<number>): number {
  return x;
}

function decimate(tuple: Tuple<number>): Tuple<number> {
  return Tuple<number>(
    tuple.map(limitValue).map(first).map(Math.floor)
  );
}

function centerOf ([x, y]: Coord): Coord { 
  return [x * 0.5, y * 0.5];
}

function toRandomNum ([lower, upper]: Bounds[0]): number { 
  return Math.random() * (upper - lower) + lower;
}

function toBounds (coord: Coord): Bounds { 
  return Bounds(
    coord.map(limitValue)
  );
}

function toCoords (bounds: Bounds): Coord {
  return Coord(
    bounds.map(toRandomNum)
  );
}

function toCurveTriplet (size: Tuple<number>): Triple<Coord> {
  return Triple<Coord>(
    Array(3).fill(size).map(toBounds).map(toCoords)
  );
} 

function toCurveString ([[x1, y1], [x2, y2], [x, y]]: Triple<Coord>): string {
  return `C ${x1} ${y1} ${x2} ${y2} ${x} ${y}`;
}

function downloadSVG ({ current }: RefObject<SVGElement>): void { 
  if (!current) return;

  const filename = 'squiggle.svg';
  const dataUri = serializeSvg(current);

  const a = document.createElement('a');
  a.setAttribute('download', filename);
  a.setAttribute('href', dataUri);
  a.click(); 
}

function serializeSvg(svg: SVGElement): string {
  const s = new XMLSerializer();
  const content = s.serializeToString(svg);
  return `data:application/octet-stream,${encodeURIComponent(content)}`;
}
