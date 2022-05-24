import { MovablePositionsFactory } from '@official-sashimi/piece-action-position-factories';
import { PieceAction } from '@/types';

export const movePiece: PieceAction = (piecePlacement, from, to) => {
  const piece = piecePlacement?.[from.file]?.[from.rank];
  if (piece == undefined) {
    throw Error('piece not found at the specified position.');
  }
  const movablePositions = MovablePositionsFactory.create({
    subject: piece,
    in: piecePlacement,
    at: from,
  });

  const positionStrings = Array.from(movablePositions).map((position) =>
    position.toString()
  );
  if (!positionStrings.includes(to.toString())) {
    throw Error('the piece cannot move to specified position.');
  }

  const newPiecePlacement = {
    ...piecePlacement,
    [from.file]: {
      ...piecePlacement[from.file],
      [from.rank]: undefined,
    },
  };

  return {
    ...newPiecePlacement,
    [to.file]: {
      ...newPiecePlacement[to.file],
      [to.rank]: piece,
    },
  };
};
