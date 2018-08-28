import {Sprite} from "../base/Sprite.js";
import {DataStore} from "../base/DataStore.js";
import {Director} from "../Director";

export class Land extends Sprite {
    constructor() {
        const image = Sprite.getImage('land');
        super(
            image, // 这里也不再需要ctx了 因为在Sprite里获取了DataStore里唯一的不变的ctx 所以不需要再传了
            0, 0, // 剪裁开始位置
            image.width, image.height, // 剪裁结束位置
            0, DataStore.getInstance().canvas.height - image.height, // 左上角跟canvas的左上角重合
            image.width, image.height // 这个点的位置 参照的是起点，而非左上角的(0, 0);
        );

        this.landX = 0; // 地板的水平变化坐标
    }

    draw() {
        // console.log(this.a777); 在子类里可以取用使用父类的变量


            this.landX = this.landX + DataStore.getInstance().movingSpeed;;
            if (this.landX >= (this.img.width - DataStore.getInstance().canvas.width)) { //右边即将达到canvas的边界
                this.landX = 0;
            }

            super.draw(
                this.image,
                this.srcX, this.srcY, this.srcW, this.srcH,
                -this.landX, this.y, this.width, this.height
            );
            // 从右往左移动 剪裁开始的位置要变化 递减



    }
}