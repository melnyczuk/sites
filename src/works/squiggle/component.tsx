import React, { FC, useRef } from 'react';
import { useUpdate } from 'react-use';

import {
  centerOf,
  decimate,
  downloadSVG,
  pickFrom,
  seedNumber,
  toCurveString,
  toCurveTriplet,
  windowSize,
} from './utils';

const colors = [
  '#FCDAD1',
  '#B3C8C8',
  '#6CB2D1',
  '#4F9EC4',
  '#D8E2DC',
  '#70B39F',
  '#82A6B3',
];

const Squiggle: FC = () => {
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

  const [width, height] = windowSize();

  return (
    <>
      <svg ref={svg} onClick={useUpdate()} width={width} height={height}>
        <path d={path} style={{ fill: 'none', stroke, strokeWidth }} />
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

export default Squiggle;
