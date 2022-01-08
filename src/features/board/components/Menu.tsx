import React from 'react';
import styled from 'styled-components';
import { RedoButton } from './RedoButton';
import { ResetButton } from './ResetButton';
import { UndoButton } from './UndoButton';

export const Menu: React.FC = () => {
  return (
    <Styled>
      <UndoButton />
      <RedoButton />
      <ResetButton />
    </Styled>
  );
};

const Styled = styled.div`
  margin: 10px;
  padding: 20px;
`;
