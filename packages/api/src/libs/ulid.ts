/**
 * アプリケーション内で ULID を操作するための関数群です。
 * ラップしておくことで、ULID を生成するライブラリを変更するようなことがあっても変更箇所をこのファイル内のみに抑えることができます。
 * @see https://github.com/ulid/spec
 */

import { ulid } from 'ulid';

export type ULID = string & {
  // brand pattern for TyepScript
  // https://github.com/microsoft/TypeScript/blob/7b48a182c05ea4dea81bab73ecbbe9e013a79e99/src/compiler/types.ts#L693-L698
  _ULIDBrand: never;
};

// fork from https://regex101.com/library/ik6xZx
// see also: https://github.com/ulid/spec#encoding
const ULID_REGEXP = /[0-7][0-9A-HJKMNP-TV-Z]{25}/gm;

export function generateUlid(): ULID {
  return ulid() as unknown as ULID;
}

export function isValid(input: string): boolean {
  return ULID_REGEXP.test(input);
}

/**
 * ULID 型へ変換する
 * @throws ULID の形式でない場合
 */
export function asULID(input: string): ULID {
  if (isValid(input) === false) {
    throw new Error(`[ulid] Can't parse as ULID: ${input}`);
  }

  return input as unknown as ULID;
}
