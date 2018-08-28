// 精灵的基类 初始化精灵的资源、大小、位置
import {DataStore} from "./DataStore.js";

export class Sprite {
    // 本来constructor里传了ctx这个参数 但是考虑到ctx永久保存在了datastore里 就可以直接使用了
    constructor(img = null,
                srcX = 0, srcY = 0, srcW = 0, srcH = 0,
                x = 0, y = 0, width = 0, height = 0) { // ES6可以设置默认值

        this.dataStore = DataStore.getInstance();
        this.ctx = this.dataStore.ctx;

        this.img = img;
        this.srcX = srcX;
        this.srcY = srcY;
        this.srcW = srcW;
        this.srcH = srcH;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    /* ()里的是默认参数 */
    draw(img = this.img,
         srcX = this.srcX,
         srcY = this.srcY,
         srcW = this.srcW,
         srcH = this.srcH,
         x = this.x,
         y = this.y,
         width = this.width,
         height = this.height) {

        this.ctx.drawImage(
            img,

            srcX,
            srcY,
            srcW,
            srcH,

            x,
            y,
            width,
            height
        )
    }

    static getImage(key) {
        return DataStore.getInstance().res.get(key);
        // 在这里不能使用this.dataStore 因为调用static函数的时候，是不经过constructor的
        // 所以等于是没有经过this.dataStore = DataStore.getInstance();这一步 所以对于static函数来说 不认识这个变量
    }

}