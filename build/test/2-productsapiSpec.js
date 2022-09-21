"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const index_1 = __importDefault(require("../index"));
const _1_usersapiSpec_1 = require("./1-usersapiSpec");
const request = (0, supertest_1.default)(index_1.default);
const productdata = {
    price: 200,
    name: 'Gold',
    seller: 'jack',
};
describe('test products API', () => {
    it('Create product', async () => {
        const response = await request
            .post('/createproduct')
            .auth(_1_usersapiSpec_1.token, { type: 'bearer' })
            .send(productdata);
        expect(response.status).toBe(200);
        expect(response.body).toBeTruthy();
    });
    it('GET All products', async () => {
        const response = await request
            .get('/allproducts');
        expect(response.status).toBe(200);
        expect(response.body).toBeTruthy();
    });
    it(' get product by name', async () => {
        const response = await request
            .get('/getproductByname/:name');
        expect(response.status).toBe(200);
        expect(response.body).toBeTruthy();
    });
    it('update Product ', async () => {
        const response = await request
            .patch('/updateproduct')
            .auth(_1_usersapiSpec_1.token, { type: 'bearer' })
            .send({ productdata });
        expect(response.status).toBe(200);
        expect(response.body).toBeTruthy();
    });
});
