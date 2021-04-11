import {BaseEntity} from "../../../configs/database/RepositoryTemplate";
import { v4 as uuidv4 } from 'uuid';
import {BusinessException} from "../../../exceptions/BusinessException";

export class User extends BaseEntity {
  email: string;
  name: string;
  uuid: string;
  constructor(name: string, email: string) {
    super();
    this.email = email;
    this.name = name;
    this.uuid = uuidv4();
  }
  convert(param: any): User {
    if(!param.email || !param.name) throw new BusinessException("email and name are mandatory")
    return new User(param.name, param.email)
  }
}
