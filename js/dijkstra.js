class Dijkstra {
    constructor() {
        this.graphElement = new Graph();
        this.graph = new Map();
        this.cost = new Map();
        this.pred = new Map();
        this.visited = [];
    }

    findPriority() {
        let priorityKey = null;
        let shortestCost = Infinity;
        for (const node of this.cost.entries()) {
            if (!this.visited.includes(node[0]) && node[1] < shortestCost) {
                shortestCost = node[1];
                priorityKey = node[0];
            }
        }
        return priorityKey;
    }

    dijkstra(start) {
        // Initialize for Dijkstra
        for (const node of this.graph.entries()) {
            this.cost.set(node[0], Infinity);
            this.pred.set(node[0], null);
            console.log("Node: " + node[0] + " Cost: " + this.cost.get(node[0]) + " Pred: " + this.pred.get(node[0]));
        }
        this.cost.set(start, 0);
        console.log("Start: " + start + " Cost: " + this.cost.get(start) + " Pred: " + this.pred.get(start));

        let priorityKey = start;

        while (priorityKey !== null && this.visited.length < this.graph.size) {
            let neighbors = this.graph.get(priorityKey); // Returns the Neighbor Map
            console.log("PriorityKey: " + priorityKey + " Neighbors: " + JSON.stringify(Array.from(neighbors)));
            if (neighbors.size !== 0 /*JSON.stringify(Array.from(neighbors))!== "[]"*/) {
                for (let n of neighbors.entries()) {
                    let key = n[0];
                    let value = n[1];

                    let newCost = this.cost.get(priorityKey) + value;
                    console.log("Neighbor: " + key + " Cost: " + value + " NewCost: " + newCost + " CurrentCost: " + this.cost.get(key) + " Pred: " + this.pred.get(key));
                    if (this.cost.get(key) > newCost) {
                        this.cost.set(key, newCost);
                        this.pred.set(key, priorityKey);
                        console.log("--> Neighbor: " + key + " Cost: " + value + " NewCost: " + newCost + " CurrentCost: " + this.cost.get(key) + " Pred: " + this.pred.get(key));
                    }
                }
            }
            this.visited.push(priorityKey);
            priorityKey = this.findPriority();
            console.log("PriorityKey: " + priorityKey + " Visited: " + this.visited.toString());
        }
    }

    shortestPath(loadKey, start, end) {
        let importSuccess = this.graphElement.importList(loadKey);
        this.graph = this.graphElement.nodes;
        if (/*this.graphElement.nodes !== this.graph ||*/ !importSuccess) {
            alert("Import failed please create a Graph first.")
            window.location.href = "/create.html";
        } else {
            this.dijkstra(start);
            let path = [end.toString()];
            let active = end;
            for (let i = 0; i < this.pred.size; i++) {
                let predNode = this.pred.get(active);
                if (predNode === null) {
                    break;
                } else {
                    path.unshift(predNode);
                    active = predNode;
                }
            }
            return path;
        }
    }
}