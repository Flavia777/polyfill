/* 
  使用父类的构造函数来增强子类实例，等同于'复制'父类的实例给子类（不使用原型）
*/

function A() {
  this.color = ['red', 'green', 'blue'];
}

function a() {
  // 创建子类实例时调用A构造函数，于是a的每个实例都会将A中的属性复制一份。
  A.call(this);
}

const a1 = new a();
a1.push('black');
console.log(a1.color) // ['red', 'green', 'blue', 'black']

const a2 = new a();
console.log(a2.color) // ['red', 'green', 'blue']



/*
  缺点：
    只能继承父类的实例属性和方法，不能继承原型属性/方法
    无法实现复用，每个子类都有父类实例函数的副本，影响性能
*/