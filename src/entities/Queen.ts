import { MoveDirection } from '@/types';
import { RegularlyMovingPiece } from './Piece';

export class Queen extends RegularlyMovingPiece {
  moveDirections() {
    return ['↑', '↗', '→', '↘', '↓', '↙', '←', '↖'] as MoveDirection[];
  }

  toSymbol() {
    return this.color == 'White' ? 'Q' : 'q';
  }
}
