const request = require('supertest');
const { createApp, getInitialUsers } = require('./app');

describe('User API', () => {
  let app;

  beforeEach(() => {
    app = createApp(getInitialUsers());
  });

  test('GET /health should return application health', async () => {
    const response = await request(app).get('/health');

    expect(response.status).toBe(200);
    expect(response.body.status).toBe('OK');
    expect(response.body).toHaveProperty('timestamp');
  });

  test('GET /api/users should return all users', async () => {
    const response = await request(app).get('/api/users');

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body).toHaveLength(2);
  });

  test('GET /api/users/:id should return a user', async () => {
    const response = await request(app).get('/api/users/1');

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      id: 1,
      name: 'Alice',
      email: 'alice@example.com'
    });
  });

  test('GET /api/users/:id should return 404 for an unknown user', async () => {
    const response = await request(app).get('/api/users/999');

    expect(response.status).toBe(404);
    expect(response.body).toEqual({ error: 'User not found' });
  });

  test('POST /api/users should create a new user', async () => {
    const newUser = { name: 'Charlie', email: 'charlie@example.com' };
    const response = await request(app).post('/api/users').send(newUser);

    expect(response.status).toBe(201);
    expect(response.body).toMatchObject(newUser);
    expect(response.body).toHaveProperty('id', 3);
  });

  test('POST /api/users should return 400 without email', async () => {
    const response = await request(app).post('/api/users').send({ name: 'Test' });

    expect(response.status).toBe(400);
    expect(response.body).toEqual({ error: 'Name and email required' });
  });

  test('POST /api/users should return 400 without name', async () => {
    const response = await request(app).post('/api/users').send({ email: 'test@example.com' });

    expect(response.status).toBe(400);
    expect(response.body).toEqual({ error: 'Name and email required' });
  });
});
