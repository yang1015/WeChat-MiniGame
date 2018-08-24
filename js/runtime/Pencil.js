/* 铅笔的基类 */

import {Sprite} from "../base/Sprite.js";
import {DataStore} from "../base/DataStore.js";

export class Pencil extends Sprite {

    constructor(image, top) { //对于部分上铅笔来说 图片开始的上边界截取 top是负值
        super(
            image,
            0, 0,
            image.width, image.height,
            // 下面这条线的位置在屏幕的右边 看不到的位置
            DataStore.getInstance().canvas.width, 0,
            image.width, image.height
        );

        this.top = top;
        this.movingSpeed = DataStore.getInstance().movingSpeed;
    }

    draw() {
        this.x = this.x - this.movingSpeed;

        super.draw(
            this.img,
            0, 0, this.img.width, this.img.height, // 在原图上的剪裁位置
            this.x, this.y, // 为什么直接用this.x?? 用Sprite的
            this.img.width, this.img.height
        )

    }
}