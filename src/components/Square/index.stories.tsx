import React from 'react';
import { Meta } from '@storybook/react/types-7-0';

import { Piece } from '@/components/Piece';
import { Square } from '.';

export default {
  title: 'Square',
  component: Square,
} as Meta;

export const whiteSquare: React.VFC = () => {
  return <Square hexColorCode='#eee' sideLengthByViewPort={10} />;
};

export const blackSquare: React.VFC = () => {
  return <Square hexColorCode='#111' sideLengthByViewPort={10} />;
};

export const whiteSquareWithWhitePiece: React.VFC = () => {
  return (
    <Square hexColorCode='#eee' sideLengthByViewPort={10}>
      <Piece symbol='K' />
    </Square>
  );
};

export const blackSquareWithWhitePiece: React.VFC = () => {
  return (
    <Square hexColorCode='#333' sideLengthByViewPort={10}>
      <Piece symbol='Q' />
    </Square>
  );
};

export const whiteSquareWithBlackPiece: React.VFC = () => {
  return (
    <Square hexColorCode='#eee' sideLengthByViewPort={10}>
      <Piece symbol='k' />
    </Square>
  );
};

export const blackSquareWithBlackPiece: React.VFC = () => {
  return (
    <Square hexColorCode='#333' sideLengthByViewPort={10}>
      <Piece symbol='q' />
    </Square>
  );
};

export const selectingWhiteSquareWithBlackPiece: React.VFC = () => {
  return (
    <Square hexColorCode='#eee' sideLengthByViewPort={10} isSelecting={true}>
      <Piece symbol='k' />
    </Square>
  );
};

export const selectingBlackSquareWithBlackPiece: React.VFC = () => {
  return (
    <Square hexColorCode='#333' sideLengthByViewPort={10} isSelecting={true}>
      <Piece symbol='q' />
    </Square>
  );
};
