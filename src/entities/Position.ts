import { ALL_FILES, ALL_RANKS, File, Rank } from '@/types';

export class Position {
  readonly file: File;
  readonly rank: Rank;

  constructor(file: File, rank: Rank) {
    this.file = file;
    this.rank = rank;
  }

  static all(): Position[] {
    return ALL_FILES.map((file) =>
      ALL_RANKS.map((rank) => new this(file, rank))
    ).flat();
  }

  static allOfFile(file: File): Position[] {
    return ALL_RANKS.map((rank) => new this(file, rank));
  }

  static allOfRank(rank: Rank): Position[] {
    return ALL_FILES.map((file) => new this(file, rank));
  }

  static allDiagonalsFrom(offset: Position): Position[] {
    return this.all().filter((other) => {
      const distance = offset.distanceFrom(other);
      return distance.rank > 0 && distance.rank === distance.file;
    });
  }

  static allFrontsFrom(offset: Position): Position[] {
    return ALL_RANKS.filter((rank) => rank > offset.rank).map(
      (rank) => new Position(offset.file, rank)
    );
  }

  static allRearsFrom(offset: Position): Position[] {
    return ALL_RANKS.filter((rank) => rank < offset.rank).map(
      (rank) => new Position(offset.file, rank)
    );
  }

  static allLeftsFrom(offset: Position): Position[] {
    return ALL_FILES.filter((file) => file < offset.file).map(
      (file) => new Position(file, offset.rank)
    );
  }

  static allRightsFrom(offset: Position): Position[] {
    return ALL_FILES.filter((file) => file > offset.file).map(
      (file) => new Position(file, offset.rank)
    );
  }

  distanceFrom(other: Position) {
    return {
      rank: Math.abs(other.rank - this.rank),
      file: Math.abs(other.file.charCodeAt(0) - this.file.charCodeAt(0)),
    };
  }

  toString() {
    return `${this.file}${this.rank}`;
  }
}
