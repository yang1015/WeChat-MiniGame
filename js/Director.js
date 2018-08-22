// 导演 控制游戏的逻辑 开始和结束

// 游戏的开始 逻辑

import {DataStore} from "./base/DataStore.js";
import {Resources} from "./base/Resources.js";
import {UpPencil} from "./runtime/UpPencil.js";
import {DownPencil} from "./runtime/DownPencil.js";

export class Director {
    constructor() {
        //console.log("director cons初始化")
        this.dataStore = DataStore.getInstance();
    }

    createPencilPairs() {
        // 对笔尖高度的限制
        // console.log("创建铅笔");
        const minTop = window.innerHeight / 8;
        const maxTop = window.innerHeight / 2;
        const top = minTop + Math.random() * (maxTop - minTop); // 取随机值
        this.dataStore.get('pencils').push(new UpPencil(top));
        this.dataStore.get('pencils').push(new DownPencil(top));
    }

    drawPencils() {

        const pencils = this.dataStore.get('pencils'); // 获取dataStore里的pencils数组
        /* 对要渲染的铅笔数组进行操作 */

        /* 1- 销毁越界铅笔 */
        if (pencils[0].x + pencils[0].width <= 0 // 说明铅笔的右侧边缘已经在x=0的位置了 完全消失出屏幕了
            && pencils.length == 4) { // 避免第一次生成的两支铅笔直接被推出 数组为空了。所以规定当4支的时候 才推出前两支铅笔
            pencils.shift(); // 把数组的第1个元素(up pencil)推出数组 并且数组长度-1
            pencils.shift(); // 把数组的第2个元素(down pencil)推出数组 并且数组长度-1
        }

        /* 2- 创建新的铅笔对 补成两组4只 */
        if (pencils[0].x <= (window.innerWidth - pencils[0].width) / 2
            && pencils.length == 2) { // 只剩下一组铅笔了
            this.createPencilPairs();
        }

        /* 3- 渲染 */
        pencils.forEach(function (eachPencil) {
            eachPencil.draw();
        });
    }

    /* 判断小鸟是否撞击了地板和铅笔*/
    check() {
        /* 是否撞击地板 */
        // 看小鸟移动到的y坐标 - 小鸟的height 是否等于 land的y坐标
        // console.log("here")
        const birds = this.dataStore.get('birds');
        const land = this.dataStore.get('land');
        const pencils = this.dataStore.get('pencils');

        if (birds.birdsPositionY[0] + birds.birdsPositionHeight[0] >= land.y) {
            // console.log("撞击了");
            this.dataStore.isGameOver = true;
            return;
        }

        // const birdsBorder = {
        //     top: birds.y[0],
        //     bottom: birds.birdsPositionY[0] + birds.birdsPositionHeight[0],
        //     left: birds.birdsPositionX[0],
        //     right: birds.birdsPositionX[0] + birds.birdsPositionWidth[0]
        // }

        for (let i = 0; i < pencils.length; i++) {
            let currentPencil = pencils[i];
            if (Director.ifBirdsHitPencils(birds, currentPencil)) {
                console.log("check: " + this.dataStore.isGameOver)
                this.dataStore.isGameOver = true; // 游戏结束
                return;
            }
            // const currentPencilBorder = {
            //     top: currentPencil.y,
            //     bottom: currentPencil.y + currentPencil.height,
            //     left: currentPencil.x,
            //     right: currentPencil.x + currentPencil.width
            // }
            // if (this.ifBirdsHitPencils(birdsBorder, currentPencilBorder)) {
            //     console.log("hit");
            //     this.dataStore.isGameOver = true;
            //     return;
            // }

        }
    }


    // ifBirdsHitPencils(bird, pencil) {
    static ifBirdsHitPencils(birds, currentPencil) {
        let res = false;
        if (birds.y[0] > currentPencil.y + currentPencil.height // 小鸟的上和铅笔的下
            || birds.birdsPositionY[0] + birds.birdsPositionHeight[0] < currentPencil.y // 小鸟的下和铅笔的上
            || birds.birdsPositionX[0] > currentPencil.x + currentPencil.width
            || birds.birdsPositionX[0] + birds.birdsPositionWidth[0] > currentPencil.x // 小鸟的右和铅笔的左
        ) {
            console.log("触碰了");
            res = true;
        }
        // if (bird.top >= pencil.bottom
        // || bird.bottom <= pencil.top
        // || bird.right <= pencil.left
        // || bird.left >= pencil.right) {
        //     console.log("撞击了")
        //     res = true;
        // }

        return !res;

    }

    birdsTouchEvent() {
        console.log('向上飞')
        for (let i = 0; i <= 2; i++) {
            this.dataStore.get('birds').y[i]
                = this.dataStore.get('birds').birdsPositionY[i] + 20;
        }

        this.dataStore.get('birds').flyingTime = 0;
    }

    run() {

        this.check();
        console.log("after check")

        console.log("this.dataStore.isGameOver: " + this.dataStore.isGameOver)
        if (!this.dataStore.isGameOver) {
            console.log("游戏开始或者进行中")
            this.dataStore.get('background').draw();

            this.drawPencils();
            this.dataStore.get('land').draw();
            this.dataStore.get('birds').draw();
            // requestAnimationFrame(() => this.dataStore.get('land').draw()); // request这个函数需要被循环调用的，这种写法等于只额外多调用了一次
            let movingTimer = requestAnimationFrame(() => this.run()); // this永远指向类，箭头函数 request类似于setTimeout
            // 由浏览器决定的 不是我们来控制的 性能高于setTimeout和setInterval
            this.dataStore.put('movingTimer', movingTimer);
            // this.dataStore.get('pencilUp').draw();
            // this.dataStore.get('pencilDown').draw();
            //window.setTimeout(() => this.run(), 10) 虽然能跑
            //this.dataStore.put('landMovingTimer', landMovingTimer);

        } else {
            cancelAnimationFrame(this.dataStore.get('movingTimer')); // 当游戏暂停或者停止之后 需要cancel掉这个timer
            this.dataStore.destroy();
            console.log("游戏结束");
        }
    }

    static getInstance() {
        if (!Director.instance) {
            Director.instance = new Director(); // 如果不存在 就新建
        }
        return Director.instance; // 如果存在就返回存在的那个
    }
}