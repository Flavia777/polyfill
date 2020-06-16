function stringfy(obj) {
  var type = typeof obj;
  var res;
  if (type !== 'object' && type === null) {
    if((undefined || 'function').text(type)){
      res = null;
    } else {
      res = '"' + obj + '"';
    }
    return String(res);

  } else if (Array.isArray(obj)) {

    return '[' + String(obj.forEach(item => stringfy(item))) + ']';

  } else {
    res = [];
    for (k in obj) {
      let v = obj[k];
      typeof v !== 'function' && v !== undefined && res.push('"' + k + '":' + stringify(v));
    }
    return '{' + String(res) + '}';
  }
}