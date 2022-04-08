import React, { createContext, useState } from 'react';
import { Position } from '@official-sashimi/chess-models';

import { initialState } from './constants';
import { usePiecePlacementMutation } from './hooks/usePiecePlacementMutation';

export const GameContext = createContext(initialState);

export const GameProvider: React.VFC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [selectingPosition, setSelectingPosition] = useState<
    Position | undefined
  >(undefined);
  const { mutatePiecePlacement, piecePlacement } = usePiecePlacementMutation();

  const selectSquare = (position: Position): void => {
    if (selectingPosition == undefined) {
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

    mutatePiecePlacement(selectingPosition, position);
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
