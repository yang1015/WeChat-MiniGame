/* 铅笔的基类 */

import {Sprite} from "../base/Sprite.js";
import {DataStore} from "../base/DataStore.js";

export class Pencil extends Sprite {

    constructor(image, top) {//对于部分上铅笔来说 图片开始的上边界截取 top是负值

        // 对应

        super(
            image,
            0, 0,
            image.width, image.height,
            // 下面这条线的位置在屏幕的右边 看不到的位置
            window.innerWidth, 0,
            image.width, image.height
        );

        this.top = top;

    }

    draw() {

        this.x = this.x - DataStore.getInstance().movingSpeed;

        /*
        if (this.x <= 0) { //右边即将达到canvas的边界
            this.x = window.innerWidth
        }
        */

        super.draw(this.img,
            0, 0, this.img.width, this.img.height,
            this.x, this.y, // 为什么直接用this.x?? 用Sprite的
            this.img.width, this.img.height
        )

    }
}