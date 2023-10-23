import prettyPrint from './print.js';
import BalancedBinaryTree from './binary-tree.js';

// This function generates a random array that will be converted into a binary search tree;
function getRandomizedArray() {
  let count = 20;
  const array = [];
  while (count > 0) {
    const num = Math.round(Math.random() * 100);
    array.push(num);
    count -= 1;
  }
  return array;
}

const tree = new BalancedBinaryTree(getRandomizedArray());

// Test the binary tree's methods;
prettyPrint(tree.root);
console.log('Balanced:', tree.isBalanced(tree.root));
console.log('Level-Order:', tree.levelOrder());
console.log('Pre-Order', tree.preOrder(tree.root));
console.log('Post-Order', tree.postOrder(tree.root));
console.log('In-Order', tree.inOrder(tree.root));
console.log('Above output is after initializtion');

tree.insert(110);
tree.insert(2000);
tree.insert(1842);
tree.insert(4223);
tree.insert(232);
tree.insert(2320);
tree.insert(8908);

prettyPrint(tree.root);
console.log('Balanced:', tree.isBalanced(tree.root));
console.log('Above output is after insertion');

tree.delete(2000);
tree.delete(1842);
tree.delete(232);

prettyPrint(tree.root);
console.log('Balanced:', tree.isBalanced(tree.root));
console.log('Above output is after deletion');

tree.rebalance();

prettyPrint(tree.root);

console.log('Height of 110:', tree.height(tree.find(110)));
console.log('Depth of 4223:', tree.depth(tree.find(4223)));
console.log('Balanced:', tree.isBalanced(tree.root));
console.log('Level-Order:', tree.levelOrder());
console.log('Pre-Order', tree.preOrder(tree.root));
console.log('Post-Order', tree.postOrder(tree.root));
console.log('In-Order', tree.inOrder(tree.root));
console.log('Above output is after rebalancing');
