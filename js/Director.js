// 导演 控制游戏的逻辑 开始和结束

// 游戏的开始 逻辑

import {DataStore} from "./base/DataStore.js";
import {Background} from "./runtime/Background.js";

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
        // 这个写法不知为何不行
        // new Background(dataStore.ctx, dataStore.get('background')).draw();

        // this.dataStore.get('background').draw(); // get返回的是background类生成的一个参数为bg-image实体的实例

        const backgroundInstance = this.dataStore.get('background'); // 因为它是不变的
        backgroundInstance.draw();
    }
}