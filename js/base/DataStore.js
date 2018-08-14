// 变量缓存器
// 方便在不同的类中 访问和修改变量


// 应为单例模式
export class DataStore {
    constructor() {
        this.map = new Map(); // 需要销毁的放在map里 需要长期保存的放在原型链中
    }

    static getInstance() { // 静态方法
        if (!DataStore.instance) {
            DataStore.instance = new DataStore();
        }

        return DataStore.instance;
    }

    put(key, value) {
        this.map.set(key, value);
        return this;  // 方便链式调用 返回DataStore本身？

        /*
        *  if (typeof value === 'function') {
        *       value = new value();
        *  }
        *
        *  这样可以更加简化代码，在Main中init背景图的时候，可以省掉new Background()
        *  直接使用this.dataStore.put('background', Background);
        *  // 也太简化了 还是明显点好
        *
        */
    }

    get(key) {
        return this.map.get(key);

    }

    destroy() { // 结束后的销毁
        for (let value of this.map.values()) {
            value = null;
        }
    }
}

