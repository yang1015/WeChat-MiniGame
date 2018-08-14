// 导演 控制游戏的逻辑 开始和结束
export class Director {
    constructor() {
        console.log("director cons初始化")
    }

    static getInstance() {

        /*
        if (!Director.instance) {
            Director.instance = new Director(); // 如果不存在 就新建
        }
        return Director.instance; // 如果存在就返回存在的那个
        */

        return new Director();
    }
}