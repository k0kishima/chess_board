import { useState, useEffect } from 'react';

import { RootState, useSelector } from '@/stores/store';
import { createSquaresProps } from '@/utils/squares';
import { Square } from '@/components/Square';
import { Presentation } from '../Presentation';

const selector = ({ board }: RootState) => ({
  frameHexColor: board.frameHexColor,
  whiteSquareHexColor: board.whiteSquareHexColor,
  blackSquareHexColor: board.blackSquareHexColor,
});

export const Container: React.VFC = () => {
  const { frameHexColor, whiteSquareHexColor, blackSquareHexColor } =
    useSelector(selector);

  const [height, setHeight] = useState<number>(0);
  const [width, setWidth] = useState<number>(0);

  useEffect(() => {
    setHeight(window.innerHeight);
    setWidth(window.innerWidth);
  }, []);

  if (height && width) {
    const BOARD_VW = height / width > 1 ? 90 : 48;

    return (
      <Presentation frameHexColor={frameHexColor} boardVw={BOARD_VW}>
        {createSquaresProps(
          BOARD_VW,
          8,
          whiteSquareHexColor,
          blackSquareHexColor
        ).map((props, i) => {
          return <Square {...props} key={i} />;
        })}
      </Presentation>
    );
  } else {
    return <></>;
  }
};
