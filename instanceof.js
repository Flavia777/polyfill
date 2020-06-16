// prototype     __proto__     constructor

//__proto__是每个对象才拥有的属性

//prototype是只有函数对象才拥有的属性，被称为原型对象
//一旦原型对象被赋予属性和方法,那么由相应的构造函数创建的实例会继承prototype上的属性和方法

function Person(name){
  this.name=name;
}
Person.prototype.sayName=function(){
  console.log(this.name);
}
var person = new Person("xl");  // new了一个实例对象
person.sayName(); //输出 "xl"

console.log(person.constrctor) // Person
console.log(person instanceof Person) // true
console.log(person.__proto === Person.prototype) // true




//任何一个对象都有constructor属性，始终指向创建这个对象的构造函数
var name = "hello";
console.log(name.constructor);//输出 function String(){}
var sayName = function(){}
console.log(sayName.constrctor)// 输出 function Function(){}

//接下来通过构造函数创建
function A(){}
var a = new A();
console.log(a.constructor); //输出 function A(){}


// 每个函数都有prototype属性，而这个prototype的constructor则指向这个函数
function Person(name){
  this.name=name;
}
Person.prototype.sayName=function(){
  console.log(this.name);
}
var person=new Person("xl");
console.log(person.constructor); //输出 function Person(){}
console.log(Person.prototype.constructor);//输出 function Person(){}
console.log(Person.constructor); //输出 function Function(){}

// 如果重写这个Person.prototype属性，那么constructor属性的指向就会发生改变了。
Person.prototype = {
  sayName: function() {
    console.log(this.name);
  }
}
console.log(Person.prototype.constrctor) // 输出 function Object(){}

// 原因在于 重写Person.prototype相当于下面的操作
Person.prototype = new Object({
  sayName: function() {
      console.log(this.name);
  }
});
// 现在Person.prototype.constructor属性实际上是指向Object的
// 将constructor属性再次指向Person呢？
Person.prototype.constructor=Person;






// instanceof 主要的实现原理就是只要右边变量的 prototype 在左边变量的原型链上即可
function instanceOf (L, R) {
  var left = L.__proto__,
      right = R.prototype;

  while(left !==null) {
    if (left === right) {
      return true;
    }
    left = left.__proto__;
  }
  return false;
}