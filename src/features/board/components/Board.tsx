import { useState, useEffect } from 'react';

import { Board as Presentation } from '@/components';
import { SquareList } from './SquareList';

export const Container: React.VFC = () => {
  const [height, setHeight] = useState<number>(0);
  const [width, setWidth] = useState<number>(0);

  useEffect(() => {
    setHeight(window.innerHeight);
    setWidth(window.innerWidth);
  }, []);

  if (height && width) {
    const boardVw = height / width > 1 ? 90 : 48;

    return (
      <Presentation boardVw={boardVw} frameHexColor='#333'>
        <SquareList boardVw={boardVw} />
      </Presentation>
    );
  } else {
    return <></>;
  }
};
