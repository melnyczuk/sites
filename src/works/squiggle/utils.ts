import { RefObject } from 'react';
import { Bounds, Coord, Triple, Tuple } from './types';

export function windowSize(): Coord {
  const { innerWidth, innerHeight } = window;
  return [innerWidth, innerHeight];
}

export function pickFrom<T>(a: T[]): T {
  return a[Math.floor(Math.random() * a.length)];
}

export function decimate(tuple: Tuple<number>): Tuple<number> {
  return Tuple<number>(tuple.map(limitValue).map(first).map(Math.floor));
}

export function centerOf([x, y]: Coord): Coord {
  return [x * 0.5, y * 0.5];
}

export function toCurveTriplet(size: Tuple<number>): Triple<Coord> {
  return Triple<Coord>(Array(3).fill(size).map(toBounds).map(toCoords));
}

export function toCurveString([[x1, y1], [x2, y2], [x, y]]: Triple<
  Coord
>): string {
  return `C ${x1} ${y1} ${x2} ${y2} ${x} ${y}`;
}

export function downloadSVG({ current }: RefObject<SVGElement>): void {
  if (!current) return;

  const filename = 'squiggle.svg';
  const dataUri = serializeSvg(current);

  const a = document.createElement('a');
  a.setAttribute('download', filename);
  a.setAttribute('href', dataUri);
  a.click();
}

export function seedNumber(seed: number, entropy: number): number {
  return Math.floor(toRandomNum([seed - entropy, seed + entropy]));
}

function limitValue(n: number): Tuple<number> {
  return [0.1 * n, 0.9 * n];
}

function first([x]: Tuple<number>): number {
  return x;
}

function toRandomNum([lower, upper]: Bounds[0]): number {
  return Math.random() * (upper - lower) + lower;
}

function toBounds(coord: Coord): Bounds {
  return Bounds(coord.map(limitValue));
}

function toCoords(bounds: Bounds): Coord {
  return Coord(bounds.map(toRandomNum));
}

function serializeSvg(svg: SVGElement): string {
  const s = new XMLSerializer();
  const content = s.serializeToString(svg);
  return `data:application/octet-stream,${encodeURIComponent(content)}`;
}
