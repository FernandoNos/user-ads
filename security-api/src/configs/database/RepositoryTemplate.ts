import { Collection, Db, FilterQuery, MongoClient, ObjectId } from "mongodb";
import { id } from "mongodb-typescript";

// tslint:disable-next-line:max-classes-per-file
export class BaseEntity {
  @id _id: ObjectId;
}

// tslint:disable-next-line:max-classes-per-file
export class MongoRepository<T extends BaseEntity> {
  collection: string;
  repository: Db;
  repositoryCollection: Collection;
  // tslint:disable-next-line:ban-types
  mapFunction: Function ;

  // tslint:disable-next-line:ban-types
  constructor(collection: string, connection: Db, mapFunction: Function = (param: any) => param) {
    this.collection = collection;
    this.repository = connection;
    this.repositoryCollection = this.repository.collection(this.collection);
    this.mapFunction = mapFunction;
  }

  public create(entity: T): Promise<any> {
    return this.repositoryCollection.insertOne(entity).then((result) => {
      return this.mapFunction(result.ops[0]);
    });
  }

  public updateById(updatedValues: T): Promise<any> {
    const dbId = updatedValues._id.toLocaleString();
    const {_id, ...fields} = updatedValues;

    if (!dbId) throw Error(`Invalid entity received!`);
    if (!fields) throw Error(`No values to be updated provided`);

    const query = { _id: new ObjectId(dbId) };
    const updateValues = { $set: fields };

    return this.repositoryCollection
      .findOneAndUpdate(query, updateValues, { upsert: true, returnOriginal: false })
      .then((result) => {
        return result.value;
      });
  }

  public update(query: any, updatedValues: object): Promise<any> {
    if (!query) throw Error(`Invalid entity received!`);
    if (!updatedValues) throw Error(`No values to be updated provided`);
    const updateValues = { $set: updatedValues };
    // this.repositoryCollection.updateOne(query,updateValues)
    //     .then(result => {
    //       // tslint:disable-next-line:no-console
    //       console.log(result)
    //     })
    return this.repositoryCollection
      .findOneAndUpdate(query, updateValues, { upsert: false, returnOriginal:false })
      .then((result) => {
        return this.mapFunction(result);
      });
  }

  public findOne(query: FilterQuery<T>): Promise<T> {
    return this.repositoryCollection.findOne(query)
        .then((result) => {
          if(result)
            return this.mapFunction(result)
          return {} as T
        })
  }

  public findOneById(_id: string): Promise<any> {
    const oId = new ObjectId(_id);
    return this.repositoryCollection.findOne({ _id: oId });
  }

  public delete (query: FilterQuery<any>, pagination?: Pagination) : void{
    this.repositoryCollection.deleteOne(query)
  }

  public findAll(query: FilterQuery<any>, pagination?: Pagination): Promise<any[]> {
    const skipAndLimit = this.setPagination(pagination);
    const queryResult = this.repositoryCollection.find(query).skip(skipAndLimit[0]).limit(skipAndLimit[1]);

    return new Promise(async (resolve, rejects) => {
      const result: any[] = [];
      while (await queryResult.hasNext()) {
        result.push(await queryResult.next());
      }
      return resolve(result);
    });
  }

  setPagination(pagination?: Pagination): number[] {
    const limit = pagination && pagination.limit && pagination.limit > 0 ? pagination.limit : 10;
    const page = pagination && pagination.page && pagination.page > 0 ? pagination.page - 1 : 0;
    const skip = limit * page;
    return [skip, limit];
  }
}

interface Pagination {
  page?: number;
  limit?: number;
}
