import { Queue } from "./04 - Queue"

class BSTNode<T> {
    public value: T
    public right: BSTNode<T> | null
    public left: BSTNode<T> | null
    public parent: BSTNode<T> | null

    constructor(value: T) {
        this.value = value
        this.right = null;
        this.left = null;
        this.parent = null
    }
}

class BinarySearchTree<T> {
    public root: BSTNode<T> | null

    constructor() {
        this.root = null
    }

    public print(node = this.root, prefix = "", isLeft = true) {
        if (!this.root) return;
        if (node && node.right) {
            this.print(node.right, prefix + (isLeft ? "│   " : "    "), false);
        }
        console.log(prefix + (isLeft ? "└── " : "┌── ") + node!.value);
        if (node && node.left) {
            this.print(node.left, prefix + (isLeft ? "    " : "│   "), true);
        }
    }

    public insert(value: T): boolean {
        const newNode = new BSTNode<T>(value)

        if (this.root == null) {
            this.root = newNode
            return true
        }

        let current = this.root

        while (true) {
            if (value > current.value) {
                if (current.right == null) {
                    current.right = newNode
                    current.right.parent = current
                    return true
                } else {
                    current = current.right
                }
            } else if (value < current.value) {
                if (current.left == null) {
                    current.left = newNode
                    current.left.parent = current
                    return true
                } else {
                    current = current.left
                }
            } else {
                return false
            }
        }
    }

    public contains(value: T): boolean {
        if (this.root == null) return false
        let current: BSTNode<T> | null = this.root

        while (current) {
            if (value == current.value) return true
            if (value > current.value) {
                current = current.right
            } else if (value < current.value) {
                current = current.left
            }
        }
        return false
    }


    public min(): T | null {
        if (this.root == null) return null
        let current: BSTNode<T> = this.root
        while (current.left != null) {
            current = current.left
        }
        return current.value
    }

    public max(): T | null {
        if (this.root == null) return null
        let current: BSTNode<T> = this.root
        while (current.right != null) {
            current = current.right
        }
        return current.value
    }

    /* Traversal */

    public inOrder(): T[] {
        if (!this.root) return []
        let visited: T[] = [];
        let current = this.root
        function traverse(node: BSTNode<T> | null) {
            if (node && node.left !== null) traverse(node.left)
            if (node) visited.push(node.value)
            if (node && node.right !== null) traverse(node.right)
        }
        traverse(current)
        return visited;
    }

    public preOrder(): T[] {
        if (!this.root) return []
        let visited: T[] = [];
        let current = this.root
        function traverse(node: BSTNode<T> | null) {
            if (node) visited.push(node.value)
            if (node && node.left !== null) traverse(node.left)
            if (node && node.right !== null) traverse(node.right)
        }
        traverse(current)
        return visited;
    }

    public postOrder(): T[] {
        if (!this.root) return []
        let visited: T[] = [];
        let current = this.root
        function traverse(node: BSTNode<T> | null) {
            if (node && node.left !== null) traverse(node.left)
            if (node && node.right !== null) traverse(node.right)
            if (node) visited.push(node.value)
        }
        traverse(current)
        return visited;
    }

    public levelOrder(): T[] {
        if (!this.root) return [];
        let queue: Queue<BSTNode<T>> = new Queue<BSTNode<T>>();
        queue.enqueue(this.root);
        let visited: T[] = [];
        while (queue.size !== 0) {
            let firstItem: BSTNode<T> = queue.dequeue() as BSTNode<T>
            visited.push(firstItem.value)
            if (firstItem.left) queue.enqueue(firstItem.left)
            if (firstItem.right) queue.enqueue(firstItem.right)
        }
        return visited
    }
}


const bst = new BinarySearchTree<number>();

bst.insert(10)
bst.insert(14)
bst.insert(8)
bst.insert(9)
bst.insert(7)
bst.insert(12)
bst.insert(13)
bst.insert(11)
bst.insert(15)

// console.log("in order:", bst.inOrder())
// console.log("pre order:", bst.preOrder())
// console.log("post order:", bst.postOrder())
// console.log("level order:", bst.levelOrder())

bst.print()