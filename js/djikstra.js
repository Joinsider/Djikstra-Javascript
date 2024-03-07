class Djikstra {
    constructor() {
        this.graph = new Map();
        this.cost = new Map();
        this.visited = [];
        this.previous = new Map();
    }

    graphToDjikstra(graph) {
        this.graph = graph
    };

    initialize(startingPoint) {
        let keys = this.graph.keys();
        for (let key of keys) {
            if (key === startingPoint) {
                this.cost.set(key, 0);
                this.previous.set(key, key);
            } else {
                this.cost.set(key, Infinity);
                this.previous.set(key, "");
            }
            this.visited.set(key, 1);
        }
    }

    findNext() {
        let nextKey = "";
        let nextCost = -1;
        this.cost.foreach(function (value, key) {
            if (value < nextCost) {
                nextKey = key;
            }
        })
        this.active = nextKey;
    }

    findCostToNeighbors() {
        let neighbors = this.graph.get(this.active);
        for (let key of neighbors.keys()) {
            if (!this.visited.includes(key)) {
                let currentCost = this.cost.get(key);
                let calculatedCost = this.cost.get(this.active) + neighbors.get(key);

                if (calculatedCost < currentCost) {
                    this.cost.set(key, calculatedCost);
                    this.previous.set(key, this.active);
                }
            }
        }
        this.visited.push(this.active);
    }

    findPath(startingPoint, endPoint) {
        if (!this.graph.has(startingPoint)) {
            alert("Enter StartingPoint which is in the Graph");
            return;
        } else if (!this.graph.has(endPoint)) {
            alert("Enter EndPoint which is in the Graph");
            return;
        }
        this.initialize(startingPoint);
        this.active = startingPoint;

        // Find Cost to Neighbors as long as not all keys are in the visited Array
        while (this.visited.length !== this.graph.size) {
            this.findCostToNeighbors();
            this.findNext();
        }

        // Find Shortest Path through Graph
        let currentNode = endPoint;
        let pathArray = [endPoint];
        let pathCostArray = [];
        while (currentNode !== startingPoint) {
            let previous = this.previous.get(currentNode);
            let cost = this.graph.get(previous).get(currentNode); // Cost = previous node cost to the current node
            pathArray.unshift(previous); // Add in front of the Array so that the array contains the correct order from start to end
            pathCostArray.unshift(cost);
            currentNode = previous;
        }
        pathArray.unshift(startingPoint);
        let pathText = "";

        for (let i = 0; i < pathArray.length; i++) {
            pathText = pathText + pathArray[i] + " --" + pathCostArray[i] + "-> ";
        }
        pathText = pathText + endPoint;

        return pathText;
    };

}