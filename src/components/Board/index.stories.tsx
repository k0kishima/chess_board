import React from 'react';
import { Meta } from '@storybook/react/types-7-0';

import { createSquaresProps } from '@/utils/squares';
import { Board } from '.';
import { Square } from '../Square';

export default {
  title: 'Board',
  component: Board,
} as Meta;

const WHITE_SQUARE_HEX_COLOR = '#fff';
const BLACK_SQUARE_HEX_COLOR = '#111';

export const EmptyBoard: React.VFC = () => {
  return <Board boardVw={50} frameHexColor='#000' />;
};

export const Size2x2: React.VFC = () => {
  return (
    <Board boardVw={50} frameHexColor='#000'>
      {createSquaresProps(
        50,
        2,
        WHITE_SQUARE_HEX_COLOR,
        BLACK_SQUARE_HEX_COLOR
      ).map((props, i) => {
        return <Square {...props} key={i} />;
      })}
    </Board>
  );
};

export const Size4x4: React.VFC = () => {
  return (
    <Board boardVw={50} frameHexColor='#000'>
      {createSquaresProps(
        50,
        4,
        WHITE_SQUARE_HEX_COLOR,
        BLACK_SQUARE_HEX_COLOR
      ).map((props, i) => {
        return <Square {...props} key={i} />;
      })}
    </Board>
  );
};

export const Size8x8: React.VFC = () => {
  return (
    <Board boardVw={50} frameHexColor='#000'>
      {createSquaresProps(
        50,
        8,
        WHITE_SQUARE_HEX_COLOR,
        BLACK_SQUARE_HEX_COLOR
      ).map((props, i) => {
        return <Square {...props} key={i} />;
      })}
    </Board>
  );
};
