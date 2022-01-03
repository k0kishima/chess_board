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
