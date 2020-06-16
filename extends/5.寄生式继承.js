/*
  在原型式继承的基础上，增强对象，返回构造函数
*/

function createAnother(original){
  var clone = object(original); // 通过调用 object() 函数创建一个新对象
  clone.sayHi = function(){  // 以某种方式来增强对象
    alert("hi");
  };
  return clone; // 返回这个对象
}

var person = {
  name: "Nicholas",
  friends: ["Shelby", "Court", "Van"]
};
var anotherPerson = createAnother(person);
anotherPerson.sayHi(); //"hi"


/*
  缺点(同原型式继承)：
      原型链继承多个实例的引用类型属性指向相同，存在篡改的可能。
      无法传递参数
*/
