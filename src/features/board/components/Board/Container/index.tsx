import { useState, useEffect } from 'react';
import { createSquaresProps } from '@/utils/squares';
import { Square } from '@/components/Square';
import { Presentation } from '../Presentation';

const FRAME_HEX_COLOR = '#000';
const WHITE_SQUARE_HEX_COLOR = '#fff';
const BLACK_SQUARE_HEX_COLOR = '#111';

export const Container: React.VFC = () => {
  const [height, setHeight] = useState<number>(0);
  const [width, setWidth] = useState<number>(0);

  useEffect(() => {
    setHeight(window.innerHeight);
    setWidth(window.innerWidth);
  }, []);

  if (height && width) {
    const BOARD_VW = height / width > 1 ? 90 : 48;

    return (
      <Presentation frameHexColor={FRAME_HEX_COLOR} boardVw={BOARD_VW}>
        {createSquaresProps(
          BOARD_VW,
          8,
          WHITE_SQUARE_HEX_COLOR,
          BLACK_SQUARE_HEX_COLOR
        ).map((props, i) => {
          return <Square {...props} key={i} />;
        })}
      </Presentation>
    );
  } else {
    return <></>;
  }
};
