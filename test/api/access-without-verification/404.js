import test from 'ava';
import setupApp from '../../helpers/server';
import superTest from 'supertest';

test.beforeEach(() => {
  global.app = setupApp();
});

test('displays 404 if bad route called', async t => {
  const res = await superTest(app).get('/api/as334#$');
  t.is(res.status, 404);
  t.is(res.body.message, 'route not found');
});
