export type Tuple<T> = [T, T];
export function Tuple<T>([x, y]: T[]): Tuple<T> {
  return [x, y];
}

export type Triple<T> = [T, T, T];
export function Triple<T>([x, y, z]: T[]): Triple<T> {
  return [x, y, z];
}

export type Coord = Tuple<number>;
export function Coord(a): Coord {
  return Tuple<number>(a);
}

export type Bounds = Tuple<Tuple<number>>;
export function Bounds(a): Bounds {
  return Tuple<Tuple<number>>(a);
}
