import {BaseEntity} from "../../../configs/database/RepositoryTemplate";
import has = Reflect.has;
import {BusinessException} from "../../../exceptions/BusinessException";

export class User extends BaseEntity {
  email: string;
  name: string;
  constructor(name: string, email: string) {
    super();
    this.email = email;
    this.name = name;
  }
  convert(param: any): User {
    if(!param.email || !param.name) throw new BusinessException("email and name are mandatory")
    return new User(param.name, param.email)
  }
}
