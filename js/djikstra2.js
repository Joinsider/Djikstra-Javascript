class Node {
  constructor(val, priority) {
    this.val = val;
    this.priority = priority;
  }
}

class PriorityQueue {

  constructor() {
    this.values = []
  }

  //
  enqueue(val, priority) {
    let newNode = new Node(val, priority);
    this.values.push(newNode);
    this.bubbleUp();
  }

  bubbleUp() {
    let idx = this.values.length - 1;
    const element = this.values[idx];

    while (idx > 0) {
      let parentIdx = Math.floor((idx - 1) / 2);
      let parent = this.values[parentIdx];
      if (element.priority >= parent.priority) break;
      this.values[parentIdx] = element;
      this.values[idx] = parent;
      idx = parentIdx;
    }
  }

  dequeue() {
    const min = this.values[0];
    const end = this.values.pop();
    if (this.values.length > 0) {
      this.values[0] = end;
      this.sinkDown();
    }
    return min;

  }

  sinkDown() {
    let idx = 0;
    const length = this.values.length;
    const element = this.values[0];
    while (true) {
      let leftChildIdx = 2 * idx + 1;
      let rightChildIdx = 2 * idx + 2;
      let leftChild, rightChild;
      let swap = null;
      if (leftChildIdx < length) {
        leftChild = this.values[leftChildIdx];
        if (leftChild.priority < element.priority) {
          swap = leftChildIdx;
        }
      }
      if (rightChildIdx < length) {
        rightChild = this.values[rightChildIdx];
        if (
            (swap === null && rightChild.priority < element.priority) ||
            (swap !== null && rightChild.priority < leftChild.priority)
        ) {
          swap = rightChildIdx;
        }
      }
      if (swap === null) break;
      this.values[idx] = this.values[swap];
      this.values[swap] = element;
      idx = swap;
    }

  }
}


class Djikstra2 {
  constructor() {
    this.graph = {};
  }

  addVertex(vertex) {
    if (!this.graph[vertex]) this.graph[vertex] = [];
  }

  addEdge(vertex1, vertex2, weight) {
    this.graph[vertex1].push({node: vertex2, weight})
    this.graph[vertex2].push({node: vertex1, weight})
  }

  importList(loadID) {
    const mapArrayString = localStorage.getItem(loadID);
    const importArray = JSON.parse(mapArrayString);
    for (let i = 0; i <= 1; i++) { // On the first run create all nodes and on the second run add all connections
      for (let j = 0; j < importArray.length; j++) { // Run for each node
        let key = importArray[j][0];
        let value = importArray[j][1];
        if (i === 0) {
          this.addVertex(key);
        } else if (value.length > 0 && i === 1) { // if it's not an empty map
          for (let k = 0; k < value.length; k++) {
            let neighbor = value[k][0];
            let cost = value[k][1];
            this.addEdge(key, neighbor, cost); // Add the connection between the neighbor and the current key
          }
        }
      }
    }

    if (importArray.toString() === "") {
      console.log("No graph found");
      return false;
    } else {
      console.log("Graph import successful");
      return true;
    }
  }

  shortestDist(loadKey, start, end) {
    let importSuccess = this.importList(loadKey);
    if (!importSuccess) {
      alert("Import failed");
      window.location.href = '/create.html';
    }
    return this.dijkstra(start, end);
  }

  dijkstra(start, finish) {
    const nodes = new PriorityQueue();
    const distances = {};
    const previous = {};
    let path = [] // to return at end
    let smallest;

    // build up initial state
    for (let vertex in this.graph) {
      if (vertex === start) {
        nodes.enqueue(vertex, 0);
        distances[vertex] = 0;
      } else {
        distances[vertex] = Infinity;
        nodes.enqueue(vertex, Infinity);
      }
      previous[vertex] = null;
    }

    // as long as any node is unvisited
    while (nodes.values.length) {
      smallest = nodes.dequeue().val;
      if (smallest === finish) {
        while (previous[smallest]) {
          path.push(smallest);
          smallest = previous[smallest];
        }
      }
      if (smallest || distances[smallest] !== Infinity) {
        for (let neighbor in this.graph[smallest]) {
          // find neighboring node
          let nextNode = this.graph[smallest][neighbor];
          console.log(nextNode);
          // calculate new distance to neighboring node
          let candidate = distances[smallest] + nextNode.weight;
          let nextNeighbor = nextNode.node;

          if (candidate < distances[nextNeighbor]) {
            // updating new smallest distance to neighbor
            distances[nextNeighbor] = candidate;
            // updating previous – How we got to neighbor
            previous[nextNeighbor] = smallest;
            // enqueue in priority queue with new priority
            nodes.enqueue(nextNeighbor, candidate);
          }
        }
      }

    }
    return path.concat(smallest).reverse();
  }
}
