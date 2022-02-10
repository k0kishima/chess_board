import { ALL_MOVE_DIRECTIONS, MoveDirection } from '@/types';

export const reverseOf = (moveDirection: MoveDirection) => {
  const index =
    (ALL_MOVE_DIRECTIONS.indexOf(moveDirection) +
      ALL_MOVE_DIRECTIONS.length / 2) %
    ALL_MOVE_DIRECTIONS.length;
  return ALL_MOVE_DIRECTIONS[index];
};
