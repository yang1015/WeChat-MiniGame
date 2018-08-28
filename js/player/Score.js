
import {DataStore} from "../base/DataStore.js";

export class Score {
    constructor(){
        this.ctx = DataStore.getInstance().ctx;
        this.score = 0;
        // 因为canvas在不停刷新 所以要有一个额外变量来控制计分与否
        this.isGraded = false; // 默认未被打过分

    }

    draw() {
        this.ctx.font = '26px Arial';
        this.ctx.fillStyle = '#ffa74b';
        this.ctx.fillText(
            this.score,
            DataStore.getInstance().canvas.width / 2,
            DataStore.getInstance().canvas.height / 18,
            1000 // 最大值 可选
        )

    }
}