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
function tuple<T> ([x, y]: T[]): Tuple<T> { return [x, y]; }

type Triple<T> = [T,T,T];
function triple<T> ([x, y, z]: T[]): Triple<T> { return [x, y, z]; }

const limitValue = n => [0.1 * n, 0.9 * n];
const centerOf = ([x, y]) => [x * 0.5, y * 0.5];
const toRandomNum = ([lower, upper]) => Math.random() * (upper - lower) + lower;

const toTupleOfBoundsTuples = t => tuple<Tuple<number>>(t.map(limitValue));
const toTupleOfRandomNums = t => tuple<number>(t.map(toRandomNum));
const toCurveTriplet = bounds => triple<Tuple<number>>(Array(3).fill(bounds).map(toTupleOfRandomNums));

const toCurveString = ([[x1, y1], [x2, y2], [x, y]]: Triple<Tuple<number>>) => `C ${x1} ${y1} ${x2} ${y2} ${x} ${y}`;

const windowSize = (): Tuple<number> => [window.innerWidth, window.innerHeight];
const pickFrom = (a: string[]): string => a[Math.floor(Math.random() * a.length)];
const seedNumber = (seed: number, entropy: number): number => Math.floor(toRandomNum([seed - entropy, seed + entropy]));

const squiggle: FC = () => {
  const seed = seedNumber(8, 3);

  const moveTo = `M ${centerOf(windowSize())}`;
  
  const curveTo = Array(seed)
    .fill(0)
    .map(windowSize)
    .map(toTupleOfBoundsTuples)
    .map(toCurveTriplet)
    .map(toCurveString)
    .join(' ');

  const path = `${moveTo} ${curveTo} Z`;

  console.log('path', path);

  return (
    <>
      <div onClick={useUpdate()}>
        <svg width={window.innerWidth} height={window.innerHeight}>
          <path 
            d={path} 
            style={{ fill: 'none', stroke: pickFrom(colors), strokeWidth: seedNumber(14, 6) }} 
          />
        </svg>
      </div>
    </>
  );
};

export default dynamic(() => Promise.resolve(squiggle), { ssr: false });
