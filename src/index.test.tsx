import { fetch } from './index';
import { mock, restore } from 'fetch-mock';

beforeEach(() => {
  restore();
});

test('loading state', (done) => {
  mock('*', {
    status: 200,
    body: `{"message":"Hello, world!"}`
  }, { delay: 100 });
  fetch(async () => {
    return await global.fetch('https://example.com').then(async res => {
      return (await res.json()) as {
        message: 'Hello, world!';
      };
    });
  })((state) => {
    if (state.state === 'loading') {
      expect(state).toEqual({
        state: 'loading',
      });
      done();
    }
  });
});

test('success state', (done) => {
  mock('*', {
    status: 200,
    body: `{"message":"Hello, world!"}`
  }, { delay: 100 });
  fetch(async () => {
    return await global.fetch('https://example.com').then(async res => {
      return (await res.json()) as {
        message: 'Hello, world!';
      };
    });
  })((state) => {
    if (state.state === 'success') {
      expect(state).toEqual({
        state: 'success',
        response: {
          message: 'Hello, world!'
        }
      });
      done();
    }
  });
});

test('failure state', (done) => {
  mock('*', {
    status: 500,
    body: `{"message":"Internal Server Error"}`
  }, { delay: 100 });
  fetch(async () => {
    return await global.fetch('https://example.com').then(async res => {
      if (200 <= res.status && res.status < 300) {
        console.log('aiaiai');
        return {
          message: 'Hello, world!'
        };
      } else {
        throw {
          message: 'Internal Server Error'
        };
      }
    });
  })<{ message: 'Internal Server Error' }>((state) => {
    if (state.state === 'failure') {
      expect(state).toEqual({
        state: 'failure',
        error: {
          message: 'Internal Server Error'
        }
      });
      done();
    }
  });
});
