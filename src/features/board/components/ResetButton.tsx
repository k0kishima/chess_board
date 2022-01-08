import React from 'react';
import styled from 'styled-components';
import { faRedo } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { boardStore } from '@/features/board/stores';
import { useAppDispatch } from '@/stores/store';

export const ResetButton: React.FC = () => {
  const dispatch = useAppDispatch();
  const handleClick = () => {
    if (window.confirm('Are you sure?')) {
      dispatch(boardStore.actions.reset());
    }
  };

  return (
    <Styled onClick={handleClick}>
      <FontAwesomeIcon icon={faRedo} />
    </Styled>
  );
};

const Styled = styled.div`
  float: right;
  background-color: #fff;
  border-radius: 100%;
  box-shadow: 0px 0px 2px #888;
  display: inline-block;
  padding: 0.5em 0.6em;
`;
