import { Position } from '@/entities';
import { ALL_FILES, ALL_RANKS } from '@/types';

export const frontPositions = (from: Position): Position[] => {
  return ALL_RANKS.filter((rank) => rank > from.rank).map(
    (rank) => new Position(from.file, rank)
  );
};

export const rearPositions = (from: Position): Position[] => {
  return ALL_RANKS.filter((rank) => rank < from.rank).map(
    (rank) => new Position(from.file, rank)
  );
};

export const leftPositions = (from: Position): Position[] => {
  return ALL_FILES.filter((file) => file < from.file).map(
    (file) => new Position(file, from.rank)
  );
};

export const rightPositions = (from: Position): Position[] => {
  return ALL_FILES.filter((file) => file > from.file).map(
    (file) => new Position(file, from.rank)
  );
};
