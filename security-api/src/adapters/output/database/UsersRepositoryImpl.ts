import {Db, FilterQuery} from "mongodb";
import {User} from "./entities/User";
import {MongoRepository} from "../../../configs/database/RepositoryTemplate";
import {UserModel} from "../../../core/use-cases/models/UserModel";
export class UsersRepositoryImpl extends MongoRepository<User> {
  constructor(dbConnection: Db) {
    super("users", dbConnection);
  }
  async save(registerModel: UserModel) : Promise<UserModel>{
    const userEntity = new User(registerModel.name, registerModel.email)
    return super.create(userEntity)
        .then(entry => UserModel.convert(entry))
  }

  async findAll(query: any, pagination?: any) : Promise<UserModel[]>{
    return super.find(query, pagination)
        .then(entries => entries.map(entry => UserModel.convert(entry)))
  }

  public updateOne(query: any, updatedValues: object): Promise<UserModel> {
    if (!updatedValues) throw Error(`No values to be updated provided`);

    const updateValues = { $set: updatedValues };

    return this.repositoryCollection.findOneAndUpdate(query, updateValues,{returnOriginal:false})
        .then(result => UserModel.convert(result.value))
  }
}
