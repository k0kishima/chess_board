import React from 'react';
import { Meta } from '@storybook/react/types-7-0';
import { Piece } from '.';

export default {
  title: 'Piece',
  component: Piece,
} as Meta;

export const WhiteKing: React.VFC = () => {
  return <Piece symbol='K' />;
};

export const BlackKing: React.VFC = () => {
  return <Piece symbol='k' />;
};

export const WhiteQueen: React.VFC = () => {
  return <Piece symbol='Q' />;
};

export const BlackQueen: React.VFC = () => {
  return <Piece symbol='q' />;
};

export const WhiteRook: React.VFC = () => {
  return <Piece symbol='R' />;
};

export const BlackRook: React.VFC = () => {
  return <Piece symbol='r' />;
};

export const WhiteBishop: React.VFC = () => {
  return <Piece symbol='B' />;
};

export const BlackBishop: React.VFC = () => {
  return <Piece symbol='b' />;
};

export const WhiteKnight: React.VFC = () => {
  return <Piece symbol='N' />;
};

export const BlackKnight: React.VFC = () => {
  return <Piece symbol='n' />;
};

export const WhitePawn: React.VFC = () => {
  return <Piece symbol='P' />;
};

export const BlackPawn: React.VFC = () => {
  return <Piece symbol='p' />;
};
