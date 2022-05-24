import React, { ComponentProps, useContext } from 'react';
import { File, Position, Rank } from '@official-sashimi/chess-models';
import { GameContext } from '@/contexts/game';
import { Piece, Square as Presentation } from '@/components';
import { PieceSymbolOfFEN } from '@/types';

type Props = ComponentProps<typeof Presentation> & {
  file: File;
  rank: Rank;
  fenPieceSymbol?: PieceSymbolOfFEN;
};

export const Square: React.VFC<Props> = ({
  file,
  rank,
  fenPieceSymbol,
  hexColorCode,
  sideLengthByViewPort,
  isSelecting,
}: Props) => {
  const { selectSquare } = useContext(GameContext);

  return (
    <div onClick={() => selectSquare(new Position(file, rank))}>
      <Presentation
        hexColorCode={hexColorCode}
        sideLengthByViewPort={sideLengthByViewPort}
        isSelecting={isSelecting}
      >
        {fenPieceSymbol ? <Piece symbol={fenPieceSymbol} /> : null}
      </Presentation>
    </div>
  );
};
