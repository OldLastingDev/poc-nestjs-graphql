/**
 * TODO: このファイルの正しい置き場所はどこだろう？
 */

import type { ULID } from 'src/libs/ulid';

/**
 * Entity を表すクラスに実装されるべき機能
 */
export interface IEntity {
  readonly _id: number;
  readonly ulid: ULID;
  readonly createdAt: Date;
  readonly updatedAt: Date;
  readonly deletedAt?: Date;

  hasPerpetuated(): boolean;

  /** 論理削除 */
  trash(): void;
  /** 論理削除から復元 */
  untrash(): void;
  /** 論理削除状態か否か */
  hasTrashed(): boolean;
}
