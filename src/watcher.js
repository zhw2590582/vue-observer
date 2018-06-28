import { parsePath } from './util';
import Dep, { pushTarget, popTarget } from './dep';

let uid = 0;

export class Watcher {
  // ctx: 上下文
  // expOrFn: 触发上下文变化的函数，或者指定某个元素的下标
  // cd：数据发生变化后的回调函数
  constructor(ctx, expOrFn, cb) {
    this.ctx = ctx;
    this.cb = cb;
    this.id = ++uid;
    this.deps = [];
    this.depIds = new Set();

    // 函数可以做到全覆盖监听，字符串只能指定监听
    if (typeof expOrFn === 'function') {
      this.getter = expOrFn;
    } else {
      this.getter = parsePath(expOrFn);
    }

    // 实例化后马上触发getter，收集依赖
    this.value = this.get();
  }

  get() {
    pushTarget(this);
    let value = this.getter.call(this.ctx, this.ctx);
    popTarget();
    return value;
  }

  // 在 watcher 中保存 dep ，也在dep中保存 watcher
  addDep(dep) {
    const id = dep.id;
    this.dep = dep;
    if (!this.depIds.has(id)) {
      dep.addSub(this);
    }
  }

  // 触发回调函数
  update() {
    this.cb.call(this.ctx, this.ctx);
  }
}
