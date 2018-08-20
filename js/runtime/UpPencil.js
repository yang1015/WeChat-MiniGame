import {Sprite} from "../base/Sprite.js";
import {DataStore} from "../base/DataStore.js";

export class UpPencil extends Sprite {
    constructor() {


        const image = Sprite.getImage('pencilUp');
        //const randomY = Sprite.getRandonUpPencilY();

        super();
        // 剪裁y需要产生随机数
        // super(image,
        //     0, randomY,
        //     image.width, image.height,
        //     30, 0,
        //     image.width, image.height
        //     );


    }



}