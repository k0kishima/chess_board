import React from 'react';
import styled from 'styled-components';

type Props = {
  children?: React.ReactNode;
  hexColorCode: string; // todo: Color パッケージを使う
  sideLengthByViewPort: number;
  isSelecting?: boolean;
};

export const Square: React.VFC<Props> = ({
  children,
  hexColorCode,
  sideLengthByViewPort,
  isSelecting,
}: Props) => {
  return (
    <Styled
      style={{
        backgroundColor: hexColorCode,
        width: `${sideLengthByViewPort}vw`,
        height: `${sideLengthByViewPort}vw`,
      }}
    >
      <div className={isSelecting ? 'selecting' : ''}>{children}</div>
    </Styled>
  );
};

const Styled = styled.div`
  div {
    transform: translate(0, 0);
  }

  img {
    width: 100%;
  }

  .selecting {
    opacity: 0.6;
  }
`;
