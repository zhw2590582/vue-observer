export function def(obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true
  });
}

export function remove(arr, item) {
  if (arr.length) {
    const index = arr.indexOf(item);
    if (index > -1) {
      return arr.splice(index, 1);
    }
  }
}

const hasOwnProperty = Object.prototype.hasOwnProperty;
export function hasOwn(obj, key) {
  return hasOwnProperty.call(obj, key);
}

export const hasProto = '__proto__' in {};

export function isObject(obj) {
  return obj !== null && typeof obj === 'object';
}

let _toString = Object.prototype.toString;
export function isPlainObject(obj) {
  return _toString.call(obj) === '[object Object]';
}

const bailRE = /[^\w.$]/;
export function parsePath(path) {
  if (bailRE.test(path)) return;
  const segments = path.split('.');
  return function(obj) {
    for (let i = 0; i < segments.length; i++) {
      if (!obj) return;
      obj = obj[segments[i]];
    }
    return obj;
  };
}
