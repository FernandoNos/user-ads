import sinon from 'sinon';
import {expect} from 'chai'
import {createProduct} from '../../../src/core/use-cases/ProductUseCase'
import {ProductRepository} from '../../../src/adapters/output/database'
import {ProductModel} from "../../../src/core/use-cases/models/ProductModel";

describe("Product actions", function() {
    describe("Save product",function()
    {
        it("should finish with success", async function () {
            // specification for RGB to HEX converter
            const save_stub = sinon.stub(ProductRepository, "save").returns(Promise.resolve(PRODUCT_MODEL))
            const findAll_stub = sinon.stub(ProductRepository, "findAll").returns(Promise.resolve([]))
            const result = await createProduct({
                price: 123,
                image: "http://image.com",
                brand: "TEST BRAND",
                title: "TEST TITLE",
                reviewScore: 1
            } as ProductModel)

            expect(findAll_stub.calledOnce).to.be.true
            expect(save_stub.calledOnce).to.be.true
            expect(result).to.be.equal(PRODUCT_MODEL)
        });
    })
})

const PRODUCT_MODEL = {
    id:"123",
    price: 123,
    image: "http://image.com",
    brand: "TEST BRAND",
    title: "TEST TITLE",
    reviewScore: 1
} as ProductModel

