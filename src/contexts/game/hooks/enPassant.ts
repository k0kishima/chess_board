import { Pawn } from '@official-sashimi/chess-models';
import { PieceAction } from '@/types';

export const enPassant: PieceAction = (
  piecePlacement,
  from,
  to,
  _,
  enPassantablePosition
) => {
  if (enPassantablePosition == undefined) {
    throw Error('en-passantable position is undefined.');
  }
  const piece = piecePlacement?.[from.file]?.[from.rank];
  if (piece == undefined) {
    throw Error('piece not found at the specified position.');
  }
  if (!(piece instanceof Pawn)) {
    throw Error(
      'cannot do en-passant because that the selecting piece is not Pawn'
    );
  }
  if (enPassantablePosition.toString() !== to.toString()) {
    throw Error(
      'cannot do en-passant because that the destination square is not an en-passantable position'
    );
  }

  // アンパッサンの場合は from.file と to.file は必ず異なるものになる
  return {
    ...piecePlacement,
    [from.file]: {
      ...piecePlacement[from.file],
      [from.rank]: undefined,
    },
    [to.file]: {
      ...piecePlacement[to.file],
      [to.rank]: piece,
      [piece.color === 'White' ? 5 : 4]: undefined,
    },
  };
};
