// 创建二叉树
// 约定： 右子节点都大于左子节点

function BinaryTree() {

  var root = null;

  var Node = function(val) {
    this.value = val;
    this.left = null;
    this.right = null;
  }

  // 按照我们的约定： 左子节点 < 父节点 < 右子节点
  var insertNode = function(node, newNode) {
    // 新增节点 < 父节点
    if (newNode.value < node.value) {
      // 左子节点不存在，则新增为左子节点
      if (node.left === null) {
        node.left = newNode;
      } else {
        // 左子节点存在，再再次进行比较
        insertNode(node.left, newNode);
      }
    } else {
      // 新增节点 > 父节点, 同上
      if (node.right === null) {
        node.right = newNode;
      } else {
        insertNode(node.right, newNode);
      }
    }
  }

  this.insert = function(val) {
    var node = new Node(val);
    console.log('========', root);
    if (root === null) {
      root = node;
    } else {
      insertNode(root, node)
    }
  }
};

var nodes = [6,2,3,4,9,8,7,12,1,22]
var tree = new BinaryTree();
nodes.forEach(item => tree.insert(item));

// DFS深度优先遍历
// 递归方法
function dfs(node, res = []) {
  if(!node) return [];
  // 前序遍历  中-左-右
  res.push(node.value);
  node.left && dfs(node.left, res);
  node.right && dfs(node.right, res);
  /*
    // 中序遍历 左-中-右
      node.left && dfs(node.left, res);
      res.push(node.value);
      node.right && dfs(node.right, res);
    // 后序遍历 左-右-中
      node.left && dfs(node.left, res);
      node.right && dfs(node.right, res);
      res.push(node.value);
  */
  return res;
}

// 非递归的方法
// 前序遍历 中-左-右
function dfs(nodes) {
  let res = [];
  let stack = [nodes];
  // 使用一个栈stack，每次首先输出栈顶元素，也就是当前二叉树根节点，之后依次输出二叉树的左孩子和右孩子
  while(stack.length) {
    let node = stack.pop(); // 取stack中的最后一个
    // 先push根节点的值，再将右子树压入栈中，最后将左子树压入栈中；
    res.push(node.value);
    node.right && stack.push(node.right);
    node.left && stack.push(node.left);
  }
  return res;
}

// 中序遍历 左-中-右
// 先递归遍历左子树，从最后一个左子树开始存入数组，然后回溯遍历双亲结点，再是右子树
function dfs(node) {
  let res = [];
  let stack = [];
  while(stack.length || node) {
    if (node) {
      stack.push(node);
      node = node.left;
    } else {
      node = stack.pop();
      res.push(node.value);
      node = node.right;
    }
  }
}

// 后序遍历  左-右-中
// 先递归遍历左子树，从最后一个左子树开始存入数组，然后遍历右子树，最后是双亲结点
function dfs(node) {
  const res = [], stack = [];
  while (stack.length || node) {
    res.unshift(node.val)
    node.left && stack.push(node.left)
    node.right && stack.push(node.right)
    node = stack.pop()
  }
  return res
}


// 获取二叉树的右视图
// DFS深度优先遍历，右子树的值为最终看到的值
// 左视图同理
function rightSideView(root, depth = 0, res = []) {
  if(!root) return []; 
  // 如果depth层右子树有值，则返回，无值则获取左子树的值
  if(!res[depth]) {
    res[depth] = root.value;
  }
  // 先获取右子树的值，再获取左子树
  rightSideView(root.right, depth + 1, res)
  rightSideView(root.left, depth + 1, res)
  return res
};


// BFS广度优先遍历
// 从二叉树的根结点开始，自上而下逐层遍历；在同一层中，按照从左到右的顺序对结点逐一访问

// 递归遍历
function bfs(node, depth = 0, res = []) {
   // 每一层所有值组成一个数组
  if(!res[depth]) {
    res[depth] = [node.value];
  } else {
    res[depth].push(node.value);
  }
  node.left && bfs(node.left, depth + 1, res);
  node.right && bfs(node.right, depth + 1, res);
  // 若要平展开，则再进行一次扁平化处理
  return res;
}

// 非递归
function bfs(node) {
  let result = [];
  let queue = [];
  queue.push(node);
  let pointer = 0;
  while(pointer < queue.length) {
      let node = queue[pointer++];
      result.push(node.value);
      node.left && queue.push(node.left);
      node.right && queue.push(node.right);
  }
  return result;
}

bfs(tree);
