import { Pawn, Position } from '@official-sashimi/chess-models';
import { PositionedPieces } from '@/types';

export const enPassantablePositionReducer = (
  piecePlacement: PositionedPieces,
  from: Position,
  to: Position
) => {
  const movedPiece = piecePlacement[to?.file]?.[to?.rank];
  if (movedPiece == undefined) {
    return undefined;
  }
  if (!(movedPiece instanceof Pawn)) {
    return undefined;
  }

  // TODO: moveが成功した文脈を暗黙的に持ってしまっているので
  if (movedPiece.color == 'White') {
    return from.rank == 2 && to.rank == 4
      ? new Position(from.file, 3)
      : undefined;
  } else {
    return from.rank == 7 && to.rank == 5
      ? new Position(from.file, 6)
      : undefined;
  }
};
