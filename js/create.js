document.getElementById('addButton').addEventListener('click', function() {
    let table = document.getElementById("addTable");
    let newRow = table.insertRow(-1);
    let cell1 = newRow.insertCell(0);
    let cell2 = newRow.insertCell(1);
    let cell3 = newRow.insertCell(2);

    // get current last row and set the ending point of the previous row as the starting point of the new row and the new starting field as readonly
    let lastRow = table.rows[table.rows.length - 2];
    let lastRowEndPoint = lastRow.cells[2].children[0].value;

    if(localStorage['TableID'] === undefined){
        localStorage['TableID'] = 1;
    }

    //set cell1 with the id of startingPoint plus number of starting point
    cell1.innerHTML = "<input type='text' name = 'startPoint' id='" + "startPoint" + localStorage['TableID'] + "' value='' placeholder='e.g. A'>";
    cell2.innerHTML = "<input type='number' name='cost' id='" + "cost" + localStorage['TableID'] + "' value='1'>";
    cell3.innerHTML = "<input type='text' name='endPoint' id='" + "endPoint" + localStorage['TableID'] + "' required placeholder='e.g. B'>";
});

document.getElementById('removeButton').addEventListener('click', function() {
    let table = document.getElementById("addTable");
    if (table.rows.length > 2) { // only delete rows if there are more than 2 rows
        let lastRow = table.rows[table.rows.length - 2];
        table.deleteRow(lastRow.rowIndex);
    }
});

document.getElementById('submit').addEventListener('click', function() {
   // Get table and create adjacency list
    let table = document.getElementById("addTable");
    let adjacencyList = new AdjacencyList();

    // Get all the rows in the table
    let rows = table.rows;
    for (let i = 1; i < rows.length; i++) {
        // Get the starting point, cost and ending point
        let startPoint = rows[i].cells[0].children[0].value;
        let cost = rows[i].cells[1].children[0].value;
        let endPoint = rows[i].cells[2].children[0].value;

        // Add the starting point and ending point to the adjacency list
        if (!adjacencyList.nodes.has(startPoint)) {
            adjacencyList.addNode(startPoint);
            //else if check if the starting point is already in the list and add the ending point to the list of the starting point with the cost
        }
        adjacencyList.checkEdge(startPoint, endPoint, cost);
    }
    localStorage['adjacencyList'] = JSON.stringify(adjacencyList);
    alert("Adjacency List created");
});

document.getElementById('showGraphButton').addEventListener('click', function() {
   if(adjacencyList !== undefined){
       alert("Adjacency List undefinded");
   }else{
       let adjacencyList = localStorage['adjacencyList'] = JSON.parse(adjacencyList);
       adjacencyList.createDisplay(document.getElementById('graphDiv'));
   }

});

class AdjacencyList {
    constructor() {
        this.nodes = new Map();
    }

    addNode(node) {
        this.nodes.set(node, []);
    }

    // get node and check if the edge is already in the list
    checkEdge(source, destination, weight){
        let edge = this.nodes.get(source).find(n => n.node === destination);
        if(edge === undefined){
            this.addEdge(source, destination, weight);
        }
    }

    addEdge(source, destination, weight) {
        this.nodes.get(source).push({ node: destination, weight });
        this.nodes.get(destination).push({ node: source, weight });
    }

    createDisplay(divId) {
        let div = document.getElementById(divId);
        for (let i = 1; i < this.nodes.length; i++) {
            let node = this.nodes[i];
            let nodeDiv = document.createElement('div');
            for(let j = 0; j < node.length; j++){
                let neighbor = node[j];
                let p = document.createElement('p')
                p.innerHTML = node + ' - ' + neighbor.cost + ' -> ' + neighbor.node;
                nodeDiv.appendChild(p);
                nodeDiv.appendChild(document.createElement('br'));
            }
        }
    }
    display() {
        for (const [node, neighbors] of this.nodes) {
            console.log(node, '->', neighbors.map(n => n.node).join(', '));
        }
    }
}
class Djikstra {
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