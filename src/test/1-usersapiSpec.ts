import supertest from 'supertest';
import app from '../index';

const request = supertest(app);
const userdata = {
    first_name: 'andriay',
    last_name: 'rowland',
    user_name: 'andra1',
    password: 'rowland123',
    email: 'roland@andria',
    id: 2,
};
export let token = '';


describe('Test ALl EndPoint', () => {
    it('Create user', async () => {
        const response = await request.post('/createUsers').send(userdata);

        expect(response.status).toBe(200);
        expect(response.body).toBeTruthy();
    });

    it('sign_in user', async () => {
        const response = await request.post('/signin').send({
            user_name: userdata.user_name,
            password: userdata.password,
        });
        const { token_pass: token_pass } = response.body.data;
        expect(response.status).toBe(200);
        expect(response.body.data).toBeTruthy();
        token = token_pass;
        console.log(token);
    });
    it('GET All users', async () => {
        const response = await request
            .get('/allusers')
            .auth(token, { type: 'bearer' });
        expect(response.status).toBe(200);
        expect(response.body).toBeTruthy();
    });

    it('should return success for READ user by id and authenticate', async () => {
        try {
            const response = await request
                .get(`/getuserByid/${userdata.id}`)
                .auth(token, { type: 'bearer' });

            console.log(token);
            expect(response.status).toBe(200);
            expect(response.body).toBeTruthy();
        } catch (error) {
            throw new Error(`unable to create   : ${(error as Error).message}`);
        }
    });
});