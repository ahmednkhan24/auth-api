import supertest from 'supertest';
import app from './app';

const request = supertest(app);

describe('TEST', () => {
  it('should GET root route', async (done) => {
    const response = await request.get('/');
    expect(response.status).toBe(200);
    expect(response.body.hello).toBe('world');
    done();
  });
});
