import { useState, useEffect } from 'react';

import { ALL_FILES, ALL_RANKS } from '@/types';
import { RootState, useSelector } from '@/stores/store';
import { parsePiecePlacement } from '@/utils/fen';
import { createSquaresProps } from '@/utils/squares';
import { Square } from '@/components/Square';
import { Piece } from '@/components/Piece';
import { Presentation } from '../Presentation';

const selector = ({ board }: RootState) => ({
  frameHexColor: board.frameHexColor,
  whiteSquareHexColor: board.whiteSquareHexColor,
  blackSquareHexColor: board.blackSquareHexColor,
  history: board.history,
});

const positionStrings: string[] = [];
[...ALL_RANKS].reverse().forEach((rank) => {
  [...ALL_FILES].forEach((file) => {
    positionStrings.push(`${file}${rank}`);
  });
});

export const Container: React.VFC = () => {
  const { frameHexColor, whiteSquareHexColor, blackSquareHexColor, history } =
    useSelector(selector);

  const [height, setHeight] = useState<number>(0);
  const [width, setWidth] = useState<number>(0);

  useEffect(() => {
    setHeight(window.innerHeight);
    setWidth(window.innerWidth);
  }, []);

  const pieces = createPiecesIndexedByPositionString(history.slice(-1)[0]);

  if (height && width) {
    const BOARD_VW = height / width > 1 ? 90 : 48;
    const QUANTITY_PER_ROW = 8;

    return (
      <Presentation frameHexColor={frameHexColor} boardVw={BOARD_VW}>
        {createSquaresProps(
          BOARD_VW,
          QUANTITY_PER_ROW,
          whiteSquareHexColor,
          blackSquareHexColor
        ).map((props, i) => {
          const positionString = positionStrings[i];
          const piece = pieces[positionString];

          if (!piece) {
            return <Square {...props} key={i} />;
          } else {
            return (
              <Square {...props} key={i}>
                <Piece symbol={piece.toSymbol()} />
              </Square>
            );
          }
        })}
      </Presentation>
    );
  } else {
    return <></>;
  }
};

const createPiecesIndexedByPositionString = (fen: string) => {
  const positionPieceTuples = parsePiecePlacement(fen);
  return Object.fromEntries(
    positionPieceTuples.map((tuple) => {
      const [position, piece] = tuple;
      return [`${position.file}${position.rank}`, piece];
    })
  );
};
