/**
 * TODO: Repository について書く
 */
import { IEntity } from "./IEntity";

export interface IRepository<E extends IEntity> {
  save(entity: E): Promise<E>;
}