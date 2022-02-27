import { MoveDirection } from '@/types';
import { RegularlyMovingPiece } from './Piece';

export class Bishop extends RegularlyMovingPiece {
  moveDirections() {
    return ['↗', '↘', '↙', '↖'] as MoveDirection[];
  }

  toSymbol() {
    return this.color == 'White' ? 'B' : 'b';
  }
}
