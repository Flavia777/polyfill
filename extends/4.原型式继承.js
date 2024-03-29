/*
  利用一个空对象作为中介，将某个对象直接赋值给空对象构造函数的原型。
*/

function object(obj){
  function F(){}
  F.prototype = obj;
  return new F();
}

var person = {
  name: "Nicholas",
  friends: ["Shelby", "Court", "Van"]
};

var anotherPerson = object(person);
anotherPerson.name = "Greg";
anotherPerson.friends.push("Rob");

var yetAnotherPerson = object(person);
yetAnotherPerson.name = "Linda";
yetAnotherPerson.friends.push("Barbie");

alert(person.friends);   //"Shelby,Court,Van,Rob,Barbie"

/*
  缺点：
      原型式继承多个实例的引用类型属性指向相同，存在篡改的可能。
      无法传递参数
*/