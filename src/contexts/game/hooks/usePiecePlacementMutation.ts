import { useState } from 'react';
import { King, Position, Queen } from '@official-sashimi/chess-models';
import { PositionedPieces } from '@/types';
import { movePiece } from './movePiece';
import { takePiece } from './takePiece';
import { castling } from './castling';
import { enPassant } from './enPassant';
import { initialPiecePlacement } from '../constants';

const pieceActions = [movePiece, takePiece, castling, enPassant];

export const usePiecePlacementMutation = () => {
  const [piecePlacement, setPiecePlacement] = useState<PositionedPieces>(
    initialPiecePlacement
  );

  // TODO: ユーティリティ型を使ってDRYにすr
  const mutatePiecePlacement = (
    piecePlacement: PositionedPieces,
    from: Position,
    to: Position,
    castlingableSides?: Set<King | Queen>,
    enPassantablePosition?: Position | undefined
  ) => {
    let isSuccess = false;

    pieceActions.forEach((action) => {
      try {
        setPiecePlacement(
          action(
            piecePlacement,
            from,
            to,
            castlingableSides,
            enPassantablePosition
          )
        );
        isSuccess = true;
        return;
      } catch (error) {
        console.error(error);
      }
    });

    return isSuccess;
  };

  return { mutatePiecePlacement, piecePlacement };
};
