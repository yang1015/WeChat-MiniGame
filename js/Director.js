// 导演 控制游戏的逻辑 开始和结束

// 游戏的开始 逻辑

import {DataStore} from "./base/DataStore.js";
import {UpPencil} from "./runtime/UpPencil.js";
import {DownPencil} from "./runtime/DownPencil.js";

export class Director {
    constructor() {
        //console.log("director cons初始化")
        this.dataStore = DataStore.getInstance();
    }

    createPencilPairs() {
        // 对笔尖高度的限制
        const minTop = DataStore.getInstance().canvas.height / 8;
        const maxTop = DataStore.getInstance().canvas.height / 2;
        const top = minTop + Math.random() * (maxTop - minTop); // 取随机值
        const gap = parseInt(DataStore.getInstance().canvas.height * 0.02 + 10) * Math.random() + 120;

        /* top是UpPencil实际在画布里的长度，gap是上下铅笔之间的间距 */
        this.dataStore.get('pencils').push(new UpPencil(top, gap));
        this.dataStore.get('pencils').push(new DownPencil(top, gap));
    }

    drawPencils() {

        const pencils = this.dataStore.get('pencils'); // 获取dataStore里的pencils数组
        const score = this.dataStore.get('score');
        /* 对要渲染的铅笔数组进行操作 */

        /* 1- 销毁越界铅笔 */
        if (pencils[0].x + pencils[0].width <= 0 // 说明铅笔的右侧边缘已经在x=0的位置了 完全消失出屏幕了
            && pencils.length == 4) { // 避免第一次生成的两支铅笔直接被推出 数组为空了。所以规定当4支的时候 才推出前两支铅笔
            pencils.shift(); // 把数组的第1个元素(up pencil)推出数组 并且数组长度-1
            pencils.shift(); // 把数组的第2个元素(down pencil)推出数组 并且数组长度-1
            score.isGraded = true;
        }

        /* 2- 创建新的铅笔对 补成两组4只 */
        if (pencils[0].x <= (DataStore.getInstance().canvas.width - pencils[0].width) / 2
            && pencils.length == 2) { // 只剩下一组铅笔了
            this.createPencilPairs();
        }

        /* 3- 渲染 */
        pencils.forEach(function (eachPencil) {
            eachPencil.draw();
        });
    }

    /* 判断小鸟是否撞击了地板和铅笔*/
    checkIfHit() {
        /* 是否撞击地板 */
        // 看小鸟移动到的y坐标 - 小鸟的height 是否等于 land的y坐标
        // console.log("here")
        const birds = this.dataStore.get('birds');
        const land = this.dataStore.get('land');
        const pencils = this.dataStore.get('pencils');
        const score = this.dataStore.get('score');

        if (birds.birdsPositionY[0] + birds.birdsPositionHeight[0] >= land.y) {
            // console.log("撞击了");
            this.isGameOver = true;
            return;
        }

        const birdsBorder = {
            top: birds.birdsPositionY[0],
            bottom: birds.birdsPositionY[0] + birds.birdsPositionHeight[0],
            left: birds.birdsPositionX[0],
            right: birds.birdsPositionX[0] + birds.birdsPositionWidth[0]
        }

        const len = pencils.length;
        for (let i = 0; i < len; i++) {
            const currentPencil = pencils[i];
            // if (Director.ifBirdsHitPencils(birds, pencils[i])) {
            //     console.log("撞到了");
            //     console.log("check: " + this.isGameOver)
            //     this.isGameOver = true; // 游戏结束
            //     return;
            // }

            const currentPencilBorder = {
                top: currentPencil.y,
                bottom: currentPencil.y + currentPencil.height,
                left: currentPencil.x,
                right: currentPencil.x + currentPencil.width
            }
            if (Director.ifBirdsHitPencils(birdsBorder, currentPencilBorder)) {

                this.isGameOver = true;
                return;
            }

        }

        /* 分数逻辑 */
        if (birds.birdsPositionWidth[0] > pencils[0].x + pencils[0].width
            && score.isGraded) {
            // 越过铅笔 左侧超过右侧
            // 刷新的帧数很多 重复被计数
            score.isGraded = false; // 一越过铅笔 马上关闭加分功能
            score.score++;
        }
    }


    static ifBirdsHitPencils(bird, pencil) {
        // static ifBirdsHitPencils(birds, currentPencil) {
        let res = false;

        // if (birds.y[0] >= currentPencil.y + currentPencil.height || // 小鸟的上和铅笔的下
        //     birds.birdsPositionY[0] + birds.birdsPositionHeight[0] <= currentPencil.y || // 小鸟的下和铅笔的上
        //     birds.birdsPositionX[0] >= currentPencil.x + currentPencil.width ||
        //     birds.birdsPositionX[0] + birds.birdsPositionWidth[0] >= currentPencil.x) {// 小鸟的右和铅笔的左
        //     console.log("触碰了");
        //     res = true;
        // }
        if (bird.top >= pencil.bottom
            || bird.bottom <= pencil.top
            || bird.right <= pencil.left
            || bird.left >= pencil.right) {
            res = true;
        }

        return !res;

    }

    birdsTouchEvent() {
        for (let i = 0; i <= 2; i++) {
            this.dataStore.get('birds').y[i]
                = this.dataStore.get('birds').birdsPositionY[i];
        }

        this.dataStore.get('birds').flyingTime = 0;
    }

    run() {


        this.checkIfHit(); // 判断有没有碰撞 并更新isGameOver的状态

        let movingTimer; // 定时刷新器

        /* 画面不停地跟着浏览器的刷新速率被重绘 */
       if (!this.isGameOver) { // 游戏没有结束

            this.dataStore.get('bgm').play(); // 开始播放或者继续播放
            this.dataStore.get("bg").draw();

            this.drawPencils();
            this.dataStore.get('land').draw();
            this.dataStore.get('score').draw();
            this.dataStore.get('birds').draw();


            /* this永远指向类，箭头函数
               requestAnimationFrame类似于setTimeout
               但是requestAnimationFrame的刷新速率由浏览器决定的 不是我们来控制的 性能高于setTimeout和setInterval
            */
            movingTimer = requestAnimationFrame(() => this.run());
            this.dataStore.put('movingTimer', movingTimer);  // 1- 更新timer; 2- 方便else时cancel

        } else {
            var res = {
                success: function () {
                    console.log("振动成功");
                },
                fail: function () {
                    console.log("振动失败");
                }
            }

            wx.vibrateLong(res); // 长振动
            this.dataStore.get('bgm').stop();
            this.dataStore.get('startButton').draw();
            cancelAnimationFrame(this.dataStore.get('movingTimer')); // 当游戏暂停或者停止之后 需要cancel掉这个timer
            this.dataStore.destroy();
            wx.triggerGC(); // 垃圾回收

        }
    }

    static getInstance() {
        if (!Director.instance) {
            Director.instance = new Director(); // 如果不存在 就新建
        }
        return Director.instance; // 如果存在就返回存在的那个
    }
}