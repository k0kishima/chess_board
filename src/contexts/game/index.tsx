import React, { createContext } from 'react';

import { initialState } from './constants';

export const GameContext = createContext(initialState);

export const GameProvider: React.VFC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <GameContext.Provider value={initialState}>{children}</GameContext.Provider>
  );
};
