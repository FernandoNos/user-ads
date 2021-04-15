import sinon from 'sinon';
import {addFavoriteProduct}  from '../../../src/core/use-cases/UserFavoriteProductsUseCase'
import * as ProductsAPI from '../../../src/adapters/output/clients/ProductsAPI'
import {FavoritedProductsRepository } from "../../../src/adapters/output/database";
import {FavoriteProductsModel} from "../../../src/core/use-cases/models/FavoriteProductsModel";
import {expect} from 'chai'

describe("User actions", function() {
    describe("Add Favorites",function()
    {
        it("should add to existing list of favorites", async function () {
            // specification for RGB to HEX converter
            const findAll_stub = sinon.stub(FavoritedProductsRepository, "findAll").returns(Promise.resolve([FAVORITE_PRODUCT_MODEL]))
            const addFavorite_stub = sinon.stub(FavoritedProductsRepository, "addFavorite").returns(Promise.resolve(UPDATED_FAVORITE_PRODUCT_MODEL))
            const saveFavorite_stub = sinon.stub(FavoritedProductsRepository, "save").returns(Promise.resolve(UPDATED_FAVORITE_PRODUCT_MODEL))
            const getProductDetails_stub = sinon.stub(ProductsAPI, "getProductDetails").returns(Promise.resolve({id: "213"}))
            await addFavoriteProduct('123', 'abc')

            expect(findAll_stub.calledOnce).to.be.true
            expect(addFavorite_stub.calledOnce).to.be.true
            expect(getProductDetails_stub.calledOnce).to.be.true
            expect(saveFavorite_stub.calledOnce).to.be.false
        });
    })
})

const FAVORITE_PRODUCT_MODEL = {
    id:"123",
    ownerId: "123",
    uuid:"123",
    products:[{
        id:"123",
        created_at: new Date()
    }]
} as FavoriteProductsModel

const UPDATED_FAVORITE_PRODUCT_MODEL = {
    id:"123",
    ownerId: "123",
    uuid:"123",
    products:[{
        id:"123",
        created_at: new Date()
    }]
} as FavoriteProductsModel
