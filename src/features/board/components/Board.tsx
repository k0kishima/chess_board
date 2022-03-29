import { useState, useEffect } from 'react';

import { Board as Presentation } from '@/components';

export const Container: React.VFC = () => {
  const [height, setHeight] = useState<number>(0);
  const [width, setWidth] = useState<number>(0);

  useEffect(() => {
    setHeight(window.innerHeight);
    setWidth(window.innerWidth);
  }, []);

  if (height && width) {
    const BOARD_VW = height / width > 1 ? 90 : 48;

    return <Presentation boardVw={BOARD_VW} frameHexColor='#000' />;
  } else {
    return <></>;
  }
};
