import { Collection, Db, FilterQuery, MongoClient, ObjectId } from "mongodb";
import { id } from "mongodb-typescript";

export class BaseEntity {
  @id _id: string;
}

// tslint:disable-next-line:max-classes-per-file
export class MongoRepository<T extends BaseEntity> {
  collection: string;
  repository: Db;
  repositoryCollection: Collection;

  constructor(collection: string, connection: Db) {
    this.collection = collection;
    this.repository = connection;
    this.repositoryCollection = this.repository.collection(this.collection);
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

  public update(entity: T, updatedValues: object): Promise<any> {
    if (!entity || entity._id) throw Error(`Invalid entity received!`);
    if (!updatedValues) throw Error(`No values to be updated provided`);

    const query = { id: entity._id };
    const updateValues = { $set: updatedValues };

    return this.repositoryCollection
        .findOneAndUpdate(query, updateValues, { upsert: true })
  }

  public findOne(query: FilterQuery<any>): Promise<any> {
    return this.repositoryCollection.findOne(query);
  }

  public findOneById(_id: string): Promise<any> {
    const oId = new ObjectId(_id);
    return this.repositoryCollection.findOne({ _id: oId });
  }

  public find(query: FilterQuery<any>, pagination?: Pagination): Promise<any[]> {
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
