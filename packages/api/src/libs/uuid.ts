import { v4 as uuidV4 } from 'uuid';

/**
 * UUID を生成する
 * @returns UUID v4
 */
export function generateUuid(): string {
  return uuidV4();
}
