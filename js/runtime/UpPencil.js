import {Sprite} from "../base/Sprite.js";
import {DataStore} from "../base/DataStore.js";
import {Pencil} from "./Pencil.js";

export class UpPencil extends Pencil {

    constructor(top) {

        const image = Sprite.getImage('pencilUp');
        //const randomY = Sprite.getRandonUpPencilY();

        super(image, top);
        // 剪裁y需要产生随机数
        // super(image,
        //     0, randomY,
        //     image.width, image.height,
        //     30, 0,
        //     image.width, image.height
        //     );


    }

    draw() {
        this.y = this.top - this.height;
        super.draw();
    }



}