import React from 'react';
import styled from 'styled-components';
import { ResetButton } from './ResetButton';

export const Menu: React.FC = () => {
  return (
    <Styled>
      <ResetButton />
    </Styled>
  );
};

const Styled = styled.div`
  margin: 10px;
  padding: 20px;
`;
