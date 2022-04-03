import { FenFormatString } from '@/types';

export const isFenFormatString = (value: string): value is FenFormatString => {
  const piecePlacementPattern = '[BbKkNnPpQqRr1-8]{1,8}';
  const piecePlacementEntirePattern = Array(8)
    .fill(piecePlacementPattern)
    .join('/');

  const fenRegExp = new RegExp(
    `^${piecePlacementEntirePattern} [wb]{1} (-|[kKqQ]{1,4}) (-|[a-h][1-8]) ([0-9]|[1-4][0-9]|50) \\d+$`
  );

  return fenRegExp.test(value);
};
