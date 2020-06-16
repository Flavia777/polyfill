function parseQuery(url) {
  if(!url) {
    throw new TypeError();
  }

  const query = url.split('?')[1];
  let res = {};

  query.split('&').forEach(item => {
    const key = item.split('=')(0);
    const val = item.split('=')[1];
    res[decodeURIComponent(key)] = decodeURIComponent(val);  
  })

  return res;
}


// 正则
function parseQuery(url) {
  var res = {},
      paraReg = /[?&]([^=&#]+)=([^&#]*)/g,
      queries = url.match(paraReg),
      protoReg = /(\w+):\/\/([^/:]+)(:\d+)?/,
      descs = url.match(protoReg);

  if (queries) {
    queries.forEach(function(cur) {
        res[decodeURIComponent(cur.split('=')[0]).slice(1)] = decodeURIComponent(cur.split('=')[1]);
    });
  }

  if (descs) {
    dst._protocol = descs[1];
    dst._domain = descs[2];
    dst._port = descs[3];
  }

  return dst;
}