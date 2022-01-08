import React from 'react';
import { useDispatch } from 'react-redux';

import { Position } from '@/entities';
import { boardSlice } from '../../../stores/slice';

type Props = {
  children?: React.ReactNode;
  position: Position;
};

export const Container: React.VFC<Props> = ({ children, position }: Props) => {
  const dispatch = useDispatch();

  const handleClick: (event: React.MouseEvent<HTMLElement>) => void = (_) => {
    try {
      dispatch(boardSlice.actions.selectPosition({ position: position }));
    } catch (error) {
      dispatch(boardSlice.actions.resetPositionSelection());
      alert(error);
    }
  };

  return <div onClick={handleClick}>{children}</div>;
};
