import supertest from 'supertest';

import app from '../index';
import { token } from './1-usersapiSpec';
const request = supertest(app);

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
            .auth(token, { type: 'bearer' })
            .send(orderdata);

        expect(response.status).toBe(200);
        expect(response.body).toBeTruthy();
    });

    it('GET All orders', async () => {
        const response = await request
            .get('/allorders')
            .auth(token, { type: 'bearer' });
        expect(response.status).toBe(200);
        expect(response.body).toBeTruthy();
    });

    it(' get order by id', async () => {
        const response = await request
            .get(`/getorderByid/${orderId.id}`)
            .auth(token, { type: 'bearer' });
        expect(response.status).toBe(200);
        expect(response.body).toBeTruthy();
    });

    it('update order ', async () => {
        const response = await request
            .patch('/updateorder')
            .auth(token, { type: 'bearer' })
            .send({ orderdata });

        expect(response.status).toBe(200);
        expect(response.body).toBeTruthy();
    });
});

it('DELETE order by id', async () => {
    const response = await request.get(`/deleteorderByid/${orderId.id}`)
        .auth(token, { type: 'bearer' });
    expect(response.status).toBe(200);
    expect(response.body).toBeTruthy();
});

it('DELETE Product by name', async () => {
    const response = await request.get(
        `/deleteproductByname/${productdata.name}`
    ).auth(token, { type: 'bearer' })
    expect(response.status).toBe(200);
    expect(response.body).toBeTruthy();
});

it('DELETE user by id', async () => {
    const response = await request.get(`/deleteUserByid/${userdata.id}`).auth(token, { type: 'bearer' })
    expect(response.status).toBe(200);
    expect(response.body).toBeTruthy();
});
