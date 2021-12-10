import React from 'react';
import { PieceSymbolOfFEN } from '@/types';
import black_bishop from 'assets/images/pieces/black/bishop.svg';
import black_king from 'assets/images/pieces/black/king.svg';
import black_knight from 'assets/images/pieces/black/knight.svg';
import black_pawn from 'assets/images/pieces/black/pawn.svg';
import black_queen from 'assets/images/pieces/black/queen.svg';
import black_rook from 'assets/images/pieces/black/rook.svg';
import white_bishop from 'assets/images/pieces/white/bishop.svg';
import white_king from 'assets/images/pieces/white/king.svg';
import white_knight from 'assets/images/pieces/white/knight.svg';
import white_pawn from 'assets/images/pieces/white/pawn.svg';
import white_queen from 'assets/images/pieces/white/queen.svg';
import white_rook from 'assets/images/pieces/white/rook.svg';

type Props = {
  symbol: PieceSymbolOfFEN;
};

const images: {
  [k in PieceSymbolOfFEN]: React.FC<React.SVGProps<SVGSVGElement>>;
} = {
  B: white_bishop,
  K: white_king,
  N: white_knight,
  P: white_pawn,
  Q: white_queen,
  R: white_rook,
  b: black_bishop,
  k: black_king,
  n: black_knight,
  p: black_pawn,
  q: black_queen,
  r: black_rook,
};

export const Piece: React.VFC<Props> = ({ symbol }: Props) => {
  return <img src={images[symbol]} />;
  //return images[symbol];
};
