// DFS深度优先查询

function deepclone(obj) {
  let res;
  if (Array.isArray(obj)) {
    res = [];
    obj.forEach(val => res.push(deepclone(val)));
  } else if(Object.prototype.toString.call(obj) === '[Object object]') {
    res = obj.construct === Object ? {} : Object.create(Obj.construct.prototype);
    Object.getOwnPropertyNames(obj).concat(Object.getOwnPropertySymbols(obj)).map(item => {
      res[item] = deepclone(obj[item]);
    })
  } else {
    res = obj;
  }
  return obj;
}