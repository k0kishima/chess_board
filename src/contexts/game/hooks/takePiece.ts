import { Position } from '@official-sashimi/chess-models';
import { TakablePositionsFactory } from '@official-sashimi/piece-action-position-factories';
import { PositionedPieces } from '@/types';

export const takePiece = (
  piecePlacement: PositionedPieces,
  from: Position,
  to: Position
) => {
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

  const newPiecePlacement = { ...piecePlacement };
  delete newPiecePlacement?.[from.file]?.[from.rank];
  newPiecePlacement?.[to.file]?.[to.rank] = piece;

  return newPiecePlacement;
};
