import React, { useContext } from 'react';
import { ALL_FILES, ALL_RANKS } from '@official-sashimi/chess-models';
import { Piece, Square } from '@/components';
import { FenPieceSymbolFactory } from '@/utils/fen/FenPieceSymbolFactory';
import { GameContext } from '@/contexts/game';

export type Props = {
  boardVw: number;
};

export const SquareList: React.VFC<Props> = ({ boardVw }: Props) => {
  const { piecePlacement } = useContext(GameContext);
  const quantityPerRow = 8;
  const whiteSquareHexColor = '#eee';
  const blackSquareHexColor = '#555';
  const squareSize = boardVw / quantityPerRow;

  const reversedRanks = [...ALL_RANKS].reverse();
  const propsList = [...Array<undefined>(quantityPerRow)]
    .map((_, x) => {
      return [...Array<undefined>(quantityPerRow)].map((_, y) => {
        const file = ALL_FILES[y];
        const rank = reversedRanks[x];
        const piece = piecePlacement[file]?.[rank];

        return {
          hexColorCode:
            (x + y) % 2 === 1 ? blackSquareHexColor : whiteSquareHexColor,
          sideLengthByViewPort: squareSize,
          fenPieceSymbol: piece ? FenPieceSymbolFactory.create(piece) : null,
        };
      });
    })
    .flat();

  return propsList.map((props, i) => {
    const { hexColorCode, sideLengthByViewPort, fenPieceSymbol } = props;

    return (
      <Square
        hexColorCode={hexColorCode}
        sideLengthByViewPort={sideLengthByViewPort}
        key={i}
      >
        {fenPieceSymbol ? <Piece symbol={fenPieceSymbol} /> : null}
      </Square>
    );
  });
};
