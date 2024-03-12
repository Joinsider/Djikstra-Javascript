class PriorityQueue {
  constructor() {
    this.items = [];
  }

  enqueue(item, priority) {
    this.items.push({ item, priority });
    this.items.sort((a, b) => a.priority - b.priority);
  }

  dequeue() {
    return this.items.shift().item;
  }

  isEmpty() {
    return this.items.length === 0;
  }
}


class Djikstra {
  constructor() {
    this.nodes = new Map();
  }

  addNode(node) {
    this.nodes.set(node, []);
  }

  addEdge(node1, node2, weight) {
    this.nodes.get(node1).push({ node: node2, weight });
    this.nodes.get(node2).push({ node: node1, weight });
  }

  importList(loadID) {
    const mapArrayString = localStorage.getItem(loadID);
    const importArray = JSON.parse(mapArrayString);
    for (let i = 0; i <= 1; i++) { // On the first run create all nodes and on the second run add all connections
      for (let j = 0; j < importArray.length; j++) { // Run for each node
        let key = importArray[j][0];
        let value = importArray[j][1];
        if (i === 0) {
          this.addNode(key.toString());
        } else if (value.length > 0 && i === 1) { // if it's not an empty map
          for (let k = 0; k < value.length; k++) {
            let neighbor = value[k][0];
            let cost = value[k][1];
            this.addEdge(key.toString(), neighbor.toString(), parseInt(cost)); // Add the connection between the neighbor and the current key
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
    const shortestPath = this.dijkstra(start, end);
    if (shortestPath === null) {
      console.log("No path found");
      return null;
    }else{
        console.log("Shortest path:", shortestPath);
    }
    return shortestPath;
  }

  dijkstra(startNode, endNode) {
    const distances = new Map();
    const previous = new Map();
    const priorityQueue = new PriorityQueue();

    // Initialize distances and priority queue
    for (const node of this.nodes.keys()) {
      distances.set(node, node === startNode ? 0 : Infinity);
      priorityQueue.enqueue(node, distances.get(node));
      previous.set(node, null);
    }

    while (!priorityQueue.isEmpty()) {
      const currentNode = priorityQueue.dequeue();

      if (currentNode === endNode) {
        // Reconstruct the path from endNode to startNode
        const path = [];
        let current = endNode;
        while (current !== null) {
          path.unshift(current);
          current = previous.get(current);
        }
        return path;
      }

      const neighbors = this.nodes.get(currentNode);
      for (const neighbor of neighbors) {
        const newDistance = distances.get(currentNode) + neighbor.weight;
        if (newDistance < distances.get(neighbor.node)) {
          distances.set(neighbor.node, newDistance);
          previous.set(neighbor.node, currentNode);
          priorityQueue.enqueue(neighbor.node, newDistance);

        }
      }
    }

    return null; // No path found
  }
}
