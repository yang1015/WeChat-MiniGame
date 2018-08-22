import {Sprite} from "../base/Sprite.js";
import {DataStore} from "../base/DataStore.js";
import {Pencil} from "./Pencil.js";

export class UpPencil extends Pencil {

    constructor(top) {
        const image = Sprite.getImage('pencilUp');
        super(image, top); // 传top是为了计算UpPencil的y
    }

    draw() {
        // 从坐标轴的位置来看y一定是负的 所以-y就是正的
        // 那么-y + top = height => y = top - height

        this.y = this.top - this.height;
        super.draw();
    }

}