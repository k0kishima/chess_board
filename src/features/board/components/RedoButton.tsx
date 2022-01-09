import React from 'react';
import styled from 'styled-components';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { boardStore } from '@/features/board/stores';
import { useAppDispatch } from '@/stores/store';
import { useSelector } from '@/stores/store';

export const RedoButton: React.FC = () => {
  const dispatch = useAppDispatch();

  // TODO: デメテルの法則を遵守したい
  const { game } = useSelector((state) => state.board);
  const redoable = game.historyLength() > game.historyOffset + 1;

  const handleClick = () => {
    if (!redoable) {
      return false;
    }
    dispatch(boardStore.actions.redoMovePiece());
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
