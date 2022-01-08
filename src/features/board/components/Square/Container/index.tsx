import React from 'react';

import { Position } from '@/entities';
import { boardStore } from '@/features/board/stores';
import { useAppDispatch } from '@/stores/store';

type Props = {
  children?: React.ReactNode;
  position: Position;
};

export const Container: React.VFC<Props> = ({ children, position }: Props) => {
  const dispatch = useAppDispatch();

  const handleClick: (event: React.MouseEvent<HTMLElement>) => void = (_) => {
    try {
      dispatch(boardStore.actions.selectPosition({ position: position }));
    } catch (error) {
      dispatch(boardStore.actions.resetPositionSelection());
      alert(error);
    }
  };

  return <div onClick={handleClick}>{children}</div>;
};
