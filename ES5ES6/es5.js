/* es5 面向对象 */

// 函数声明 会将作用域提升到所有变量之前 只要js文件一加载 就会初始化这个函数 不管你写在什么位置
// 没法通过条件来判断是否要生成这个函数
function xx() { }

// 推荐使用以下这种
var Animal = function (name, age) {
    this.name = name;
    this.age = age;
    /* 第一种 */
    // this.say = function () {
    //     console.log(this.name + " " + this.age + "岁 说 你好1");
    // }
}

var cat = new Animal("小猫", 5);

/* 第二种 */
Animal.prototype.say = function() {
    console.log(this.name + " " + this.age + "岁 说 你好");  //在这里可以直接this.获取
}

cat.say();



// call和apply
// 调用一个对象的一个方法，用另一个对象替换当前对象

/* 第三种 */
Animal.prototype.say.call(cat); // 换成apply也一样的

var cat2 = {
    name: "大猫",
    age: 6
}

/* 第四种 */
cat.say.call(cat2);

// es6是对es5的语法糖的抽象


// 寄生组合继承
var Cat = function (name, age) {
    Animal.apply(this, arguments); // arguments指代所有传入的参数
}

Cat.prototype = Object.create(Animal.prototype); // 浅克隆
Cat.prototype.say = function() {
    var p = {
        name: "父类",
        age: 10
    }
    Animal.prototype.say.apply(p);
    console.log("这是子类: " + this.name);
}

var cc = new Cat("子猫");
cc.say();

