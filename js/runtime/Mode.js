
import {DataStore} from "../base/DataStore.js";

export class Mode {
    constructor(){
        this.ctx = DataStore.getInstance().ctx;
        this.score = 88;
    }

    draw() {
        this.ctx.font = '22px Arial';
        this.ctx.fillStyle = 'coral';
        this.ctx.fillText(
            "白天",
            1 / 4 * DataStore.getInstance().canvas.width,
            3 / 5 * DataStore.getInstance().canvas.height,
            1000 // 最大值 可选
        );

        this.ctx.fillText(
            "夜间",
            2 / 3 * DataStore.getInstance().canvas.width,
            3 / 5 *  DataStore.getInstance().canvas.height,
            1000 // 最大值 可选
        );
        // ctx.fillText("文字", x坐标, y坐标, 文字宽度);//绘制文字
    }

    destroyMode() {

    }


}