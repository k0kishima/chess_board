import React from 'react';
import { Meta } from '@storybook/react/types-7-0';
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
