import { CannotRankupAnyMore, InvalidPositionError, Pawn } from '../Pawn';
import { Position } from '../Position';

describe('Pawn', () => {
  describe('.movablePositionsFrom', () => {
    describe('of white color', () => {
      const whitePawn = new Pawn('White');

      describe('about a position which is between 2 and 7', () => {
        it('should returns an array of positions', () => {
          expect(whitePawn.movablePositionsFrom(new Position('a', 2))).toEqual([
            new Position('a', 3),
          ]);
          expect(whitePawn.movablePositionsFrom(new Position('h', 7))).toEqual([
            new Position('h', 8),
          ]);
        });
      });

      describe('about position which is the greatest rank', () => {
        it('should returns a blank array', () => {
          expect(whitePawn.movablePositionsFrom(new Position('a', 8))).toEqual(
            []
          );
          expect(whitePawn.movablePositionsFrom(new Position('h', 8))).toEqual(
            []
          );
        });
      });

      describe('about position which is the lowest rank', () => {
        it('should throw an exception', () => {
          expect(() => {
            whitePawn.movablePositionsFrom(new Position('a', 1));
          }).toThrowError(new InvalidPositionError());
        });
      });
    });

    describe('of black color', () => {
      const blackPawn = new Pawn('Black');

      describe('about a position which is between 2 and 7', () => {
        it('should returns an array of positions', () => {
          expect(blackPawn.movablePositionsFrom(new Position('h', 2))).toEqual([
            new Position('h', 1),
          ]);
          expect(blackPawn.movablePositionsFrom(new Position('a', 7))).toEqual([
            new Position('a', 6),
          ]);
        });
      });

      describe('about position which is the greatest rank', () => {
        it('should returns a blank array', () => {
          expect(blackPawn.movablePositionsFrom(new Position('h', 1))).toEqual(
            []
          );
          expect(blackPawn.movablePositionsFrom(new Position('a', 1))).toEqual(
            []
          );
        });
      });

      describe('about position which is the lowest rank', () => {
        it('should throw an exception', () => {
          expect(() => {
            blackPawn.movablePositionsFrom(new Position('a', 8));
          }).toThrowError(new InvalidPositionError());
        });
      });
    });
  });

  describe('.attackablePositionsFrom', () => {
    describe('of white color', () => {
      const whitePawn = new Pawn('White');

      describe('about a position which is between 2 and 7', () => {
        it('should returns an array of positions', () => {
          expect(
            whitePawn.attackablePositionsFrom(new Position('a', 2))
          ).toEqual([new Position('b', 3)]);
          expect(
            whitePawn.attackablePositionsFrom(new Position('b', 3))
          ).toEqual([new Position('a', 4), new Position('c', 4)]);
          expect(
            whitePawn.attackablePositionsFrom(new Position('h', 7))
          ).toEqual([new Position('g', 8)]);
        });
      });

      describe('about position which is the greatest rank', () => {
        it('should returns a blank array', () => {
          expect(
            whitePawn.attackablePositionsFrom(new Position('a', 8))
          ).toEqual([]);
          expect(
            whitePawn.attackablePositionsFrom(new Position('h', 8))
          ).toEqual([]);
        });
      });

      describe('about position which is the lowest rank', () => {
        it('should throw an exception', () => {
          expect(() => {
            whitePawn.attackablePositionsFrom(new Position('a', 1));
          }).toThrowError(new InvalidPositionError());
        });
      });
    });

    describe('of black color', () => {
      const blackPawn = new Pawn('Black');

      describe('about a position which is between 2 and 7', () => {
        it('should returns an array of positions', () => {
          expect(
            blackPawn.attackablePositionsFrom(new Position('h', 2))
          ).toEqual([new Position('g', 1)]);
          expect(
            blackPawn.attackablePositionsFrom(new Position('b', 7))
          ).toEqual([new Position('a', 6), new Position('c', 6)]);
          expect(
            blackPawn.attackablePositionsFrom(new Position('a', 7))
          ).toEqual([new Position('b', 6)]);
        });
      });

      describe('about position which is the greatest rank', () => {
        it('should returns a blank array', () => {
          expect(
            blackPawn.attackablePositionsFrom(new Position('h', 1))
          ).toEqual([]);
          expect(
            blackPawn.attackablePositionsFrom(new Position('a', 1))
          ).toEqual([]);
        });
      });

      describe('about position which is the lowest rank', () => {
        it('should throw an exception', () => {
          expect(() => {
            blackPawn.attackablePositionsFrom(new Position('a', 8));
          }).toThrowError(new InvalidPositionError());
        });
      });
    });
  });

  describe('.nextRank', () => {
    describe('of white color', () => {
      const whitePawn = new Pawn('White');

      describe('about a position which is not the greatest rank', () => {
        it('returns the next rank', () => {
          expect(whitePawn.nextRank(1)).toEqual(2);
          expect(whitePawn.nextRank(7)).toEqual(8);
        });
      });

      describe('about a position which is the greatest rank', () => {
        it('should throw an exception', () => {
          expect(() => {
            whitePawn.nextRank(8);
          }).toThrowError(new CannotRankupAnyMore());
        });
      });
    });

    describe('of black color', () => {
      const blackPawn = new Pawn('Black');

      describe('about a position which is not the greatest rank', () => {
        it('returns the next rank', () => {
          expect(blackPawn.nextRank(8)).toEqual(7);
          expect(blackPawn.nextRank(2)).toEqual(1);
        });
      });

      describe('about a position which is the greatest rank', () => {
        it('should throw an exception', () => {
          expect(() => {
            blackPawn.nextRank(1);
          }).toThrowError(new CannotRankupAnyMore());
        });
      });
    });
  });
});
