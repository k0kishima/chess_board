import React from 'react';
import { ReactSVG } from 'react-svg';

import { PieceSymbolOfFEN } from '@/types';
import BlackBishop from '@/assets/images/pieces/black/bishop.svg';
import BlackKing from '@/assets/images/pieces/black/king.svg';
import BlackKnight from '@/assets/images/pieces/black/knight.svg';
import BlackPawn from '@/assets/images/pieces/black/pawn.svg';
import BlackQueen from '@/assets/images/pieces/black/queen.svg';
import BlackRook from '@/assets/images/pieces/black/rook.svg';
import WhiteBishop from '@/assets/images/pieces/white/bishop.svg';
import WhiteKing from '@/assets/images/pieces/white/king.svg';
import WhiteKnight from '@/assets/images/pieces/white/knight.svg';
import WhitePawn from '@/assets/images/pieces/white/pawn.svg';
import WhiteQueen from '@/assets/images/pieces/white/queen.svg';
import WhiteRook from '@/assets/images/pieces/white/rook.svg';

type Props = {
  symbol: PieceSymbolOfFEN;
};

const images: {
  [k in PieceSymbolOfFEN]: string;
} = {
  B: WhiteBishop,
  K: WhiteKing,
  N: WhiteKnight,
  P: WhitePawn,
  Q: WhiteQueen,
  R: WhiteRook,
  b: BlackBishop,
  k: BlackKing,
  n: BlackKnight,
  p: BlackPawn,
  q: BlackQueen,
  r: BlackRook,
};

export const Piece: React.VFC<Props> = ({ symbol }: Props) => {
  return <ReactSVG src={images[symbol]} />;
};
