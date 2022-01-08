import React from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { boardSlice } from '../stores/slice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRedo } from '@fortawesome/free-solid-svg-icons';

export const ResetButton: React.FC = () => {
  const dispatch = useDispatch();
  const handleClick = () => {
    if (window.confirm('Are you sure?')) {
      dispatch(boardSlice.actions.reset());
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
  border-radius: 50%;
  box-shadow: 0px 0px 2px #888;
  display: inline-block;
  padding: 0.5em 0.6em;
`;
