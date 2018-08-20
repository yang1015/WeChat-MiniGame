
import {Sprite} from "../base/Sprite.js";

export class DownPencil extends Sprite{

    constructor() {
        const image = Sprite.getImage('pencilDown');
        super();
        // let randomDownPencilY = Sprite.getRandomDownPencilY();
        // super(
        //     image,
        //     0, 0,
        //     image.width, 400,
        //     30, 420,
        //     image.width, randomDownPencilY
        //     );
    }
}