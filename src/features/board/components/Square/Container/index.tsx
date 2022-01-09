import React from 'react';

import { Position } from '@/entities';
import { boardStore } from '@/features/board/stores';
import { useAppDispatch, useSelector } from '@/stores/store';

type Props = {
  children?: React.ReactNode;
  position: Position;
};

export const Container: React.VFC<Props> = ({ children, position }: Props) => {
  const dispatch = useAppDispatch();

  const { selectingPosition } = useSelector((state) => state.board);

  const handleClick: (event: React.MouseEvent<HTMLElement>) => void = () => {
    try {
      if (selectingPosition) {
        dispatch(
          boardStore.actions.movePiece({
            from: selectingPosition,
            to: position,
          })
        );
      } else {
        dispatch(boardStore.actions.selectPosition({ position: position }));
      }
    } catch (error) {
      dispatch(boardStore.actions.resetPositionSelection());
      alert(error);
    }
  };

  return <div onClick={handleClick}>{children}</div>;
};
