// this永远指向的是最后调用它的对象

// eg1:
var b = 10;
var o = {
    b: 20,
    fn:function(){
        console.log(this.b); 
    }
}
window.o.fn(); // 20  最后调用它的对象是o


// eg2:
var o = {
  a:10,
  b:{
      a:12,
      fn:function(){
          console.log(this.a); 
          console.log(this);
      }
  }
}
var j = o.b.fn;
j(); // undefined   window  this指向最后调用它的对象


// 不同情况下this的使用
// 1. 构造函数版本
function Fn(){
  this.user = "张三";
}
var a = new Fn(); // new改变了this指向，使其指向a， 创造fn实例即复制了一份fn函数到a中
console.log(a.user); // 张三



// 2. 当this遇上return时
// 如果返回值是一个对象，那么this指向的就是那个返回的对象，如果返回值不是一个对象那么this还是指向函数的实例。
function fn()  {  
  this.user = '张三';  
  return {};  
}
var a = new fn;  
console.log(a.user); // undefined

// 例子8
function fn() {  
  this.user = '张三';  
  return function(){};
}
var a = new fn;  
console.log(a.user)  // undefined

// 例子9
function fn()  
{  
  this.user = '张三';  
  return 1;
}
var a = new fn;  
console.log(a.user); // 张三



// 3.箭头函数中的this

var x=11;
var obj={
 x:22,
 say:()=>{
   console.log(this.x);
 }
}
obj.say(); // 11

// 箭头函数不是通过function关键字定义的，不遵循以上规则，箭头函数中的this是在定义函数的时候绑定
// 比如这里的箭头函数中的this.x，箭头函数本身与say平级以key:value的形式，也就是箭头函数本身所在的对象为obj,
// 而obj的父执行上下文就是window，因此这里的this.x实际上表示的是window.x，因此输出的是11。


// 4. 改变this指向的方法（apply， call， bind）
// 当call和apply的第一个参数写的是null，那么this指向的是window对象

// call
var a = {
  user:"zhang",
  fn:function(){
    console.log(this.user);
   }
}
var b = a.fn;
b.call(a); //  zhang


// apply
var a = {
  user:"zhang",
  fn:function(p1, p2){
    console.log(this.user)
    console.log(p1+p2)
   }
}
var b = a.fn;
b.apply(a, [1, 3]); // zhang 4
// b.call(a, 1, 3);


// bind()
// 与call和apply不同的是，bind不会立即执行，它返回的是一个修改过后函数，
// bind方法可以让对应的函数想什么时候调就什么时候调用，并且可以将参数在执行的时候添加

var user = '李'
var a = {
  user:"张",
  fn:function(p1, p2){
      console.log(this.user);
      console.log(p1+p2);
  }
}
var b = a.fn;
b.bind(a); // f() {}

b.bind(a)(3, 5) // 张  8  立即执行，this指向a
b(3, 5); // 李 8  稍晚再调用b函数，它的上下文会指向window
