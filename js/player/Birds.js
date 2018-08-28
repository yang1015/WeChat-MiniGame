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

        /* 小鸟的剪裁位置 */

        this.clippingTopLeftX = [
            25,
            25 + 37 + 22,
            25 + 37 + 22 + 37 + 30
        ]
        this.clippingTopLeftY = [22, 22, 22];
        this.clippingBottomRightX = [37, 37, 37]; // 是根据前一个点的位置来相对定位的 而不是原点
        this.clippingBottomRightY = [32, 32, 32]

        /* 单只小鸟初始放置位置数据() */
        this.birdPositionX = DataStore.getInstance().canvas.width / 4;
        this.birdPositionY = DataStore.getInstance().canvas.height / 2; // 垂直居中
        this.birdPositionWidth = 34;
        this.birdPositionHeight = 24; // 根据前一个开始位置来定的相对位置

        /* 三只小鸟的分别放置位置数组 */
        this.birdsPositionX = [this.birdPositionX, this.birdPositionX, this.birdPositionX];
        this.birdsPositionY = [this.birdPositionY, this.birdPositionY, this.birdPositionY];
        this.birdsPositionWidth = [this.birdPositionWidth, this.birdPositionWidth, this.birdPositionWidth];
        this.birdsPositionHeight = [this.birdPositionHeight, this.birdPositionHeight, this.birdPositionHeight];

        /* 小鸟在飞的时候其实只有y在移动 设置的是父类Sprite里的y
           理论上birdPositionY[i]的值是不变的，因为是固定的垂直居中，
           所以需要一个在这个y上做offset的操作 方便birdPositionY来不断更新新值
           通过每一轮在上一轮得到的y上减去offset来维护一个不断变化的birdPositionY

           这一轮将新的birdY = this.y + offset之后，birdY更新了
           下一轮就会重新获取this.y = birdY;
           然后draw的时候再更新birdY = this.y + offset
        */
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
        const offsetY = gravity * (this.flyingTime * (this.flyingTime - offsetUp)) / 2; // 物理公式 h = 1/2 * gt^2;
        this.flyingTime++; // 时间越长 自由落体下落的height越大，所以当用户触摸屏幕的时候，要停止自由落体的进行，将time置零即可

        /* 如果只给this.index那只+offset
           当循环到下一只的时候，y还是没有加offset的那只，小鸟的y就会回到原先 画面会大起大落
           不这样循环三只，初始的时候，三只小鸟y一样，你只给一个一只小鸟赋值的话，其他小鸟的y还是原先的y啊，在切换过去的时候会出问题。
        */
        for (let i = 0; i <= 2; i++) {
            /* 在没有点击屏幕的时候 this.y[i]是不变的，而this.birdsPositionY[i]是实时变化的
             * 所以offsetY应该在上一次y的基础上offset，而不是this.birdsY[i] += offsetY; 在新值上变化
            */
            this.birdsPositionY[i] = this.y[i] + offsetY;
        }

        super.draw(
            this.img,
            this.clippingTopLeftX[this.index], this.clippingTopLeftY[this.index],
            this.clippingBottomRightX[this.index], this.clippingBottomRightY[this.index],
            this.birdsPositionX[this.index], this.birdsPositionY[this.index],
            this.birdsPositionWidth[this.index], this.birdsPositionHeight[this.index]
        )

    }


}