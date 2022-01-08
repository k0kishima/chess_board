import React from 'react';
import Image from 'next/image';

import { pieceImages } from '@/assets/images/pieces';
import { PieceSymbolOfFEN } from '@/types';

type Props = {
  symbol: PieceSymbolOfFEN;
};

export const Piece: React.VFC<Props> = ({ symbol }: Props) => {
  return (
    <Image
      src={pieceImages[symbol]}
      alt={symbol}
      layout='responsive'
      objectFit='contain'
    />
  );
};
