import { useState } from 'react';
import {
  Bishop,
  King,
  Knight,
  Pawn,
  Position,
  Rook,
  Queen,
} from '@official-sashimi/chess-models';
import { PositionedPieces } from '@/types';
import { movePiece } from './movePiece';
import { takePiece } from './takePiece';

const pieceActions = [movePiece, takePiece];

export const usePiecePlacementMutation = () => {
  const [piecePlacement, setPiecePlacement] = useState<PositionedPieces>({
    a: {
      1: new Rook('White'),
      2: new Pawn('White'),
      7: new Pawn('Black'),
      8: new Rook('Black'),
    },
    b: {
      1: new Knight('White'),
      2: new Pawn('White'),
      7: new Pawn('Black'),
      8: new Knight('Black'),
    },
    c: {
      1: new Bishop('White'),
      2: new Pawn('White'),
      7: new Pawn('Black'),
      8: new Bishop('Black'),
    },
    d: {
      1: new Queen('White'),
      2: new Pawn('White'),
      7: new Pawn('Black'),
      8: new Queen('Black'),
    },
    e: {
      1: new King('White'),
      2: new Pawn('White'),
      7: new Pawn('Black'),
      8: new King('Black'),
    },
    f: {
      1: new Bishop('White'),
      2: new Pawn('White'),
      7: new Pawn('Black'),
      8: new Bishop('Black'),
    },
    g: {
      1: new Knight('White'),
      2: new Pawn('White'),
      7: new Pawn('Black'),
      8: new Knight('Black'),
    },
    h: {
      1: new Rook('White'),
      2: new Pawn('White'),
      7: new Pawn('Black'),
      8: new Rook('Black'),
    },
  });

  const mutatePiecePlacement = (from: Position, to: Position): void => {
    pieceActions.forEach((action) => {
      try {
        setPiecePlacement(action(piecePlacement, from, to));
        return;
      } catch (error) {
        console.error(error);
      }
    });
  };

  return { mutatePiecePlacement, piecePlacement };
};
