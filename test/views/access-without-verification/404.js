import test from 'ava';
import setupApp from '../../helpers/server';
import superTest from 'supertest';

test.beforeEach(() => {
  global.app = setupApp();
});

test('displays 404 if bad route called', async t => {
  const res = await superTest(app).get('/as334#$');
  t.is(res.status, 404);
  t.truthy(res.text);
  t.is(res.text.includes('<!DOCTYPE html>'), true);
  t.is(res.text.includes('Oops, we couldn\'t find that page'), true);
});
