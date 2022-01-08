import React from 'react';
import styled from 'styled-components';
import { RootState, useSelector } from '@/stores/store';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch } from 'react-redux';

import { boardSlice } from '../stores/slice';

const selector = ({ board }: RootState) => ({
  history: board.history,
  historyOffset: board.historyOffset,
});

export const RedoButton: React.FC = () => {
  const { history, historyOffset } = useSelector(selector);
  const redoable = history.length > historyOffset + 1;

  const dispatch = useDispatch();
  const handleClick = () => {
    if (!redoable) {
      return false;
    }
    dispatch(boardSlice.actions.redoMovePiece());
  };

  return (
    <Styled onClick={handleClick}>
      <FontAwesomeIcon
        icon={faArrowRight}
        className={redoable ? '' : 'fa-disabled'}
      />
    </Styled>
  );
};

const Styled = styled.div`
  margin-left: 50px;
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
