import supertest from 'supertest';
import app from '../index';
import { token } from './1-usersapiSpec';
const request = supertest(app);



const productdata = {
    price: 200,
    name: 'Gold',
    seller: 'jack',
};


describe('test products API', () => {
    it('Create product', async () => {
        const response = await request
            .post('/createproduct')
            .auth(token, { type: 'bearer' })
            .send(productdata);

        expect(response.status).toBe(200);
        expect(response.body).toBeTruthy();
    });

    it('GET All products', async () => {
        const response = await request
            .get('/allproducts')

        expect(response.status).toBe(200);
        expect(response.body).toBeTruthy();
    });

    it(' get product by name', async () => {
        const response = await request
            .get('/getproductByname/:name')

        expect(response.status).toBe(200);
        expect(response.body).toBeTruthy();
    });

    it('update Product ', async () => {
        const response = await request
            .patch('/updateproduct')
            .auth(token, { type: 'bearer' })
            .send({ productdata });

        expect(response.status).toBe(200);
        expect(response.body).toBeTruthy();
    });
});