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

const one = ([x, y]: Tuple<number>) => Math.random() * (y - x) + x;
const two = (t: Tuple<Tuple<number>>) => t.map(one).join(' ');
const tri = (t: Tuple<Tuple<number>>) => Array(3).fill(t).map(two).join(', ');

const rng = (s, e) => one([s - e, s + e]);
const flo = (s, e) => Math.floor(rng(s, e));
const arr = (s, e) => Array(flo(s, e)).fill(0);

const pik = a => a[Math.floor(Math.random() * a.length)];

const win = ({ innerWidth, innerHeight }): Tuple<number> => [innerWidth, innerHeight];
const cen = ({ innerWidth, innerHeight }) => `${0.5 * innerWidth} ${0.5 * innerHeight}`;

const lim = (n: number): Tuple<number> => [0.1 * n, 0.9 * n];

const shi = (t: Tuple<number>): Tuple<number>[] => t.map(lim);
const mtp = (t: Tuple<number>): Tuple<Tuple<number>> => [shi(t)[0], shi(t)[1]];
const pts = (t: Tuple<number>): string => `C ${tri(mtp(t))}`;

const red = (a: number[]): string => a.reduce(a => `${a} ${pts(win(window))}`, '');
const svg = (s: string) => `M ${cen(window)} ${s} Z`;

const squiggle: FC = () => (
  <div onClick={useUpdate()}>
    <svg width={window.innerWidth} height={window.innerHeight}>
      <path d={svg(red(arr(8, 3)))} style={{ fill: 'none', stroke: pik(colors), strokeWidth: one([8, 20]) }} />
    </svg>
  </div>
);

export default dynamic(() => Promise.resolve(squiggle), { ssr: false });
