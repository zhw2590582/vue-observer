import { parsePath } from './util';
import Dep, { pushTarget, popTarget } from './dep';

let uid = 0;

export class Watcher {
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

    // 触发getter，收集依赖
    this.value = this.get();
  }

  get() {
    pushTarget(this);
    let value = this.getter.call(this.ctx, this.ctx);
    popTarget();
    return value;
  }

  addDep(dep) {
    const id = dep.id;
    this.dep = dep;
    if (!this.depIds.has(id)) {
      dep.addSub(this);
    }
  }

  update() {
    this.cb.call(this.ctx, this.ctx);
  }
}
