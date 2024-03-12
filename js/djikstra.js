class Dijkstra {
    constructor() {
        this.graphElement = new Graph();
        this.graph = this.graphElement.nodes;
    }

    dijkstra(start) {
        const cost = new Map();
        const pred = new Map();
        const visited = [];
        for (const node of this.graph.entries()) {
            cost.set(node[0], Infinity);
        }
        cost.set(start, 0);

        for (let i = 0; i < this.graph.size; i++) {
            let priorityKey = "";
            let shortestCost = Infinity;
            for (let node of this.graph) { // Find the next node with the smallest cost
                if (!visited.includes(node)) { // Only if not visited before
                    let nodeCost = cost.get(node);
                    if (nodeCost < shortestCost) {
                        shortestCost = nodeCost;
                        priorityKey = node
                    }
                }
            }
            let neighbors = this.graph.get(priorityKey);
            if (this.graph.get(priorityKey).size !== 0) { // If the node has a neighbor
                for (let neighbor of neighbors.entries()) { // For each neighbor check if the cost is smaller than the current cost
                    let key = neighbor[0];
                    let value = neighbor[1];

                    let calcCost = cost.get(priorityKey) + value // cost of the current node + cost to the neighbor
                    if (calcCost < cost.get(key)) {
                        cost.set(key, calcCost);
                        pred.set(key, priorityKey)
                    } // When the new cost is smaller than the current cost set the smaller cost
                }
            }
            visited.push(priorityKey);
        }
        return {cost, pred};
    }

    shortestPath(loadKey, start, end) {
        let importSuccess = this.graphElement.importList(loadKey);
        if (!importSuccess) {
            alert("Import failed please create a Graph first.")
            window.location.href = "/create.html";
        } else {
            const result = this.dijkstra(start);
            const pred = result.pred;
            let path = [end];
            let active = end;
            while (active !== start) {
                path.unshift(pred.get(active));
                active = pred.get(active);
            }
            return path;
        }
    }
}