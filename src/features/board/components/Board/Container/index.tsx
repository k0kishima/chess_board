import { useState, useEffect } from 'react';

import { Piece, Square } from '@/components';
import { Position } from '@/entities';
import { Menu, SquareContainer } from '@/features/board/components';
import { useSelector } from '@/stores/store';
import { createSquaresProps } from '@/utils/squares';
import { Presentation } from '../Presentation';

export const Container: React.VFC = () => {
  const { frameHexColor, whiteSquareHexColor, blackSquareHexColor, pieces } =
    useSelector((state) => state.board);

  const [height, setHeight] = useState<number>(0);
  const [width, setWidth] = useState<number>(0);

  useEffect(() => {
    setHeight(window.innerHeight);
    setWidth(window.innerWidth);
  }, []);

  if (height && width) {
    const BOARD_VW = height / width > 1 ? 90 : 48;
    const QUANTITY_PER_ROW = 8;

    const positions = Position.all().sort((a, b) => b.rank - a.rank);

    return (
      <>
        <Presentation frameHexColor={frameHexColor} boardVw={BOARD_VW}>
          {createSquaresProps(
            BOARD_VW,
            QUANTITY_PER_ROW,
            whiteSquareHexColor,
            blackSquareHexColor
          ).map((props, i) => {
            const position = positions[i];
            const piece = pieces[position.file][position.rank];

            if (!piece) {
              return (
                <SquareContainer position={position}>
                  <Square {...props} key={i} />
                </SquareContainer>
              );
            } else {
              return (
                <SquareContainer position={position}>
                  <Square {...props} key={i}>
                    <Piece symbol={piece.toSymbol()} />
                  </Square>
                </SquareContainer>
              );
            }
          })}
        </Presentation>
        <div>
          <Menu />
        </div>
      </>
    );
  } else {
    return <></>;
  }
};
