import React from 'react';
import styled from 'styled-components';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { boardStore } from '@/features/board/stores';
import { useAppDispatch } from '@/stores/store';
import { useSelector } from '@/stores/store';

export const UndoButton: React.FC = () => {
  const dispatch = useAppDispatch();

  // TODO: デメテルの法則を遵守したい
  const { game } = useSelector((state) => state.board);

  const handleClick = () => {
    if (!game.undoable()) {
      return false;
    }
    dispatch(boardStore.actions.undoMovePiece());
  };

  return (
    <Styled onClick={handleClick}>
      <FontAwesomeIcon
        icon={faArrowLeft}
        className={game.undoable() ? '' : 'fa-disabled'}
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
