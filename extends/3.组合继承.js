/*
  综合 原型链继承  和  构造函数继承 就是 组合继承
  用原型链实现对原型属性和方法的继承，用借用构造函数技术来实现实例属性的继承
*/

function A(name) {
  this.color = ['red', 'green', 'blue'];
  this.name = name;
}

A.prototype.getName = function() {
  return this.name;
}

function a(name, age) {
  A.call(this);
  this.age = age;
}

a.prototype = new A();  // a.prototype的constructor属性指向了A

// 重写a.prototype的constructor属性，指向自己的构造函数a
a.prototype.constructor = a;

a.prototype.getAge = function() {
  return this.age;
}

const a1 = new a('张三', 24);
a1.getName(); // 张三
a1.getAge(); // 24
a1.color.push('blcak');
a1.color; // ['red', 'green', 'blue', 'blcak']


const a2 = new a('李四', 13);
a2.getName(); // 李四
a2.getAge(); // 13
a2.color; // ['red', 'green', 'blue']


/*
  缺点：
    第一次调用A()：给a.prototype写入两个属性name，color。
    第二次调用A()：给a1写入两个属性name，color。

    实例对象a1上的两个属性就屏蔽了其原型对象a.prototype的两个同名属性。
    所以，组合模式的缺点就是在使用子类创建实例对象时，其原型中会存在两份相同的属性/方法
*/