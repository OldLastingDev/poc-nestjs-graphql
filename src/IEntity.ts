export interface IEntity {
  readonly uuid: string;
  readonly createdAt: number;
  readonly updatedAt: number;

  /** 論理削除 */
  trash(): void;
  /** 論理削除から復元 */
  untrash(): void;
  /** 論理削除状態か否か */
  hasTrashed(): boolean;
}
