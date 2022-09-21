"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.token = void 0;
const supertest_1 = __importDefault(require("supertest"));
const index_1 = __importDefault(require("../index"));
const request = (0, supertest_1.default)(index_1.default);
const userdata = {
    first_name: 'andriay',
    last_name: 'rowland',
    user_name: 'andra1',
    password: 'rowland123',
    email: 'roland@andria',
    id: 2,
};
exports.token = '';
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
        exports.token = token_pass;
        console.log(exports.token);
    });
    it('GET All users', async () => {
        const response = await request
            .get('/allusers')
            .auth(exports.token, { type: 'bearer' });
        expect(response.status).toBe(200);
        expect(response.body).toBeTruthy();
    });
    it('should return success for READ user by id and authenticate', async () => {
        try {
            const response = await request
                .get(`/getuserByid/${userdata.id}`)
                .auth(exports.token, { type: 'bearer' });
            console.log(exports.token);
            expect(response.status).toBe(200);
            expect(response.body).toBeTruthy();
        }
        catch (error) {
            throw new Error(`unable to create   : ${error.message}`);
        }
    });
});
