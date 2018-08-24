import {Sprite} from "../base/Sprite.js";
import {DataStore} from "../base/DataStore.js";


export class Background extends Sprite {
    constructor() {

        const image = Sprite.getImage('background');
        const canvas = DataStore.getInstance().canvas;

        /* super之上不可以使用类实例的方法 禁止this关键字; 但是可以直接用类去访问*/
        /* super是调用父类的构造方法 将数据传给父类 */
        super(
            image, // 这里也不再需要ctx了 因为在Sprite里获取了DataStore里唯一的不变的ctx 所以不需要再传了
            0, 0, // 剪裁开始位置
            image.width, image.height, // 剪裁结束位置
            0, 0, // 左上角跟canvas的左上角重合
            DataStore.getInstance().canvas.width, DataStore.getInstance().canvas.height // 放置的右下角的结束位置
        );
        // console.log("bg after super")
    }


    // 继承了sprite类的draw方法 可以直接调用
}
