import React, { createContext, useState } from 'react';
import { Color, King, Position, Queen } from '@official-sashimi/chess-models';
import { initialState } from './constants';
import { castlingableSidesReducer, usePiecePlacementMutation } from './hooks';

export const GameContext = createContext(initialState);
export const GameProvider: React.VFC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [castlingableSides, setCastlingableSides] = useState<Set<King | Queen>>(
    new Set([
      new King('White'),
      new Queen('White'),
      new King('Black'),
      new Queen('Black'),
    ])
  );
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

    if (
      mutatePiecePlacement(
        piecePlacement,
        selectingPosition,
        position,
        castlingableSides
      )
    ) {
      toggleActiveColor();
    }

    setCastlingableSides(
      castlingableSidesReducer(
        castlingableSides,
        piecePlacement,
        selectingPosition,
        position
      )
    );
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
