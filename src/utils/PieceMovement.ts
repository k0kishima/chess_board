/* eslint-disable @typescript-eslint/unbound-method */
import { Position } from '@/entities';
import { ALL_MOVE_DIRECTIONS, MoveDirection } from '@/types';

export const reverseOf = (moveDirection: MoveDirection) => {
  const index =
    (ALL_MOVE_DIRECTIONS.indexOf(moveDirection) +
      ALL_MOVE_DIRECTIONS.length / 2) %
    ALL_MOVE_DIRECTIONS.length;
  return ALL_MOVE_DIRECTIONS[index];
};

export const movablePositionsGetterFor = (moveDirection: MoveDirection) => {
  switch (moveDirection) {
    case '↑':
      return Position.allFrontsFrom;
    case '↗':
      return Position.allUpperRightsFrom;
    case '→':
      return Position.allRightsFrom;
    case '↘':
      return Position.allLowerRightsFrom;
    case '↓':
      return Position.allRearsFrom;
    case '↙':
      return Position.allLowerLeftsFrom;
    case '←':
      return Position.allLeftsFrom;
    case '↖':
      return Position.allUpperLeftsFrom;
  }
};
