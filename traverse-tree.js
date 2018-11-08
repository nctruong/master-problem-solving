// mistakes: 
// - undefined has "ed"
// - forgot to add let before variables
class Node {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
    }

    left(v) {
        this.left = new Node(v);
    }

    right(v) {
        this.right = new Node(v);
    }
}

class NodeStack {
    constructor() {
        this.values = [];
    }
    enqueue(node) {
        this.values.push(node);
    }
    dequeue() {
        return this.values.pop();
    }
    last(){
        return this.values[this.values.length  - 1]
    }
    isEmpty(){
        return (this.values.length === 0);
    }
    stringify(){
        return this.values.map((v,k) => { return v.value }).join();
    }
}

class TraverseTree {
    constructor(root_node) {
        this.root_node = root_node;
        this.nodes_visited = {};
        this.result = [];
    }

    traverse(){
        let stack = new NodeStack();
        stack.enqueue(this.root_node);
        this.result.push(this.root_node.value);
        while(!stack.isEmpty()) {
            console.log(`\n---visited: ${JSON.stringify(this.nodes_visited)}`);
            // dequeue a element, if:
            // - enqueue one more element => next time will traverse on new node (dequeue).
            // - not enqueue any element => next time will track back the old node.
            let node = stack.last();
            console.log(`------inspecting ${node.value}`)
            
            if (this.nodes_visited[node.value] === true) {
                stack.dequeue();
            } else {
                this.nodes_visited[node.value] = true;
            }
            // going left if left node exists and not visited yet
            if (this._left_not_visited_yet(node)) {
                    // enqueue for next inspection
                    stack.enqueue(node.left);
                    // add to result
                    this.result.push(node.left.value);
            }
            // going right if left node not exists or it visited and right node exists
            if (this._right_not_visited_yet(node)) {
                    stack.enqueue(node.right);
                    this.result.push(node.right.value);
            }
            // track back if this is leaf
            if (this._is_leaf(node)) {
                // not enqueue so it track back
                console.log(`------this is leaf: ${node.value}`);
            }

        }
        return this.result;
    }

    _left_not_visited_yet(node){
        return (node.left !== null) && (this.nodes_visited[node.left.value] === undefined);
    }

    _right_not_visited_yet(node){
        return ((node.right !== null) && 
                    (this.nodes_visited[node.right.value] === undefined) &&
                        ((node.left === null) || (this.nodes_visited[node.left.value] === true)));
    }

    _is_leaf(node){
        return (node.left === null) && (node.right === null);
    }
}
// initialize nodes
root_node = new Node(25);
n20 = new Node(20);
n10 = new Node(10);
n22 = new Node(22);
n5 = new Node(5);
n12 = new Node(12);
n1 = new Node(1);
n8 = new Node(8);
n15 = new Node(15);
n36 = new Node(36);
n30 = new Node(30);
n40 = new Node(40);
n28 = new Node(28);
n38 = new Node(38);
n48 = new Node(48);
n45 = new Node(45);
n50 = new Node(50);

// make tree
root_node.left = n20;
root_node.right = n36;
n20.left = n10;
n20.right = n22;
n10.left = n5;
n10.right = n12;
n5.left = n1;
n5.right = n8;
n12.right = n15;

n36.left = n30;
n36.right = n40;
n30.left = n28;
n40.left = n38;
n40.right = n48;
n48.left = n45;
n48.right = n50;

let tree = new TraverseTree(root_node);
console.log(tree.traverse());
