import React from 'react';
import { Meta } from '@storybook/react/types-7-0';

import { Board } from '.';

export default {
  title: 'Board',
  component: Board,
} as Meta;

export const EmptyBoard: React.VFC = () => {
  return <Board boardVw={50} frameHexColor='#000' />;
};
