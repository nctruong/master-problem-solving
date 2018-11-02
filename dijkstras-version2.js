class WeightedGraph {
    constructor() {
        this.adjacencyList = {};
    }
    addVertex(vertex){
        if(!this.adjacencyList[vertex]) this.adjacencyList[vertex] = [];
    }
    addEdge(vertex1,vertex2, weight){
        this.adjacencyList[vertex1].push({node:vertex2,weight});
        this.adjacencyList[vertex2].push({node:vertex1, weight});
    }
    Dijkstra(start, finish){
        const nodes = new PriorityQueue(); // to determine which node will be next
        const distances = {}; // list of distances from start to the rest of nodes
        const previous = {}; // list of shortest edges
        let path = [] // to return at end
        let smallest; // the node with smallest value
        // build up initial state. this.adjacencyList was already initialized and added the elements
        for(let vertex in this.adjacencyList){
            if(vertex === start){
                // 0 for the first node
                distances[vertex] = 0;
                nodes.enqueue(vertex, 0);
            } else {
                // Infinity for all other nodes
                distances[vertex] = Infinity;
                nodes.enqueue(vertex, Infinity);
            }
            previous[vertex] = null;
        }
        
        // Main process: traverse nodes
        while(nodes.values.length){
            // smallest is the node with smallest distance in priority queue
            smallest = nodes.dequeue().val; // have to dequeue so that next time won't be counted
            // Every time a node chosen, it will be dequeued...until there is only one node(the target) in queue => smallest === finish
            if(smallest === finish){
                //WE ARE DONE
                //BUILD UP PATH TO RETURN AT END
                // TRAVERSE NODES FROM END TO START
                while(previous[smallest]){ // previous is an array of shortest edges from start
                    path.push(smallest);
                    smallest = previous[smallest];
                }
                break;
            } 
            // smallest is current node inspected
            if(smallest || distances[smallest] !== Infinity){
                // neighbor = index of array (number) => good way to loop an array with length is not same
                for(let neighbor in this.adjacencyList[smallest]){ // neighbor is "0"
                    //find neighboring node
                    let nextNode = this.adjacencyList[smallest][neighbor]; // nextNode is { node: , weight: }
                    //calculate new distance to neighboring node
                    let candidate = distances[smallest] + nextNode.weight;
                    let nextNeighbor = nextNode.node;

                    // change value if new value is lesser than current value at node
                    if(candidate < distances[nextNeighbor]){
                        //updating new smallest distance to neighbor
                        distances[nextNeighbor] = candidate;
                        //updating previous - How we got to neighbor, draw a "red line" to mark the path that smallet to nextNeighbor
                        previous[nextNeighbor] = smallest; // {A: null, B: "A", C: null, D: null, E: null, …}
                        //enqueue in priority queue with new priority
                        nodes.enqueue(nextNeighbor, candidate);
                    }
                }
            }
        }
        return path.concat(smallest).reverse();     
    }
}

// In order to dequeue the vertex which has mallest value
class PriorityQueue {
    constructor(){
        this.values = [];
    }
    enqueue(val, priority){
        let newNode = new Node(val, priority);
        this.values.push(newNode);
        this.bubbleUp();
    }
    bubbleUp(){
        let idx = this.values.length - 1;
        const element = this.values[idx];
        while(idx > 0){
            let parentIdx = Math.floor((idx - 1)/2);
            let parent = this.values[parentIdx];
            if(element.priority >= parent.priority) break;
            this.values[parentIdx] = element;
            this.values[idx] = parent;
            idx = parentIdx;
        }
    }
    dequeue(){
        const min = this.values[0];
        const end = this.values.pop();
        if(this.values.length > 0){
            this.values[0] = end;
            this.sinkDown();
        }
        return min;
    }
    sinkDown(){
        let idx = 0;
        const length = this.values.length;
        const element = this.values[0];
        while(true){
            let leftChildIdx = 2 * idx + 1;
            let rightChildIdx = 2 * idx + 2;
            let leftChild,rightChild;
            let swap = null;

            if(leftChildIdx < length){
                leftChild = this.values[leftChildIdx];
                if(leftChild.priority < element.priority) {
                    swap = leftChildIdx;
                }
            }
            if(rightChildIdx < length){
                rightChild = this.values[rightChildIdx];
                if(
                    (swap === null && rightChild.priority < element.priority) || 
                    (swap !== null && rightChild.priority < leftChild.priority)
                ) {
                   swap = rightChildIdx;
                }
            }
            if(swap === null) break;
            this.values[idx] = this.values[swap];
            this.values[swap] = element;
            idx = swap;
        }
    }
}

class Node {
    constructor(val, priority){
        this.val = val;
        this.priority = priority;
    }
}

var graph = new WeightedGraph()
graph.addVertex("A");
graph.addVertex("B");
graph.addVertex("C");
graph.addVertex("D");
graph.addVertex("E");
graph.addVertex("F");

graph.addEdge("A","B", 4);
graph.addEdge("A","C", 2);
graph.addEdge("B","E", 3);
graph.addEdge("C","D", 2);
graph.addEdge("C","F", 4);
graph.addEdge("D","E", 3);
graph.addEdge("D","F", 1);
graph.addEdge("E","F", 1);

graph.Dijkstra("A", "E");

console.log(graph.adjacencyList);
// node dijkstras-version2.js
// { A: [ { node: 'B', weight: 4 }, { node: 'C', weight: 2 } ],
//   B: [ { node: 'A', weight: 4 }, { node: 'E', weight: 3 } ],
//   C:
//    [ { node: 'A', weight: 2 },
//      { node: 'D', weight: 2 },
//      { node: 'F', weight: 4 } ],
//   D:
//    [ { node: 'C', weight: 2 },
//      { node: 'E', weight: 3 },
//      { node: 'F', weight: 1 } ],
//   E:
//    [ { node: 'B', weight: 3 },
//      { node: 'D', weight: 3 },
//      { node: 'F', weight: 1 } ],
//   F:
//    [ { node: 'C', weight: 4 },
//      { node: 'D', weight: 1 },
//      { node: 'E', weight: 1 } ] }



