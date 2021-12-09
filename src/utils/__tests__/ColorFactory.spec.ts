import { ColorFactory } from '../ColorFactory';

describe('ColorFactory', () => {
  describe('.create', () => {
    it('should returns a piece color', () => {
      expect(ColorFactory.create('P')).toEqual('White');
      expect(ColorFactory.create('p')).toEqual('Black');
    });
  });
});
