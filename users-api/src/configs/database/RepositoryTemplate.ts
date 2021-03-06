import { Collection, Db, FilterQuery, MongoClient, ObjectId } from "mongodb";
import { id } from "mongodb-typescript";

// tslint:disable-next-line:max-classes-per-file
export class BaseEntity {
  @id _id: string;
}

// tslint:disable-next-line:max-classes-per-file
export class MongoRepository<T extends BaseEntity> {
  collection: string;
  repository: Db;
  repositoryCollection: Collection;

  // tslint:disable-next-line:ban-types
  constructor(collection: string, connection: Db) {
    this.collection = collection;
    this.repository = connection;
    this.repositoryCollection = this.repository?.collection(this.collection);
  }

  public create(entity: T): Promise<T> {
    return this.repositoryCollection.insertOne(entity).then((result) => {
      return result.ops[0];
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
    if (!updatedValues) throw Error(`No values to be updated provided`);

    const updateValues = { $set: updatedValues };

    return this.repositoryCollection
        .findOneAndUpdate(query, updateValues, { upsert: false })
  }



  public delete (query: FilterQuery<any>, pagination?: Pagination) : Promise<any>{
    return this.repositoryCollection.deleteOne(query)
  }

  public find(query: FilterQuery<any>, pagination?: Pagination): Promise<T[]> {
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
