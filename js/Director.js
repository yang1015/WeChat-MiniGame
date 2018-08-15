// 导演 控制游戏的逻辑 开始和结束

// 游戏的开始 逻辑

import { DataStore } from "./base/DataStore.js";
import { Resources } from "./base/Resources.js";

export class Director {
    constructor() {
        //console.log("director cons初始化")
        this.dataStore = DataStore.getInstance();
    }


    static getInstance() {
        if (!Director.instance) {
            Director.instance = new Director(); // 如果不存在 就新建
        }
        return Director.instance; // 如果存在就返回存在的那个
    }

    run() {
        this.dataStore.get('background').draw();
        this.dataStore.get('land').draw();
        // requestAnimationFrame(() => this.dataStore.get('land').draw()); // request这个函数需要被循环调用的，这种写法等于只额外多调用了一次
        let landMovingTimer = requestAnimationFrame(() => this.run()); // this永远指向类，箭头函数
        //this.dataStore.put('landMovingTimer', landMovingTimer);
        //cancelAnimationFrame(landMovingTimer); // 当游戏暂停或者停止之后 需要cancel掉这个timer
    }
}