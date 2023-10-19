class TreeNode {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

function removeDuplicates(array) {
  const noDuplicates = [];
  for (let i = 0; i < array.length; ++i) {
    const element = array[i];
    if (!noDuplicates.includes(element)) noDuplicates.push(element);
  }
  return noDuplicates;
}

function buildTree(array, start, end) {
  if (start > end) return null;
  else {
    const mid = Math.round((start + end) / 2);
    const node = new TreeNode(array[mid]);
    node.left = buildTree(array, start, mid - 1);
    node.right = buildTree(array, mid + 1, end);
    return node;
  }
}

class BalancedBinaryTree {
  constructor(array) {
    array = removeDuplicates(array);
    array.sort((a, b) => (a < b ? -1 : 1));
    console.log(array);
    const start = 0;
    const end = array.length - 1;
    this.root = buildTree(array, start, end);
  }

  insert(data) {
    const node = new TreeNode(data);
    let previous;
    let current = this.root;
    if (current) {
      while (current) {
        previous = current;
        if (data === current.data) {
          return;
        } else {
          data < current.data
            ? (current = current.left)
            : (current = current.right);
        }
      }
      data < previous.data ? (previous.left = node) : (previous.right = node);
    } else this.root = node;
  }
}

const tree = new BalancedBinaryTree([
  1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324,
]);

tree.insert(21);
tree.insert(7);

const prettyPrint = (node, prefix = '', isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
  }
  console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
  }
};

prettyPrint(tree.root);