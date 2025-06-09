import request from 'supertest';
import express from 'express';
import bodyParser from 'body-parser';
import { Server } from 'http';

// Import the app logic
import '../src/app';

// Since the app in app.ts starts the server directly, for proper unit testing, we should refactor the app logic to export the Express app instance without starting the server. For now, this is a placeholder for the test file structure.

describe('RESTful API CRUD Operations', () => {
  let server: Server;
  let app: express.Express;

  beforeAll(() => {
    // Arrange: require the app and start the server
    app = require('../src/app').default || require('../src/app');
    server = app.listen(4000);
  });

  afterAll((done) => {
    // Cleanup
    server.close(done);
  });

  it('should create an item (POST /items)', async () => {
    // Arrange
    const newItem = { name: 'Test Item' };
    // Act
    const response = await request(app).post('/items').send(newItem);
    // Assert
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body.name).toBe('Test Item');
  });

  it('should get all items (GET /items)', async () => {
    // Act
    const response = await request(app).get('/items');
    // Assert
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it('should get a single item (GET /items/:id)', async () => {
    // Arrange
    const newItem = { name: 'Single Item' };
    const postRes = await request(app).post('/items').send(newItem);
    const id = postRes.body.id;
    // Act
    const response = await request(app).get(`/items/${id}`);
    // Assert
    expect(response.status).toBe(200);
    expect(response.body.name).toBe('Single Item');
  });

  it('should update an item (PUT /items/:id)', async () => {
    // Arrange
    const newItem = { name: 'To Update' };
    const postRes = await request(app).post('/items').send(newItem);
    const id = postRes.body.id;
    // Act
    const response = await request(app).put(`/items/${id}`).send({ name: 'Updated' });
    // Assert
    expect(response.status).toBe(200);
    expect(response.body.name).toBe('Updated');
  });

  it('should delete an item (DELETE /items/:id)', async () => {
    // Arrange
    const newItem = { name: 'To Delete' };
    const postRes = await request(app).post('/items').send(newItem);
    const id = postRes.body.id;
    // Act
    const response = await request(app).delete(`/items/${id}`);
    // Assert
    expect(response.status).toBe(204);
  });
});

describe('Phone Letter Combinations', () => {
  let server: Server;
  let app: express.Express;

  beforeAll(() => {
    app = require('../src/app').default || require('../src/app');
    server = app.listen(4001);
  });

  afterAll((done) => {
    server.close(done);
  });

  it('should return all combinations for "23"', async () => {
    // Act
    const response = await request(app).get('/phone-combinations?digits=23');
    // Assert
    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.arrayContaining([
        'ad','ae','af','bd','be','bf','cd','ce','cf'
      ])
    );
  });

  it('should return [] for empty input', async () => {
    // Act
    const response = await request(app).get('/phone-combinations?digits=');
    // Assert
    expect(response.status).toBe(200);
    expect(response.body).toEqual([]);
  });

  it('should return ["a","b","c"] for input "2"', async () => {
    // Act
    const response = await request(app).get('/phone-combinations?digits=2');
    // Assert
    expect(response.status).toBe(200);
    expect(response.body).toEqual(['a','b','c']);
  });
});
