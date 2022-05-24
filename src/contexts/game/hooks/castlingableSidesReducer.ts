import { King, Position, Rook, Queen } from '@official-sashimi/chess-models';
import { PositionedPieces } from '@/types';

export const castlingableSidesReducer = (
  castlingableSides: Set<King | Queen>,
  piecePlacement: PositionedPieces,
  from: Position,
  to: Position
) => {
  const movedPiece = piecePlacement[to?.file]?.[to?.rank];
  if (movedPiece == undefined) {
    return castlingableSides;
  }
  switch (true) {
    case movedPiece instanceof King:
      return new Set(
        Array.from(castlingableSides).filter(
          (p) => !(p.color === movedPiece.color)
        )
      );
    case movedPiece instanceof Rook:
      switch (true) {
        case from.file === 'a' && from.rank === 1:
          return new Set(
            Array.from(castlingableSides).filter(
              (p) => !(p.color === 'White' && p instanceof Queen)
            )
          );
        case from.file === 'h' && from.rank === 1:
          return new Set(
            Array.from(castlingableSides).filter(
              (p) => !(p.color === 'White' && p instanceof King)
            )
          );
        case from.file === 'a' && from.rank === 8:
          return new Set(
            Array.from(castlingableSides).filter(
              (p) => !(p.color === 'Black' && p instanceof Queen)
            )
          );
        case from.file === 'h' && from.rank === 8:
          return new Set(
            Array.from(castlingableSides).filter(
              (p) => !(p.color === 'Black' && p instanceof King)
            )
          );
        default:
          return castlingableSides;
      }
    default:
      return castlingableSides;
  }
};
