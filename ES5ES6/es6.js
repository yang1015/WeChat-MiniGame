

class Animal{
    constructor(name = '无名', age = 0) {
        this.name = name;
        this.age = age;
    }

    say() {
        console.log("父类: " +  this.name + " " + this.age);
    }
}

class Cat extends Animal {
    constructor(name, age) {
        super(name, age);
    }

    say() { // 重写say函数
        super.say(); //调用父类
        console.log("子类say: " + this.name + this.age)
    }
}

let cat = new Cat('嘻嘻', 8);
cat.say();

