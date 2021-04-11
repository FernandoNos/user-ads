import { Db, MongoClient } from "mongodb";
import {User} from "./entities/User";
import {MongoRepository} from "../../configs/database/RepositoryTemplate";
import {UserRegistrationModel} from "../../core/use-cases/models/UserRegistrationModel";
export class UserRegistrationRepositoryImpl extends MongoRepository<User> {
  constructor(dbConnection: Db) {
    super("users", dbConnection, UserRegistrationModel.convert);
  }
  async create(registerModel: UserRegistrationModel) : Promise<UserRegistrationModel>{
    const userEntity = new User(registerModel.name, registerModel.email)
    return super.create(userEntity)
  }
}
