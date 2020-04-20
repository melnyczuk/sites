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

const one = ([bot, top]: Tuple<number>): number => Math.random() * (top - bot) + bot;
const two = (x: Tuple<number>): string => `${one(x)} ${one(x)}`;
const tri = (x: Tuple<number>): string => `${two(x)}, ${two(x)}, ${two(x)}`;

const avg = () => (window.innerWidth + window.innerHeight) * 0.5;
const arr = (s, e) => Array(Math.floor(one([s - e, s + e]))).fill(0);
const pik = a => a[Math.floor(Math.random() * a.length)];

const svg = (s: string): string => `M ${0.5 * window.innerWidth} ${0.5 * window.innerHeight} ${s} Z`;
const lim = (n: number): Tuple<number> => [0.1 * n, 0.9 * n];
const pts = (n: number): string => `C ${tri(lim(n))}`;
const red = (a: number[]): string => a.reduce(a => `${a} ${pts(avg())}`, '');

const squiggle: FC = () => (
  <div onClick={useUpdate()}>
    <svg width={window.innerWidth} height={window.innerHeight}>
      <path d={svg(red(arr(10, 5)))} style={{ fill: 'none', stroke: pik(colors), strokeWidth: one([5, 20]) }} />
    </svg>
  </div>
);

export default dynamic(() => Promise.resolve(squiggle), { ssr: false });
