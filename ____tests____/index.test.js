import { observe, Watcher } from '../src/index';

let getNewData = () => ({
  a: 'a',
  b: 'b',
  c: {
    d: 'd',
    e: 'e',
    f: {
      g: 'g'
    }
  },
  h: [1, 2, 3, 4]
});

test('对象浅变化', done => {
  let data = getNewData();
  observe(data);
  new Watcher(data, 'a', ctx => {
    expect(data.a).toBe('aa');
    done();
  });

  data.a = 'aa';
});

test('对象深变化', done => {
  let data = getNewData();
  observe(data);
  new Watcher(data, 'c.d', ctx => {
    expect(data.c.d).toBe('dd');
    done();
  });

  data.c.d = 'dd';
});

test('数组浅变化', done => {
  let data = getNewData();
  observe(data);
  new Watcher(
    data,
    ctx => {
		data.h.push(5);
    },
    ctx => {
      expect(data.h.length).toBe(5);
      done();
    }
  );
});
