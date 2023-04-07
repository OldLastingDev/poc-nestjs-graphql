import { asULID, generateUlid, isValid } from '../ulid';

describe('libs/ulid', () => {
  describe('generateUlid()', () => {
    test('ULID を生成できる。', () => {
      const ulid = generateUlid();

      // Fork from https://regex101.com/library/ik6xZx
      expect(ulid).toMatch(/[0-7][0-9A-HJKMNP-TV-Z]{25}/gm);
    });
  });

  describe('isValid(input)', () => {
    test('ULID 形式の文字列には `true` を返す。`', () => {
      // generated at https://ulid.page/
      const validUlid = '01GXDT9FW9YFY33WXV3Y0VWZBG';
      const result = isValid(validUlid);

      expect(result).toBe(true);
    });
    test('ULID 形式でない文字列には `false` を返す。', () => {
      const invalidUlid = 'hogehogehogehogehogehogeho';
      const result = isValid(invalidUlid);

      expect(result).toBe(false);
    });
  });

  describe('asULID(input)', () => {
    test('ULID 形式の文字列であれば ULID 型を返す。', () => {
      // generated at https://ulid.page/
      const validUlid = '01GXDT9FW9YFY33WXV3Y0VWZBG';
      const result = asULID(validUlid);

      // Fork from https://regex101.com/library/ik6xZx
      expect(result).toMatch(/[0-7][0-9A-HJKMNP-TV-Z]{25}/gm);

      // ULID 型でなければコンパイルエラーがでない
      expect(result._ULIDBrand).toBeUndefined();
    });

    test('ULID 形式の文字列でなければエラーを返す。', () => {
      const invalidUlid = 'hogehogehogehogehogehogeho';

      expect(() => {
        asULID(invalidUlid);
      }).toThrowError();
    });
  });
});
