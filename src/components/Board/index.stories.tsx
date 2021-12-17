import React from 'react';
import { Meta } from '@storybook/react/types-7-0';
import { Board } from '.';
import { Square } from '../Square';

export default {
  title: 'Board',
  component: Board,
} as Meta;

const createSquaresProps = (boardVw: number, quantityPerRow: number) => {
  const whiteSquareHexColor = '#fff';
  const blackSquareHexColor = '#111';
  const squareSize = boardVw / quantityPerRow;

  return [...Array<undefined>(quantityPerRow)]
    .map((_, x) => {
      return [...Array<undefined>(quantityPerRow)].map((_, y) => {
        return {
          hexColorCode:
            (x + y) % 2 === 1 ? blackSquareHexColor : whiteSquareHexColor,
          sideLengthByViewPort: squareSize,
        };
      });
    })
    .flat();
};

export const EmptyBoard: React.VFC = () => {
  return <Board boardVw={50} frameHexColor='#000' />;
};

export const Size2x2: React.VFC = () => {
  return (
    <Board boardVw={50} frameHexColor='#000'>
      {createSquaresProps(50, 2).map((props, i) => {
        return <Square {...props} key={i} />;
      })}
    </Board>
  );
};

export const Size4x4: React.VFC = () => {
  return (
    <Board boardVw={50} frameHexColor='#000'>
      {createSquaresProps(50, 4).map((props, i) => {
        return <Square {...props} key={i} />;
      })}
    </Board>
  );
};

export const Size8x8: React.VFC = () => {
  return (
    <Board boardVw={50} frameHexColor='#000'>
      {createSquaresProps(50, 8).map((props, i) => {
        return <Square {...props} key={i} />;
      })}
    </Board>
  );
};
