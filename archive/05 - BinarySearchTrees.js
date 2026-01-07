import { Queue } from "./04 - Queue.js"

class Node {
    constructor(value) {
        this.value = value;
        this.right = null;
        this.left = null;
    }
}

class BinarySearchTree {

    constructor() {
        this.root = null
    }


    print(node = this.root, prefix = "", isLeft = true) {
        if (!this.root) return;
        if (node.right) {
            this.print(node.right, prefix + (isLeft ? "│   " : "    "), false);
        }

        console.log(prefix + (isLeft ? "└── " : "┌── ") + node.value);

        if (node.left) {
            this.print(node.left, prefix + (isLeft ? "    " : "│   "), true);
        }
    }

    // O(Log n)
    insert(value) {
        let newNode = new Node(value);
        if (!this.root) {
            this.root = newNode;
            return this;
        };

        let current = this.root;
        while (true) {
            if (value === current.value) return null;
            const curValue = current.value;
            const right = current.right;
            const left = current.left;
            if (value < curValue) {
                if (!left) {
                    current.left = newNode;
                    return this;
                } else {
                    current = current.left
                };
            } else if (value > curValue) {
                if (!right) {
                    current.right = newNode;
                    return this;
                } else {
                    current = current.right;
                }
            }
        }
    }

    // O(Log n)
    find(value) {
        if (!this.root) return null;
        let current = this.root;

        while (current) {
            const currentValue = current.value;
            if (value === currentValue) return current.value;
            if (value > currentValue) {
                current = current.right;
            }
            if (value < currentValue) {
                current = current.left;
            }
        }
        return null
    }

    contains(value) {
        return !!this.find(value)
    }

    remove(value) {
        if (!this.root || value === undefined) return null;
        this.root = this.#removeHelper(this.root, value);
    }

    #removeHelper(root, value) {
        if (root === null) return root;

        if (value < root.value) {
            root.left = this.#removeHelper(root.left, value);
        } else if (value > root.value) {
            root.right = this.#removeHelper(root.right, value)
        } else {
            if (!root.left) {
                return root.right
            }
            if (!root.right) {
                return root.left
            }
            root.value = this.getSuccessor(root.right);
            root.right = this.#removeHelper(root.right, root.value)
        }
        return root;
    }


    getSuccessor(root) {
        while (root.left) {
            root = root.left
        }
        return root.value;
    }

    getPredecessor(root) {
        while (root.right) {
            root = root.right
        }
        return root.value;
    }

    min() {
        if (!this.root) return null;
        let current = this.root;
        while (current.left) {
            current = current.left;
        }
        return current.value
    }

    max() {
        if (!this.root) return null;
        let current = this.root;
        while (current.right) {
            current = current.right
        }

        return current.value
    }

    depth(value) {
        if (!this.root) return null;
        let current = this.root;
        let count = 0;
        while (current) {
            if (value === current.value) return count;
            if (value > current.value) {
                current = current.right;
            } else if (value < current.value) {
                current = current.left;
            }
            count++;
        }
        return null;
    }

    height(node = this.root) {
        if (!node) return -1;
        return 1 + Math.max(this.height(node.left), this.height(node.right));
    }

    /**
     * Tree Traversal
     */

    BFS() {
        if (!this.root) return null;
        let queue = new Queue();
        queue.enqueue(this.root);
        let visited = [];
        while (!queue.isEmpty()) {
            let dequeued = queue.dequeue();
            visited.push(dequeued.value);
            if (dequeued.left) queue.enqueue(dequeued.left);
            if (dequeued.right) queue.enqueue(dequeued.right);
        }
        return visited;
    }

    DFSPreOrder() {
        if (!this.root) return null;
        let visited = [];
        let current = this.root;

        function traverse(node) {
            visited.push(node.value);
            if (node.left) traverse(node.left);
            if (node.right) traverse(node.right);
        }

        traverse(current);
        return visited;
    }

    DFSPostOrder() {
        if (!this.root) return null;
        let visited = [];
        let current = this.root;

        function traverse(node) {
            if (node.left) traverse(node.left);
            if (node.right) traverse(node.right);
            visited.push(node.value)
        }
        traverse(current);
        return visited;
    }

    DFSInOrder() {
        if (!this.root) return null;
        let visited = [];
        let current = this.root;

        function traverse(node) {
            if (node.left) traverse(node.left);
            visited.push(node.value);
            if (node.right) traverse(node.right);
        }
        traverse(current);
        return visited;
    }
}