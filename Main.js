import {ResourceLoader} from "./js/base/ResourceLoader.js";
import {Director} from "./js/Director.js";
import {Background} from "./js/runtime/Background.js";

export class Main {
    constructor() {
        /* 声明当前类的变量 在类里其他的func里可以直接使用 */
        this.canvas = document.querySelector('#canvas');
        this.ctx = this.canvas.getContext('2d');
        const loader = ResourceLoader.create();
        loader.onLoaded(map => this.onResourcesFirstLoaded(map));
        //这里因为已经有了loader的实例对象所以可以直接调用它constructor里的map了

    }

    onResourcesFirstLoaded(map) {
        let background = new Background(this.ctx, map.get('background'));
        background.draw();
    }
}