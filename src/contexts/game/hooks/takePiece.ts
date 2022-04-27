import { TakablePositionsFactory } from '@official-sashimi/piece-action-position-factories';
import { PieceAction } from '@/types';

export const takePiece: PieceAction = (piecePlacement, from, to) => {
  const piece = piecePlacement?.[from.file]?.[from.rank];
  if (piece == undefined) {
    throw Error('piece not found at the specified position.');
  }
  const takablePositions = TakablePositionsFactory.create({
    subject: piece,
    in: piecePlacement,
    at: from,
  });

  const positionStrings = Array.from(takablePositions).map((position) =>
    position.toString()
  );
  if (!positionStrings.includes(to.toString())) {
    throw Error('the piece cannot take at specified position.');
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
