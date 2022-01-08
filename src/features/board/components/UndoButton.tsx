import React from 'react';
import styled from 'styled-components';
import { RootState, useSelector } from '@/stores/store';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch } from 'react-redux';

import { boardSlice } from '../stores/slice';

const selector = ({ board }: RootState) => ({
  historyOffset: board.historyOffset,
});

export const UndoButton: React.FC = () => {
  const { historyOffset } = useSelector(selector);
  const undoable = historyOffset > 0;

  const dispatch = useDispatch();
  const handleClick = () => {
    if (!undoable) {
      return false;
    }
    dispatch(boardSlice.actions.undoMovePiece());
  };

  return (
    <Styled onClick={handleClick}>
      <FontAwesomeIcon
        icon={faArrowLeft}
        className={undoable ? '' : 'fa-disabled'}
      />
    </Styled>
  );
};

const Styled = styled.div`
  background-color: #fff;
  border-radius: 100%;
  box-shadow: 0px 0px 2px #888;
  display: inline-block;
  padding: 0.5em 0.6em;

  .fa-disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;
