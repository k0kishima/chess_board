import React, { createContext, useCallback, useState } from 'react';
import { Position } from '@official-sashimi/chess-models';

import { initialState } from './constants';

export const GameContext = createContext(initialState);

export const GameProvider: React.VFC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [selectingPosition, setSelectingPosition] = useState<
    Position | undefined
  >(undefined);
  const selectSquare = useCallback((position: Position): void => {
    setSelectingPosition(position);
  }, []);

  return (
    <GameContext.Provider
      value={{ ...initialState, selectingPosition, selectSquare }}
    >
      {children}
    </GameContext.Provider>
  );
};
