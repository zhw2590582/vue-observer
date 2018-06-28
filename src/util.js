// defineProperty 封装
export function def(obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true
  });
}

// 删除数组的某个元素
export function remove(arr, item) {
  if (arr.length) {
    const index = arr.indexOf(item);
    if (index > -1) {
      return arr.splice(index, 1);
    }
  }
}

// 检测是否含有某个属性
const hasOwnProperty = Object.prototype.hasOwnProperty;
export function hasOwn(obj, key) {
  return hasOwnProperty.call(obj, key);
}

// 对象是否存在 __proto__ 属性
export const hasProto = '__proto__' in {};

// 是否对象
export function isObject(obj) {
  return obj !== null && typeof obj === 'object';
}

// 是否纯对象
let _toString = Object.prototype.toString;
export function isPlainObject(obj) {
  return _toString.call(obj) === '[object Object]';
}

// 对象下标解析
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
