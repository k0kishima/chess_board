import { Square } from '@/components';

export type Props = {
  boardVw: number;
};

export const SquareList: React.VFC<Props> = ({ boardVw }: Props) => {
  const quantityPerRow = 8;
  const whiteSquareHexColor = '#eee';
  const blackSquareHexColor = '#555';
  const squareSize = boardVw / quantityPerRow;

  const propsList = [...Array<undefined>(quantityPerRow)]
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

  return propsList.map((props, i) => {
    return <Square {...props} key={i} />;
  });
};
