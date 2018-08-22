import {Sprite} from "../base/Sprite.js";
import {Pencil} from "./Pencil.js";

export class DownPencil extends Pencil {

    constructor(top) {
        const image = Sprite.getImage('pencilDown');
        super(image, top);

    }

    draw() {
        let gap = 1 / 5 * window.innerHeight;
        this.y = this.top + gap;
        super.draw();
    }
}