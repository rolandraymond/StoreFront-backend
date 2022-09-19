"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const products_1 = require("../products");
const dataofproduct = new products_1.prodactlist;
describe("product  list function", () => {
    it("should have an getall function", () => {
        expect(dataofproduct.getall).toBeDefined();
    });
    it("should have a getprodauctByid function", () => {
        expect(dataofproduct.getprodauctByname).toBeDefined();
    });
    it("should have a create function", () => {
        expect(dataofproduct.create).toBeDefined();
    });
    it('you should have a delete function', () => {
        expect(dataofproduct.deleteByname).toBeDefined();
    });
    it('create product  by create modle', async () => {
        const productdata = {
            name: 'tool',
            seller: 'jack',
            price: 200
        };
        const result = await dataofproduct.create(productdata);
        expect(result).toEqual({
            product_id: 2,
            name: 'tool',
            seller: 'jack',
            price: 200
        });
    });
    it('get all products by getall method', async () => {
        const result = await dataofproduct.getall();
        expect(result).toEqual([{
                product_id: 2,
                name: 'tool',
                seller: 'jack',
                price: 200
            }]);
    });
    it('Get product By useing id by show method', async () => {
        const result = await dataofproduct.getprodauctByname("tool");
        expect(result).toEqual({
            product_id: 2,
            name: 'tool',
            seller: 'jack',
            price: 200
        });
    });
    it('delete user by user id using id method', async () => {
        await dataofproduct.deleteByname("tool");
        const result = await dataofproduct.getall();
        expect(result).toEqual([]);
    });
});
