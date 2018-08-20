import {ResourceLoader} from "./js/base/ResourceLoader.js";
import {Director} from "./js/Director.js";
import {Background} from "./js/runtime/Background.js";
import {DataStore} from "./js/base/DataStore.js";
import {Land} from './js/runtime/Land.js';
import {UpPencil} from "./js/runtime/UpPencil.js";
import {DownPencil} from "./js/runtime/DownPencil.js";
import {Birds} from "./js/player/Birds.js";

export class Main {
    constructor() {
        /* 声明当前类的变量 在类里其他的func里可以直接使用 */

        /* 初始化画布 */
        //this.canvas = document.querySelector('#canvas');
        this.canvas = wx.createCanvas();
        this.ctx = this.canvas.getContext('2d'); //getContext("2d") 对象是内建的 HTML5 对象，拥有多种绘制路径、矩形、圆形、字符以及添加图像的方法。

        /* 初始化Main中所需要用到的其他类的实例 两个实例都为单例模式*/
        this.dataStore = DataStore.getInstance(); // 初始化DataStore
        this.director = Director.getInstance();

        /* 新建一个资源加载器的实例 来监控资源是否加载完毕 全部加载完毕之后才能run后续的代码 */
        const loader = ResourceLoader.create();

        /*
         *  1- 括号的callback其实就是callback(map)的变体 (map)为RL里设定的callback所需要的参数
         *  当onLoaded执行到callback这一步时，已经将参数传给了callback函数
         *  之前onLoaded函数括号里使用的变量名map只是一个名字而已，≠ 可以直接不使用this.loader就可以获取实例的变量
         *  叫什么名字都可以
         *  2- 不应该this.loader.map去获取 因为RL在初始化后还做了一个转换，将map value重新设置成了Image Instance instead of src
        */

        loader.onLoaded(mapFromLoadedFunction => this.onResourcesFirstLoaded(mapFromLoadedFunction));
        // map是所有图片和mp3的资源集合
        // 这里因为已经有了loader的实例对象所以可以直接调用它constructor里的map了
    }

    /* ResourceLoader里的callback函数 图片加载完成后执行 */
    onResourcesFirstLoaded(map) {
        // 资源加载完成之后 需要给dataStore添加一些永远不变的值 在本次运行中始终保存
        this.dataStore.ctx = this.ctx;
        this.dataStore.res = map; // 存放在类中 key -> image instance
        this.dataStore.movingSpeed = 2; // land和pencil的移动速度是相同的 所以直接写在datastore里
        this.dataStore.isGameOver = true;
        this.init();
    }

    /* 初始化背景 */
    init() {
        // 将bg放进dataStore的简直配对中 作为value的不是image实体
        // 而是直接将images实体拿去给background实例化了一遍，这样如果要draw 直接.draw()即可
        this.dataStore
            .put('background',
                // this.ctx, this.dataStore.res.get('background')
                // 正确写法 new Background(this.ctx, this.dataStore.res.get('background'))
                // 简化后 1- 全局都使用DataStore中的那个ctx ctx不再需要被传来传去
                //       2- 在Background里定义好了要get的'background'这个key, 直接返回的就是image实例，不需要这里传入再去get了
                new Background()) // 这里如果把put的value写成image实体，那么在Director那里操作的时候 还缺少Main这里的ctx
            .put('land', new Land())
            .put('pencilUp', new UpPencil())
            .put('pencilDown', new DownPencil())
            .put('pencils', [])
            .put('birds', new Birds());
        // 链式操作

        // 先要创建第一组铅笔 再run
        this.director.createPencilPairs();

        this.director.run(); // 把运行的逻辑 渲染的动作 都放在director里
    }
}