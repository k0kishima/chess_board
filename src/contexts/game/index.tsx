import React, { createContext, useState } from 'react';
import { Color, Position } from '@official-sashimi/chess-models';

import { initialState } from './constants';
import { usePiecePlacementMutation } from './hooks/usePiecePlacementMutation';

export const GameContext = createContext(initialState);

export const GameProvider: React.VFC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [activeColor, setActiveColor] = useState<Color>('White');
  const [selectingPosition, setSelectingPosition] = useState<
    Position | undefined
  >(undefined);
  const { mutatePiecePlacement, piecePlacement } = usePiecePlacementMutation();
  const toggleActiveColor = () => {
    setActiveColor(activeColor == 'White' ? 'Black' : 'White');
  };

  const selectSquare = (position: Position): void => {
    if (selectingPosition == undefined) {
      const piece = piecePlacement[position.file]?.[position.rank];
      if (piece && piece.color !== activeColor) {
        setSelectingPosition(undefined);
        return;
      }

      setSelectingPosition(position);
      return;
    }
    if (
      selectingPosition.file == position.file &&
      selectingPosition.rank == position.rank
    ) {
      setSelectingPosition(undefined);
      return;
    }

    if (mutatePiecePlacement(selectingPosition, position)) {
      toggleActiveColor();
    }

    setSelectingPosition(undefined);
  };

  return (
    <GameContext.Provider
      value={{
        ...initialState,
        piecePlacement,
        selectingPosition,
        selectSquare,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};
