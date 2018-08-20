
/* 铅笔的基类 */

import {Sprite} from "../base/Sprite.js";
import {DataStore} from "../base/DataStore";

export class Pencil extends Sprite{

    constructor(image, top) {

        super(
            image,
            0, 0,
            image.width, image.height,
            // 这条线在屏幕的右边 看不到的位置
            window.innerWidth, 0,
            image.width, image.height
        );

    }

    draw() {
        this.x = this.x - DataStore.getInstance().movingSpeed;

    }
}