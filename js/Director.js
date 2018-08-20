// 导演 控制游戏的逻辑 开始和结束

// 游戏的开始 逻辑

import { DataStore } from "./base/DataStore.js";
import { Resources } from "./base/Resources.js";
import {UpPencil} from "./runtime/UpPencil.js";
import {DownPencil} from "./runtime/DownPencil.js";

export class Director {
    constructor() {
        //console.log("director cons初始化")
        this.dataStore = DataStore.getInstance();
    }

    createPencilPairs() {
        // 对笔尖高度的限制
        console.log("创建铅笔");
        const minTop = window.innerHeight / 8;
        const maxTop = window.innerHeight / 2;
        const top = minTop + Math.random() * (maxTop - minTop);
        this.dataStore.get('pencils').push(new UpPencil(top));
        this.dataStore.get('pencils').push(new DownPencil(top));

    }

    static getInstance() {
        if (!Director.instance) {
            Director.instance = new Director(); // 如果不存在 就新建
        }
        return Director.instance; // 如果存在就返回存在的那个
    }

    run() {


        this.dataStore.get('background').draw();
        let landMovingTimer;
        const pencils = this.dataStore.get('pencils');


        if (DataStore.getInstance().isGameOver) {
            /* 对要渲染的铅笔数组进行操作 */
            /* 1- 销毁越界铅笔 */
            if (pencils[0].x + pencils[0].width <= 0 // 说明铅笔的右侧边缘已经在x=0的位置了 完全消失出屏幕了
                && pencils.length == 4) { // 每屏两组铅笔
                pencils.shift(); // 把数组的第1个元素(up pencil)推出数组 并且数组长度-1
                pencils.shift(); // 把数组的第2个元素(down pencil)推出数组 并且数组长度-1
            }

            /* 2- 创建新的铅笔对 补成两组4只 */
            if (pencils[0].x <= (window.innerWidth - pencils[0].width) / 2
                && pencils.length == 2) { // 只剩下一组铅笔了
                this.createPencilPairs();
            }

            /* 3- 渲染 */
            pencils.forEach(function(eachPencil){
                eachPencil.draw();
            }) ;

            this.dataStore.get('land').draw();

            this.dataStore.get('birds').draw();


            // requestAnimationFrame(() => this.dataStore.get('land').draw()); // request这个函数需要被循环调用的，这种写法等于只额外多调用了一次
            landMovingTimer = requestAnimationFrame(() => this.run()); // this永远指向类，箭头函数 request类似于setTimeout
            // 由浏览器决定的 不是我们来控制的 性能高于setTimeout和setInterval

            // this.dataStore.get('pencilUp').draw();
            // this.dataStore.get('pencilDown').draw();
            //window.setTimeout(() => this.run(), 10) 虽然能跑
            //this.dataStore.put('landMovingTimer', landMovingTimer);

        } else {
            console.log(pencils)
            pencils.forEach(function(eachPencil){
                eachPencil.draw();
            }) ;

            this.dataStore.get('land').draw();
            cancelAnimationFrame(landMovingTimer); // 当游戏暂停或者停止之后 需要cancel掉这个timer
            this.dataStore.destroy();
        }


    }
}