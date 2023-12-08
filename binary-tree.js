/** BinaryTreeNode: node for a general tree. */

class BinaryTreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

class BinaryTree {
  constructor(root = null) {
    this.root = root;
  }

  /** minDepth(): return the minimum depth of the tree -- that is,
   * the length of the shortest path from the root to a leaf. */

  minDepth() {
    if (!this.root) return 0;



    function calcMinDepth(node, level = 1) {
      if (node.left === null && node.right === null) return level;

      if (node.left === null) return calcMinDepth(node.right, level + 1);
      if (node.right === null) return calcMinDepth(node.left, level + 1);

      return Math.min(calcMinDepth(node.left, level + 1), calcMinDepth(node.right, level + 1));
    }

    return calcMinDepth(this.root);

  }

  /** maxDepth(): return the maximum depth of the tree -- that is,
   * the length of the longest path from the root to a leaf. */

  maxDepth() {
    if (!this.root) return 0;

    function calcMaxDepth(node, level = 1) {
      if (node.left === null && node.right === null) return level;

      if (node.left === null) return calcMaxDepth(node.right, level + 1);
      if (node.right === null) return calcMaxDepth(node.left, level + 1);

      return Math.max(calcMaxDepth(node.left, level + 1), calcMaxDepth(node.right, level + 1));
    }

    return calcMaxDepth(this.root);

  }

  /** maxSum(): return the maximum sum you can obtain by traveling along a path in the tree.
   * The path doesn't need to start at the root, but you can't visit a node more than once. */

  maxSum() {
    if (!this.root) return 0;

    let sum = 0;

    function calculateMaxSum(node) {

      if (node === null) return 0;

      let leftSum = calculateMaxSum(node.left);
      let rightSum = calculateMaxSum(node.right);

      sum = Math.max(sum, leftSum + node.val + rightSum);
      return Math.max(leftSum + node.val, rightSum + node.val);
    }

    calculateMaxSum(this.root);

    return sum;
  }

  /** nextLarger(lowerBound): return the smallest value in the tree
   * which is larger than lowerBound. Return null if no such value exists. */

  nextLarger(lowerBound) {

    let valuesTree = [];

    function getNodes(node) {

      if (node) {
        valuesTree.push(node.val);
        getNodes(node.left);
        getNodes(node.right);
      }
    }

    getNodes(this.root);

    if (valuesTree) {
      valuesTree.sort((a, b) => a - b);

      for (let value of valuesTree) {
        if (value > lowerBound) return value;
      }
    }
    return null;

  }

  /** Further study!
   * areCousins(node1, node2): determine whether two nodes are cousins
   * (i.e. are at the same level but have different parents. ) */

  areCousins(node1, node2) {

  }

  /** Further study!
   * serialize(tree): serialize the BinaryTree object tree into a string. */

  static serialize(tree) {
    let valuesTree = [];

    function getNodes(node) {

      if (node) {
        valuesTree.push(node.val);
        getNodes(node.left);
        getNodes(node.right);
      }
      valuesTree.push('#');
    }

    getNodes(tree.root);
    return valuesTree.join(" ");
  }

  /** Further study!
   * deserialize(stringTree): deserialize stringTree into a BinaryTree object. */

  static deserialize(stringTree) {

    if (!stringTree) return null;

    let valuesTree = stringTree.split(" ");

    function createTree() {
      if (valuesTree.length) {
        const currentValue = valuesTree.shift();

        if (currentValue === "#") return null;

        let currentNode = new BinaryTreeNode(+currentValue);
        currentNode.left = createTree();
        currentNode.right = createTree();

        return currentNode;
      }
    }

    const root = createTree();
    return new BinaryTree(root);

  }

  /** Further study!
   * lowestCommonAncestor(node1, node2): find the lowest common ancestor
   * of two nodes in a binary tree. */

  lowestCommonAncestor(node1, node2) {

  }
}

module.exports = { BinaryTree, BinaryTreeNode };
