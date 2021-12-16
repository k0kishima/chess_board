import React from 'react';
import styled from 'styled-components';

type Props = {
  children?: React.ReactNode;
  hexColorCode: string; // todo: Color パッケージを使う
  sideLengthByViewPort: number;
};

export const Square: React.VFC<Props> = ({
  children,
  hexColorCode,
  sideLengthByViewPort,
}: Props) => {
  const Styled = styled.div`
    background-color: ${hexColorCode};
    width: ${sideLengthByViewPort}vw;
    height: ${sideLengthByViewPort}vw;

    div {
      transform: translate(0, 0);
    }

    img {
      width: 100%;
    }
  `;

  return <Styled>{children}</Styled>;
};
