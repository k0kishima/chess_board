import { Board } from '@/components/Board';

export type Props = {
  children?: React.ReactNode;
  boardVw: number;
  frameHexColor: string;
};

export const Presentation: React.VFC<Props> = ({
  children,
  frameHexColor,
  boardVw,
}) => {
  return (
    <Board boardVw={boardVw} frameHexColor={frameHexColor}>
      {children}
    </Board>
  );
};
