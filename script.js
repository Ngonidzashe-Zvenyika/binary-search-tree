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

  delete(data) {
    let previous;
    let current = this.root;
    while (current) {
      if (data === current.data) {
        break;
      } else {
        previous = current;
        current = data < current.data ? current.left : current.right;
      }
    }
    if (current) {
      if (current.left && current.right) {
        let replacementParent;
        let replacement = current.right;
        while (replacement.left) {
          replacementParent = replacement;
          replacement = replacement.left;
        }
        replacement.left = current.left;
        if (replacementParent) {
          replacementParent.left = replacement.right;
          replacement.right = current.right;
        }
        if (previous) {
          replacement.data < previous.data
            ? (previous.left = replacement)
            : (previous.right = replacement);
        } else this.root = replacement;
      } else if (current.left || current.right) {
        const replacement = current.right || current.left;
        if (previous) {
          replacement.data < previous.data
            ? (previous.left = replacement)
            : (previous.right = replacement);
        } else this.root = replacement;
      } else {
        if (previous) {
          current.data < previous.data
            ? (previous.left = null)
            : (previous.right = null);
        } else this.root = null;
      }
    }
  }

  find(data) {
    let current = this.root;
    while (current) {
      if (data === current.data) {
        return current;
      } else {
        current = data < current.data ? current.left : current.right;
      }
    }
  }

  levelOrder(callback) {
    let queue = [this.root];
    let array = [];
    while (queue.length > 0) {
      let current = queue.shift();
      if (current) {
        array.push(current.data);
        if (callback) callback(current);
        if (current.left) queue.push(current.left);
        if (current.right) queue.push(current.right);
      }
    }
    return array;
  }

  inOrder(current, callback, array = []) {
    if (callback) {
      if (current) {
        this.inOrder(current.left, callback, array);
        callback(current);
        this.inOrder(current.right, callback, array);
      }
    } else {
      if (current) {
        this.inOrder(current.left, callback, array);
        array.push(current.data);
        this.inOrder(current.right, callback, array);
      }
      return array;
    }
  }

  preOrder(current, callback, array = []) {
    if (callback) {
      if (current) {
        callback(current);
        this.preOrder(current.left, callback, array);
        this.preOrder(current.right, callback, array);
      }
    } else {
      if (current) {
        array.push(current.data);
        this.preOrder(current.left, callback, array);
        this.preOrder(current.right, callback, array);
      }
      return array;
    }
  }

  postOrder(current, callback, array = []) {
    if (callback) {
      if (current) {
        this.postOrder(current.left, callback, array);
        this.postOrder(current.right, callback, array);
        callback(current);
      }
    } else {
      if (current) {
        this.postOrder(current.left, callback, array);
        this.postOrder(current.right, callback, array);
        array.push(current.data);
      }
      return array;
    }
  }

  height(node) {
    if (node) {
      let left = 0;
      let right = 0;
      if (node.left) {
        left += 1;
        left += this.height(node.left);
      }
      if (node.right) {
        right += 1;
        right += this.height(node.right);
      }
      if (node instanceof TreeNode) return left > right ? left : right;
    }
  }

  depth(node) {
    if (node) {
      let current = this.root;
      let count = 0;
      while (current) {
        if (node.data === current.data) {
          return count;
        } else {
          count += 1;
          current = node.data < current.data ? current.left : current.right;
        }
      }
    }
  }

  isBalanced(node) {
    if (node) {
      if (node.left && node.right) {
        let leftSubtree = this.isBalanced(node.left);
        let rightSubtree = this.isBalanced(node.right);
        if (leftSubtree && rightSubtree) {
          return true;
        } else return false;
      } else if (node.left || node.right) {
        let remainingSubtree = node.left || node.right;
        return remainingSubtree.left || remainingSubtree.right ? false : true;
      } else if (node instanceof TreeNode) return true;
    }
  }
}

const tree = new BalancedBinaryTree([
  1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324,
]);

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
