import {BaseEntity} from "../../../../configs/database/RepositoryTemplate";
import { v4 as uuidv4 } from 'uuid';
import {BusinessException} from "../../../../exceptions/BusinessException";

export class User extends BaseEntity {
  email: string;
  name: string;
  uuid: string;
  admin: boolean;
  created_at: Date;
  updated_at: Date;
  constructor(name: string, email: string, admin: boolean = false, created_at: Date = new Date(), updated_at: Date = new Date()) {
    super();
    this.email = email;
    this.name = name;
    this.uuid = uuidv4();
    this.admin = admin;
    this.created_at = created_at;
    this.updated_at = updated_at;
  }
  convert(param: any): User {
    if(!param.email || !param.name) throw new BusinessException("email and name are mandatory")
    return new User(param.name, param.email, param.admin)
  }
}
