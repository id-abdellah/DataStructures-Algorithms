class TrieNode {
    public isEnd: boolean;
    public children: Record<string, TrieNode>;
    constructor() {
        this.children = {};
        this.isEnd = false;
    }
}

class Trie {
    public root: TrieNode;

    constructor() {
        this.root = new TrieNode()
    }

    print(node = this.root, prefix = "", isLast = true) {
        const keys = Object.keys(node.children);
        keys.forEach((ch, i) => {
            const isChildLast = i === keys.length - 1;
            const connector = isChildLast ? "└─ " : "├─ ";
            const nextPrefix = prefix + (isLast ? "   " : "│  ");

            const mark = node.children[ch].isEnd ? " *" : "";
            console.log(prefix + connector + ch + mark);

            this.print(node.children[ch], nextPrefix, isChildLast);
        });
    }

    insert(word: string) {
        let current: TrieNode = this.root;
        for (const c of word) {
            if (!(c in current.children)) {
                current.children[c] = new TrieNode();
            }
            current = current.children[c]
        }
        current.isEnd = true;
    }

    contains(word: string): boolean {
        let current: TrieNode = this.root;
        for (const c of word) {
            if (!(c in current.children)) return false;
            current = current.children[c]
        }
        return current.isEnd
    }

    startsWith(prefix: string): boolean {
        let current: TrieNode = this.root;
        for (const c of prefix) {
            if (!(c in current.children)) {
                return false;
            }
            current = current.children[c]
        }
        return true
    }

    find(prefix: string) {
        let current: TrieNode = this.root;
        let result: string[] = [];
        for (const c of prefix) {
            if (!(c in current.children)) {
                return [];
            }
            current = current.children[c]
        }

        dfs(current, prefix);

        return result;

        function dfs(node: TrieNode, path: string): void {
            if (node.isEnd) result.push(path);
            for (const ch in node.children) {
                dfs(node.children[ch], path + ch)
            }
        }
    }
}


/* some tests */

const myTrie = new Trie();

myTrie.insert("cat");
myTrie.insert("car");
myTrie.insert("cap");
myTrie.insert("cup");
myTrie.insert("cut");
myTrie.insert("cuba");
myTrie.insert("apple");
myTrie.insert("application");
myTrie.insert("applications");
myTrie.insert("dog");
myTrie.insert("ape");

console.log(myTrie.find("ca"))
console.log(myTrie.find("d"))

myTrie.print(myTrie.root)