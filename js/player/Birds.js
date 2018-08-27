import {Sprite} from "../base/Sprite.js";
import {DataStore} from "../base/DataStore.js";

export class Birds extends Sprite {
    constructor() {
        const image = Sprite.getImage('birds');
        super(
            image,
            0, 0, image.width, image.height,
            0, 0, image.width, image.height
        );

        // 将小鸟的三个形态进行剪裁 放在一个数组里进行维护
        // 1- 剪裁的起始位置
        // 2- 小鸟高24 宽34，上下边距为10，左右间距为18，最左侧边距为9

        /* 需要剪裁的三只小鸟的坐标 */
        this.clippingTopLeftX = [
            9,
            9 + 34 + 18,
            9 + 34 + 18 + 34 + 18
        ]


        this.clippingTopLeftY = [
            10, 10, 10
        ]

        this.clippingBottomRightX = [
            // 9 + 34,
            // 9 + 34 + 18 + 34,
            // 9 + 24 + 18 + 34 + 18 + 34
            // 是根据前一个点的位置来相对定位的 而不是原点
            34, 34, 34
        ]

        this.clippingBottomRightY = [
            24, 24, 24
        ]

        /* 小鸟初始放置位置 */
        this.birdPositionX = DataStore.getInstance().canvas.width / 4;
        this.birdPositionY = DataStore.getInstance().canvas.height / 2; // 垂直居中
        this.birdPositionWidth = 34;
        this.birdPositionHeight = 24; // 根据前一个开始位置来定的相对位置

        /* 三只小鸟的分别放置位置数组 */
        this.birdsPositionX = [this.birdPositionX, this.birdPositionX, this.birdPositionX];
        this.birdsPositionY = [this.birdPositionY, this.birdPositionY, this.birdPositionY];
        this.birdsPositionWidth = [this.birdPositionWidth, this.birdPositionWidth, this.birdPositionWidth];
        this.birdsPositionHeight = [this.birdPositionHeight, this.birdPositionHeight, this.birdPositionHeight];


        // 小鸟在飞的时候其实只有y在移动 设置的是父类Sprite里的y
        this.y = [this.birdPositionY, this.birdPositionY, this.birdPositionY];

        this.index = 0;
        this.count = 0; // 循环小鸟的位数 0->1->2 三个状态 整数
        this.flyingTime = 0;
    }

    draw() {
        // 默认一秒钟刷新60次
        const speed = 0.2; // 切换三只小鸟的速度
        this.count = this.count + speed;
        this.count = this.count > 2 ? 0 : this.count; // 小鸟的index最多只可能是2，如果是2了就切回0的状态
        this.index = Math.floor(this.count); // 四舍五入 减速器的作用
        //console.log(this.index)

        const gravity = 0.98 / 2.4;
        const offsetUp = 30; // 向上偏移一下
        const offsetY = gravity * (this.flyingTime * (this.flyingTime - offsetUp)) / 2;
        // 物理公式 h = 1/2 * gt^2;

        for (let i = 0; i <= 2; i++) {
            this.birdsPositionY[i] = this.y[i] + offsetY;
        }

        this.flyingTime++; // 时间越长 自由落体下落的height越大，所以当用户触摸屏幕的时候，要停止自由落体的进行，将time置零即可


        super.draw(
            this.img,
            this.clippingTopLeftX[this.index], this.clippingTopLeftY[this.index],
            this.clippingBottomRightX[this.index], this.clippingBottomRightY[this.index],
            this.birdsPositionX[this.index], this.birdsPositionY[this.index],
            this.birdsPositionWidth[this.index], this.birdsPositionHeight[this.index]
        )

    }


}