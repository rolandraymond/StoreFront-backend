import app from '../index';
import supertest from 'supertest';

const servertest = supertest(app);

describe('test basic server', () => {
  it('test localhost', async () => {
    const response = await servertest.post('/');
    expect(response.status).toBe(200);
  });
});
