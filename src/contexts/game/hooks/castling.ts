import {
  ALL_FILES,
  ALL_RANKS,
  Color,
  King,
  Position,
  Rook,
  Queen,
} from '@official-sashimi/chess-models';
import { AttackingPositionsFactory } from '@official-sashimi/piece-action-position-factories';
import { PieceAction, PositionedPieces } from '@/types';

const ALL_KING_DESTINATION = ['b1', 'b8', 'g1', 'g8'] as const;
type KingDestination = typeof ALL_KING_DESTINATION[number];

export const castling: PieceAction = (
  piecePlacement,
  from,
  to,
  castlingableSides
) => {
  const piece = piecePlacement?.[from.file]?.[from.rank];
  if (piece == undefined) {
    throw Error('piece not found at the specified position.');
  }
  if (!(piece instanceof King)) {
    throw Error(
      'cannot do castling because that the selecting piece is not King'
    );
  }

  if (!ALL_KING_DESTINATION.includes(to.toString() as KingDestination)) {
    throw new Error('this move is not castling');
  }
  if (!castlingableSides) {
    throw Error('caslingable sides flag is empty');
  }
  const kingDestination = to.toString() as KingDestination;
  if (!canCasling(piece.color, kingDestination, castlingableSides)) {
    throw Error('caslingable sides flag is not');
  }

  const passingPositions = positionsToBePassed(kingDestination);
  const interceptors = Array.from(passingPositions).filter((position) => {
    const piece = piecePlacement?.[position.file]?.[position.rank];
    return piece && !(piece instanceof King) && !(piece instanceof Rook);
  });
  if (interceptors.length > 0) {
    throw Error('cannot casling because of interceptors');
  }

  const beingAttackedPositionStrings = getBeingAttackedPositionStringsOf(
    oppositeColorOf(piece.color),
    piecePlacement
  );
  const shouldNotBeAttackedPositionStrings = Array.from(passingPositions).map(
    (p) => p.toString()
  );
  const difference = shouldNotBeAttackedPositionStrings.filter(
    (val) => !beingAttackedPositionStrings.includes(val)
  );
  if (shouldNotBeAttackedPositionStrings.length !== difference.length) {
    throw Error('cannot casling because of attacking from opposite');
  }

  return piecePlacementMurationStrategyFor(kingDestination)(
    from,
    to,
    piecePlacement
  );
};

const canCasling = (
  color: Color,
  kingDestination: KingDestination,
  castlingableSides: Set<King | Queen>
) => {
  const castlingableSidesArray = Array.from(castlingableSides);
  if (color === 'White') {
    // prettier-ignore
    switch (kingDestination) {
      case 'b1':
        return castlingableSidesArray.find((p) => p.color === 'White' && p instanceof Queen) ? true : false;
      case 'g1':
        return castlingableSidesArray.find((p) => p.color === 'White' && p instanceof King) ? true : false;
      default:
        return false;
    }
  } else {
    // prettier-ignore
    switch (kingDestination) {
      case 'b8':
        return castlingableSidesArray.find((p) => p.color === 'Black' && p instanceof Queen) ? true : false;
      case 'g8':
        return castlingableSidesArray.find((p) => p.color === 'Black' && p instanceof King) ? true : false;
      default:
        return false;
    }
  }
};

const positionsToBePassed = (kingDestination: KingDestination) => {
  // prettier-ignore
  switch(kingDestination) {
    case 'b1':
      return new Set([new Position('e', 1), new Position('d', 1), new Position('c', 1), new Position('b', 1)])
    case 'g1':
      return new Set([new Position('e', 1), new Position('f', 1), new Position('g', 1)])
    case 'b8':
      return new Set([new Position('e', 8), new Position('d', 8), new Position('c', 8), new Position('b', 8)])
    case 'g8':
      return new Set([new Position('e', 8), new Position('f', 8), new Position('g', 8)])
  }
};

const oppositeColorOf = (color: Color) => {
  return color === 'White' ? 'Black' : 'White';
};

const getBeingAttackedPositionStringsOf = (
  color: Color,
  piecePlacement: PositionedPieces
): string[] => {
  return ALL_FILES.map((file) => {
    return ALL_RANKS.map((rank) => {
      const piece = piecePlacement[file]?.[rank];

      // eslint-disable-next-line eqeqeq
      if (piece == undefined) {
        return [];
      }
      if (piece.color !== color) {
        return [];
      }

      return Array.from(
        AttackingPositionsFactory.create({
          subject: piece,
          in: piecePlacement,
          at: new Position(file, rank),
        })
      );
    }).flat();
  })
    .flat()
    .map((p) => p.toString());
};

const piecePlacementMurationStrategyFor = (
  kingDestination: KingDestination
) => {
  const moveKing = (
    from: Position,
    to: Position,
    piecePlacement: PositionedPieces
  ) => {
    // TODO: この場合は from.file と to.file は必ず異なるものになるのだが暗黙的にその文脈を持つべきではないので要修正
    const piece = piecePlacement[from.file]?.[from.rank];
    return {
      ...piecePlacement,
      [from.file]: {
        ...piecePlacement[from.file],
        [from.rank]: undefined,
      },
      [to.file]: {
        ...piecePlacement[to.file],
        [to.rank]: piece,
      },
    };
  };

  // prettier-ignore
  switch(kingDestination) {
    case 'b1':
      return (from: Position, to: Position, piecePlacement: PositionedPieces) => {
        const newPiecePlacement = moveKing(from, to, piecePlacement)
        return {
          ...newPiecePlacement,
          'a': {
            ...newPiecePlacement['a'],
            1: undefined
          },
          'c': {
            ...newPiecePlacement['c'],
            1: new Rook('White')
          }
        }
      }
    case 'g1':
      return (from: Position, to: Position, piecePlacement: PositionedPieces) => {
        const newPiecePlacement = moveKing(from, to, piecePlacement)
        return {
          ...newPiecePlacement,
          'h': {
            ...newPiecePlacement['h'],
            1: undefined
          },
          'f': {
            ...newPiecePlacement['f'],
            1: new Rook('White')
          }
        }
      }
    case 'b8':
      return (from: Position, to: Position, piecePlacement: PositionedPieces) => {
        const newPiecePlacement = moveKing(from, to, piecePlacement)
        return {
          ...newPiecePlacement,
          'a': {
            ...newPiecePlacement['a'],
            8: undefined
          },
          'c': {
            ...newPiecePlacement['c'],
            8: new Rook('Black')
          }
        }
      }
    case 'g8':
      return (from: Position, to: Position, piecePlacement: PositionedPieces) => {
        const newPiecePlacement = moveKing(from, to, piecePlacement)
        return {
          ...newPiecePlacement,
          'h': {
            ...newPiecePlacement['h'],
            8: undefined
          },
          'f': {
            ...newPiecePlacement['f'],
            8: new Rook('Black')
          }
        }
      }
  }
};
