import test from 'ava';
import setupApp from '../../helpers/server';
import superTest from 'supertest';

test.beforeEach(() => {
  global.app = setupApp();
});

test('redirects user to login page from home if not logged in', async t => {
  const res = await superTest(app).get('/');
  t.is(res.status, 302);
  t.is(res.redirect, true);
});

test('redirects user to login page from history if not logged in', async t => {
  const res = await superTest(app).get('/history');
  t.is(res.status, 302);
  t.is(res.redirect, true);
});

test('redirects user to login page from history-map if not logged in', async t => {
  const res = await superTest(app).get('/history-map');
  t.is(res.status, 302);
  t.is(res.redirect, true);
});

test('redirects user to login page from profile if not logged in', async t => {
  const res = await superTest(app).get('/profile');
  t.is(res.status, 302);
  t.is(res.redirect, true);
});
