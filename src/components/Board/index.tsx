import React from 'react';
import styled from 'styled-components';

export type Props = {
  children?: React.ReactNode;
  boardVw: number;
  frameHexColor: string;
};

export const Board: React.VFC<Props> = ({
  children,
  boardVw,
  frameHexColor,
}: Props) => {
  const Styled = styled.div`
    border: 1vw solid ${frameHexColor};
    display: flex;
    flex-wrap: wrap;
    height: ${boardVw}vw;
    margin: 20px auto;
    width: ${boardVw}vw;
  `;

  return <Styled>{children}</Styled>;
};
