import {Sprite} from "../base/Sprite.js";
import {Pencil} from "./Pencil.js";

export class DownPencil extends Pencil {

    constructor(top, gap) {
        const image = Sprite.getImage('pencilDown');
        super(image, top, gap);

    }

    draw() {
        this.y = this.top + this.gap; // this.top和this.gap都现在本类里找 没有就追溯到父亲
        // 在这里修改了父类的y
        super.draw();
    }
}