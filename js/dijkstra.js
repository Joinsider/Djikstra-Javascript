class Dijkstra {
    constructor() {
        this.graphElement = new Graph();
        this.graph = this.graphElement.nodes;
        this.cost = new Map();
        this.pred = new Map();
        this.visited = [];
    }

    findPriority(node) {
        let priorityKey = node;
        let shortestCost = Infinity;
        for (let node of this.graph) { // Find the next node with the smallest cost
            if (!this.visited.includes(node)) { // Only if not visited before
                let nodeCost = this.cost.get(node);
                if (nodeCost < shortestCost) {
                    shortestCost = nodeCost;
                    priorityKey = node
                }
            }
        }
        return priorityKey;
    }

    dijkstra(start) {
        // Initialize for Dijkstra
        for (const node of this.graph.entries()) {
            this.cost.set(node[0], Infinity);
        }
        this.cost.set(start, 0);

        let priorityKey = "";
        for (let i = 0; i < this.graph.size; i++) {
            priorityKey = this.findPriority(priorityKey);

            let neighbors = this.graph.get(priorityKey);
            if (this.graph.get(priorityKey).size !== 0) { // If the node has a neighbor
                for (let neighbor of neighbors.entries()) { // For each neighbor check if the cost is smaller than the current cost
                    let key = neighbor[0];
                    let value = neighbor[1];

                    let calcCost = this.cost.get(priorityKey) + value // cost of the current node + cost to the neighbor
                    if (calcCost < this.cost.get(key)) {
                        this.cost.set(key, calcCost);
                        this.pred.set(key, priorityKey)
                    } // When the new cost is smaller than the current cost set the smaller cost
                }
            }
            this.visited.push(priorityKey);
        }
    }

    shortestPath(loadKey, start, end) {
        let importSuccess = this.graphElement.importList(loadKey);
        if (!importSuccess) {
            alert("Import failed please create a Graph first.")
            window.location.href = "/create.html";
        } else {
            this.dijkstra(start);
            let path = [
                end,
                this.cost.get(end)
            ];
            let active = end;
            while (active !== start) {
                path.unshift(this.pred.get(active));
                active = this.pred.get(active);
            }
            return path;
        }
    }
}