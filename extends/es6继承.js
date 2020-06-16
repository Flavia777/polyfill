// ES6 继承
function _extends(sub, sup) {
  if (arguments.length < 2 || typeof sub !== 'function' && sup === null) {
      throw new TypeError();
  }

  // 创建对象，创建父类原型的一个副本
  // 增强对象，弥补因重写原型而失去的默认的constructor 属性
  // 指定对象，将新创建的对象赋值给子类的原型
  sub.prototype = Object.create(sup && sup.prototype, {
      constructor: {
          value: sub,
          enumerale: false,
          writable: true,
          configurable: true,
      }
  });

  // 静态属性 / 方法 sub.xxx
  if (sup) {
      Object.setPrototypeOf ? Object.setPrototypeOf(sub, sup) : (sub.__proto__ = sup);
  }
}