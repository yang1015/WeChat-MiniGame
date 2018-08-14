// 精灵的基类 初始化精灵的资源、大小、位置

export class Sprite {
    constructor(ctx = null, img = null,
                srcX = 0, srcY = 0, srcW = 0, srcH = 0, x = 0, y = 0, width = 0, height = 0) { // ES6可以设置默认值
        console.log("sprite constructor")
        this.ctx = ctx;
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

    draw() {
        this.ctx.drawImage(
            this.img,
            this.srcX,
            this.srcY,
            this.srcW,
            this.srcH,
            this.x,
            this.y,
            this.width,
            this.height
        )
    }
}