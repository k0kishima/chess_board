import { Position } from '@/entities';
import { Color, MoveDirection } from '@/types';

type PositionCompareFunction = (a: Position, b: Position) => number;

export class PositionComparer {
  constructor(private color: Color, private direction: MoveDirection) {}

  getCompareFunction(): PositionCompareFunction {
    return this.color === 'White'
      ? this.getWhiteColorCompareFunction()
      : this.getBlackColorCompareFunction();
  }

  getWhiteColorCompareFunction(): PositionCompareFunction {
    switch (this.direction) {
      case '↑':
        return (a, b) => (a.rank > b.rank ? 1 : -1);
      case '↗':
        return (a, b) => (a.rank > b.rank ? 1 : -1);
      case '→':
        return (a, b) => (a.file > b.file ? 1 : -1);
      case '↘':
        return (a, b) => (a.rank < b.rank ? 1 : -1);
      case '↓':
        return (a, b) => (a.rank < b.rank ? 1 : -1);
      case '↙':
        return (a, b) => (a.rank < b.rank ? 1 : -1);
      case '←':
        return (a, b) => (a.file < b.file ? 1 : -1);
      case '↖':
        return (a, b) => (a.rank > b.rank ? 1 : -1);
    }
  }

  getBlackColorCompareFunction(): PositionCompareFunction {
    switch (this.direction) {
      case '↑':
        return (a, b) => (a.rank < b.rank ? 1 : -1);
      case '↗':
        return (a, b) => (a.rank < b.rank ? 1 : -1);
      case '→':
        return (a, b) => (a.file < b.file ? 1 : -1);
      case '↘':
        return (a, b) => (a.rank > b.rank ? 1 : -1);
      case '↓':
        return (a, b) => (a.rank > b.rank ? 1 : -1);
      case '↙':
        return (a, b) => (a.rank > b.rank ? 1 : -1);
      case '←':
        return (a, b) => (a.file > b.file ? 1 : -1);
      case '↖':
        return (a, b) => (a.rank < b.rank ? 1 : -1);
    }
  }
}
