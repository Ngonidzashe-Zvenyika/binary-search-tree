import TreeNode from './tree-node.js';

// This function takes an array and returns a sorted copy of the array with no duplicated elements;
function removeDuplicatesAndSort(array) {
  const noDuplicates = [];
  for (let i = 0; i < array.length; i += 1) {
    const element = array[i];
    if (!noDuplicates.includes(element)) noDuplicates.push(element);
  }
  const processedArray = noDuplicates.sort((a, b) => (a < b ? -1 : 1));
  return processedArray;
}

// This function determines the structure of a binary tree from a given array and returns the root node;
function buildTree(array, start, end) {
  if (start > end) return null;
  const mid = Math.round((start + end) / 2);
  const node = new TreeNode(array[mid]);
  node.left = buildTree(array, start, mid - 1);
  node.right = buildTree(array, mid + 1, end);
  return node;
}

// This class takes an array and generates a binary tree object which stores a reference to the root node and several useful methods;
export default class BalancedBinaryTree {
  constructor(array) {
    const processedArray = removeDuplicatesAndSort(array);
    this.root = buildTree(processedArray, 0, processedArray.length - 1);
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
        }
        data < current.data
          ? (current = current.left)
          : (current = current.right);
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
      } else if (previous) {
        current.data < previous.data
          ? (previous.left = null)
          : (previous.right = null);
      } else this.root = null;
    }
  }

  find(data) {
    let current = this.root;
    while (current) {
      if (data === current.data) {
        return current;
      }
      current = data < current.data ? current.left : current.right;
    }
  }

  levelOrder(callback) {
    const queue = [this.root];
    const array = [];
    while (queue.length > 0) {
      const current = queue.shift();
      if (current) {
        if (callback) callback(current);
        array.push(current.data);
        if (current.left) queue.push(current.left);
        if (current.right) queue.push(current.right);
      }
    }
    return array;
  }

  inOrder(current, callback, array = []) {
    if (current) {
      this.inOrder(current.left, callback, array);
      if (callback) callback(current);
      array.push(current.data);
      this.inOrder(current.right, callback, array);
    }
    return array;
  }

  preOrder(current, callback, array = []) {
    if (current) {
      if (callback) callback(current);
      array.push(current.data);
      this.preOrder(current.left, callback, array);
      this.preOrder(current.right, callback, array);
    }
    return array;
  }

  postOrder(current, callback, array = []) {
    if (current) {
      this.postOrder(current.left, callback, array);
      this.postOrder(current.right, callback, array);
      if (callback) callback(current);
      array.push(current.data);
    }
    return array;
  }

  height(node) {
    if (node instanceof TreeNode) {
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
      return left > right ? left : right;
    }
  }

  depth(node) {
    if (node instanceof TreeNode) {
      let current = this.root;
      let count = 0;
      while (current) {
        if (node.data === current.data) {
          return count;
        }
        count += 1;
        current = node.data < current.data ? current.left : current.right;
      }
    }
  }

  isBalanced(node) {
    if (node instanceof TreeNode) {
      if (node.left && node.right) {
        const leftSubtree = this.isBalanced(node.left);
        const rightSubtree = this.isBalanced(node.right);
        return leftSubtree && rightSubtree;
      }
      if (node.left || node.right) {
        const remainingSubtree = node.left || node.right;
        return !(remainingSubtree.left || remainingSubtree.right);
      }
      return true;
    }
  }

  rebalance() {
    if (this.isBalanced(this.root)) return;
    if (this.root) {
      const array = this.inOrder(this.root);
      const start = 0;
      const end = array.length - 1;
      this.root = buildTree(array, start, end);
    }
  }
}
