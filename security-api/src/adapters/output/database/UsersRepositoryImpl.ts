import { Db } from "mongodb";
import {User} from "./entities/User";
import {MongoRepository} from "../../../configs/database/RepositoryTemplate";
import {UserModel} from "../../../core/use-cases/models/UserModel";
export class UsersRepositoryImpl extends MongoRepository<User> {
  constructor(dbConnection: Db) {
    super("users", dbConnection, UserModel.convert);
  }
  async save(registerModel: UserModel) : Promise<UserModel>{
    const userEntity = new User(registerModel.name, registerModel.email)
    return super.create(userEntity)
  }
}
