const request = require('supertest');
const app = require('../app');

describe('GET', () => {
    test('/products => should return all products', async () => {
        const res = await request(app).get('/products');
        const json = await res.body;
        expect(res.statusCode).toBe(200);
        expect(json.length).toBe(2);
    });
    test('/products/: => should return a product by ID', async () => {
        const res = await request(app).get('/products/1');
        const json = await res.body;
        expect(res.statusCode).toBe(200);
        expect(json.id).toBe(1);
        expect(Object.keys(json).length).toBe(4);//single json respond will have only one entry and act as the whole body itself
    });
    test('/products/: => should return rescode 404 if not found', async () => {
        const res = await request(app).get('/products/999');
        expect(res.statusCode).toBe(404);
    });
});
describe('POST', () => {
});

