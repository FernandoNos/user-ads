import {BaseEntity} from "../../../configs/database/RepositoryTemplate";
import {ProductModel} from "../../../core/use-cases/models/ProductModel";
import { v4 as uuidv4 } from 'uuid';

export class Product extends BaseEntity {
  price: number;
  image: string;
  brand: string;
  title: string;
  uuid: string;
  reviewScore: number;

  private constructor(price: number, image: string, brand: string, title: string, reviewScore: number) {
    super();
    this.price = price;
    this.image = image;
    this.brand = brand;
    this.title = title;
    this.reviewScore = reviewScore;
    this.uuid = uuidv4()
  }

  static convert(param: ProductModel): Product {
    return new Product(
        param.price,
        param.image,
        param.brand,
        param.title,
        param.reviewScore
    )
  }
}
