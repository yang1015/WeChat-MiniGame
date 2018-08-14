import {Sprite} from "../base/Sprite.js";

export class Background extends Sprite {
    constructor(ctx, image) {
        console.log("bg constructor")

        /* super是调用父类的构造方法 将数据传给父类 */
        super(ctx, image,
            0, 0, // 剪裁开始位置
            image.width, image.height, // 剪裁结束位置
            0, 0, // 左上角跟canvas的左上角重合
            window.innerWidth, window.innerHeight // 放置的右下角的结束位置
        );

        console.log("bg after super")
    }

    // 继承了sprite类的draw方法
}
