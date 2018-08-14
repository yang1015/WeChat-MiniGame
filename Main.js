import {ResourceLoader} from "./js/base/ResourceLoader.js";
import {Director} from "./js/Director.js";
import {Background} from "./js/runtime/Background.js";
import {DataStore} from "./js/base/DataStore.js";

export class Main {
    constructor() {
        /* 声明当前类的变量 在类里其他的func里可以直接使用 */
        this.canvas = document.querySelector('#canvas');
        this.dataStore = DataStore.getInstance(); // 初始化DataStore
        this.director = Director.getInstance();
        this.ctx = this.canvas.getContext('2d');
        const loader = ResourceLoader.create();
        loader.onLoaded(map => this.onResourcesFirstLoaded(map)); // map是所有图片mp3
        //这里因为已经有了loader的实例对象所以可以直接调用它constructor里的map了

    }

    onResourcesFirstLoaded(map) {
        // 资源加载完成之后 需要给dataStore添加一些永远不变的值 永远得到保存
        this.dataStore.ctx = this.ctx;
        this.dataStore.res = map; // 存放在类中
        this.init();
    }

    init() {
        // 将bg放进dataStore的简直配对中 作为value的不是image实体
        // 而是直接将images实体拿去给background实例化了一遍，这样如果要draw 直接.draw()即可
        this.dataStore
            .put('background',
                // this.ctx, this.dataStore.res.get('background')
                // 正确写法 new Background(this.ctx, this.dataStore.res.get('background'))
                // 简化后 1- 全局都使用DataStore中的那个ctx ctx不再需要被传来传去
                //       2- 在Background里定义好了要get的'background'这个key, 直接返回的就是image实例，不需要这里传入再去get了
                new Background()
            );
        // 这里如果把put的value写成image实体，那么在Director那里操作的时候 还缺少Main这里的ctx

        this.director.run(); // 把运行的逻辑都放在director里
    }
}