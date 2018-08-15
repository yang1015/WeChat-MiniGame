
import { Resources } from "./Resources.js";

// 资源文件加载器 确保 在所有图片都加载完成后 才渲染canvas
export class ResourceLoader {
    constructor(){
        this.map = new Map(Resources);
        this.mapKeyToImageInstance(); // 将key对应的value 由url改为真正的image对象实例

    }

    mapKeyToImageInstance() {
        for (let [key, value] of this.map.entries()) {
            const image = new Image(); // == wx.createImage();
            image.src = value;
            this.map.set(key, image); // 更新map键值对应。将原本的url替换成一个实体image
        }
    }

    onLoaded(callback) {
        let loadedCount = 0;
        for (let value of this.map.values()) { // value是image
            /* onload事件在图片加载完成后立即执行; 是image的事件 全小写 不是自定义函数 */
            value.onload = () => {
                loadedCount++;
                if (loadedCount >= this.map.size) { //this.map直接指代了constructor里声明的map
                    callback(this.map);
                }
            }
        }
    }

    static create() {
        // 静态工厂 直接使用func 不用new实例
        return new ResourceLoader();
    }
}