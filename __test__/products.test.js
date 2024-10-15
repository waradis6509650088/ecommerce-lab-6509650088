const request = require('supertest');
const app = require('../app');

describe('GET', () => {
    test('/products => should return all products', async () => {
        const res = await request(app).get('/products');
        const json = await res.body;
        expect(res.statusCode).toBe(200);
        expect(json.length).toBe(2);
    });
    test('/products/:id => should return a product by ID', async () => {
        const res = await request(app).get('/products/1');
        const json = await res.body;
        expect(res.statusCode).toBe(200);
        expect(json.id).toBe(1);
        expect(Object.keys(json).length).toBe(4);
        expect(res.body).toHaveProperty('id','name','price','stock');
    });
    test('/products/:id => should return rescode 404 if not found', async () => {
        const res = await request(app).get('/products/999');
        expect(res.statusCode).toBe(404);
    });
});
describe('POST', () => {

    const postInfo = {
        id: 3,
        name: 'new product',
        price: 999,
        stock: 10
    }

    test('/products => should add a new products', async () => {
        const res = await request(app)
            .post('/products')
            .send(postInfo)
            .set('ContentType','application/json');
        const json = res.body;

        expect(res.statusCode).toBe(201);
        expect(Object.keys(json).length).toBe(4);
        expect(json).toHaveProperty('id','name','price','stock');
        expect(JSON.stringify(json)).toBe(JSON.stringify(postInfo));
    });
});
describe('PUT', () => {

    const putInfo = {
        name: 'new name',
        price: 1,
        stock: 12
    }

    it('products/:id => should update an existing product', async () => {
        const res = await request(app)
            .put('/products/1')
            .send(putInfo)
            .set('ContentType','application/json');
        const json = res.body;

        expect(res.statusCode).toBe(200);
        expect(json).toHaveProperty('id','name','price','stock');
        expect(json.name).toBe('new name');
        expect(json.price).toBe(1);
        expect(json.stock).toBe(12);

        const res2 = await request(app)
            .put('/products/1')
            .send({})
            .set('ContentType','application/json');
        expect(res.statusCode).toBe(200);
        expect(json).toHaveProperty('id','name','price','stock');
        expect(json.name).toBe('new name');
        expect(json.price).toBe(1);
        expect(json.stock).toBe(12);
    });
    it('should return 404 if product not found', async () => {
        const res = await request(app).put('/products/999');
        expect(res.statusCode).toBe(404);
    });
});
describe('DELETE', () => {
    it('should delete a product', async () => {
        const res1 = await request(app).delete('/products/1');
        expect(res1.statusCode).toBe(200);
        expect(res1.body).toHaveProperty('message');

        const res2 = await request(app).delete('/products/2');
        expect(res2.statusCode).toBe(200);
        expect(res2.body).toHaveProperty('message');
    });
    it('should return 404 if product not found', async () => {
        const res = await request(app).delete('/products/300');
        expect(res.statusCode).toBe(404);
        expect(res.body).toHaveProperty('message');
    });
});

