import { Queue } from "./04 - Queue"

class BSTNode<G> {
    public right: BSTNode<G> | null
    public left: BSTNode<G> | null
    public value: G
    constructor(v: G) {
        this.right = null
        this.left = null
        this.value = v
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


    public insert(v: T) {
        const newNode = new BSTNode<T>(v)
        if (!this.root) {
            this.root = newNode
            return this
        }

        let current = this.root
        while (current) {
            if (current.value === newNode.value) return null
            if (newNode.value > current.value) {
                if (current.right) {
                    current = current.right
                } else {
                    current.right = newNode
                    return this
                }
            } else if (newNode.value < current.value) {
                if (current.left) {
                    current = current.left
                } else {
                    current.left = newNode
                    return this
                }
            }
        }
    }

    public find(v: T): BSTNode<T> | null {
        if (!this.root) return null

        let current: BSTNode<T> | null = this.root
        while (current) {
            if (current.value === v) return current;
            if (v > current.value) {
                current = current.right
            } else if (v < current.value) {
                current = current.left
            }
        }

        return null
    }

    public contains(v: T) {
        return !!this.find(v)
    }

    private _getParent(node: BSTNode<T>): BSTNode<T> | null {
        if (!this.root || this.root === node) return null;
        let current: BSTNode<T> | null = this.root

        while (current) {
            if (current.left === node || current.right === node) return current
            if (node.value > current.value) {
                current = current.right
            } else if (node.value < current.value) {
                current = current.left
            }
        }

        return null
    }

    public BFS(returnNodes?: boolean) {
        if (!this.root) return []

        let q = new Queue<BSTNode<T>>()
        q.enqueue(this.root)

        let visited: (BSTNode<T> | T)[] = []

        while (q.size !== 0) {
            let dequeued = q.dequeue()!
            visited.push(returnNodes ? dequeued : dequeued.value)
            if (dequeued.left) q.enqueue(dequeued.left)
            if (dequeued.right) q.enqueue(dequeued.right)
        }
        return visited
    }

    public DFS(which: "inorder" | "preorder" | "postorder", returnNodes?: boolean): (BSTNode<T> | T)[] {
        return {
            "inorder": () => {
                if (!this.root) return [];

                let visited: (BSTNode<T> | T)[] = [];
                let current = this.root

                function traverse(node: BSTNode<T> | null) {
                    if (!node) return
                    if (node.left) traverse(node.left)
                    visited.push(returnNodes ? node : node.value)
                    if (node.right) traverse(node.right)
                }
                traverse(current)
                return visited
            },
            "preorder": () => {
                if (!this.root) return [];

                let visited: (BSTNode<T> | T)[] = [];
                let current = this.root

                function traverse(node: BSTNode<T> | null) {
                    if (!node) return
                    visited.push(returnNodes ? node : node.value)
                    if (node.left) traverse(node.left)
                    if (node.right) traverse(node.right)
                }
                traverse(current)
                return visited
            },
            "postorder": () => {
                if (!this.root) return [];

                let visited: (BSTNode<T> | T)[] = [];
                let current = this.root

                function traverse(node: BSTNode<T> | null) {
                    if (!node) return
                    if (node.left) traverse(node.left)
                    if (node.right) traverse(node.right)
                    visited.push(returnNodes ? node : node.value)
                }
                traverse(current)
                return visited
            }
        }[which]()
    }

}


const bst = new BinarySearchTree<number>();

[50, 17, 72, 12, 23, 54, 76, 9, 14, 19, 67, 80, 51].forEach(e => bst.insert(e))

bst.print()

console.log("BFS", bst.BFS())
console.log("DFS", bst.DFS("inorder"))
console.log("DFS", bst.DFS("preorder"))
console.log("DFS", bst.DFS("postorder"))