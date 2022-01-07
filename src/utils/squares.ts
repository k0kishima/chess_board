import { ALL_FILES, ALL_RANKS } from '@/types';

export const createSquaresProps = (
  boardVw: number,
  quantityPerRow: number,
  whiteSquareHexColor: string,
  blackSquareHexColor: string
) => {
  const squareSize = boardVw / quantityPerRow;

  return [...Array<undefined>(quantityPerRow)]
    .map((_, x) => {
      return [...Array<undefined>(quantityPerRow)].map((_, y) => {
        return {
          hexColorCode:
            (x + y) % 2 === 1 ? blackSquareHexColor : whiteSquareHexColor,
          sideLengthByViewPort: squareSize,
        };
      });
    })
    .flat();
};

// NOTE: 代数表記でのポジションを値とした配列を返す
// つまり、こういうのを返す
// 64)['a8', 'b8', 'c8', 'd8', 'e8', 'f8', 'g8', 'h8',
//     'a7', 'b7', 'c7', 'd7', 'e7', 'f7', 'g7', 'h7',
//     'a6', 'b6', 'c6', 'd6', 'e6', 'f6', 'g6', 'h6',
//     ...]
// TODO: テスト追加を検討
export const createPositionStringsIndexedByFlatSquaresArrayIndex = () => {
  const positionStrings: string[] = [];
  [...ALL_RANKS].reverse().forEach((rank) => {
    [...ALL_FILES].forEach((file) => {
      positionStrings.push(`${file}${rank}`);
    });
  });
  return positionStrings;
};
