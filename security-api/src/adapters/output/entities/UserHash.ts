import {BaseEntity} from "../../../configs/database/RepositoryTemplate";
import has = Reflect.has;

export class UserHash extends BaseEntity {
  hash: string;
  constructor(hash:string) {
    super();
    this.hash = hash
  }
}
