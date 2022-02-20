import { MoveDirection } from '@/types';
import { RegularlyMovingPiece } from './Piece';

export class Rook extends RegularlyMovingPiece {
  moveDirections() {
    return ['↑', '→', '↓', '←'] as MoveDirection[];
  }

  toSymbol() {
    return this.color == 'White' ? 'R' : 'r';
  }
}
