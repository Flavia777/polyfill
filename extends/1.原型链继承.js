/*
  继承
*/


// 原型链继承  (继承的本质就是复制，即重写原型对象，代之以一个新类型的实例)
/*
  构造函数、原型和实例之间的关系：
    每个构造函数都有一个原型对象(prototype)
    原型对象都包含一个指向构造函数的指针(constructor)
    而实例都包含一个原型对象的指针(_proto_)

    function A() {}
    const a = new A();
    A.prototype.constructor === A  true;
    a._proto === A.prototype   true
*/

function A() {
  this.visible = true;
}

A.prototype.getVisible = function() {
  return this.visible;
}

function a() {
  this.show = false;
}
// 这里是关键，创建A的实例，并将该实例赋值给a.prototype
a.prototype = new A(); // a.prototype.__proto__ === A.prototype

a.prototype.getShow = function() {
  return this.show;
}

const aa = new a();  // aa.__proto__ === a.prototype   即    aa._proto__.__proto__ === A.prototype   形成了原型链
aa.getShow(); // false
aa.getVisible(); // true


/*
  缺点：
    多个实例对引用类型的操作会被篡改。
*/

function A(){
  this.colors = ["red", "blue", "green"];
}
function a(){}

a.prototype = new A();

var a1 = new a();
a1.colors.push("black");
alert(a1.colors); //"red,blue,green,black"

var a2 = new a(); 
alert(a2.colors); //"red,blue,green,black
