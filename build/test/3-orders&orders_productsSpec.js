"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const index_1 = __importDefault(require("../index"));
const _1_usersapiSpec_1 = require("./1-usersapiSpec");
const request = (0, supertest_1.default)(index_1.default);
const userdata = { id: 2 };
const productdata = {
    price: 200,
    name: 'Gold',
    seller: 'jack',
};
const orderdata = {
    users_id: 2,
    status: 'open',
};
const orderId = { id: 1 };
// let token = '';
describe('test orders API', () => {
    it('Create order', async () => {
        const response = await request
            .post('/createOrder')
            .auth(_1_usersapiSpec_1.token, { type: 'bearer' })
            .send(orderdata);
        expect(response.status).toBe(200);
        expect(response.body).toBeTruthy();
    });
    it('GET All orders', async () => {
        const response = await request
            .get('/allorders')
            .auth(_1_usersapiSpec_1.token, { type: 'bearer' });
        expect(response.status).toBe(200);
        expect(response.body).toBeTruthy();
    });
    it(' get order by id', async () => {
        const response = await request
            .get(`/getorderByid/${orderId.id}`)
            .auth(_1_usersapiSpec_1.token, { type: 'bearer' });
        expect(response.status).toBe(200);
        expect(response.body).toBeTruthy();
    });
    it('update order ', async () => {
        const response = await request
            .patch('/updateorder')
            .auth(_1_usersapiSpec_1.token, { type: 'bearer' })
            .send({ orderdata });
        expect(response.status).toBe(200);
        expect(response.body).toBeTruthy();
    });
});
it('DELETE order by id', async () => {
    const response = await request.get(`/deleteorderByid/${orderId.id}`)
        .auth(_1_usersapiSpec_1.token, { type: 'bearer' });
    expect(response.status).toBe(200);
    expect(response.body).toBeTruthy();
});
it('DELETE Product by name', async () => {
    const response = await request.get(`/deleteproductByname/${productdata.name}`).auth(_1_usersapiSpec_1.token, { type: 'bearer' });
    expect(response.status).toBe(200);
    expect(response.body).toBeTruthy();
});
it('DELETE user by id', async () => {
    const response = await request.get(`/deleteUserByid/${userdata.id}`).auth(_1_usersapiSpec_1.token, { type: 'bearer' });
    expect(response.status).toBe(200);
    expect(response.body).toBeTruthy();
});
