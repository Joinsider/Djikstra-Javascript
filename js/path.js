document.addEventListener("DOMContentLoaded", function () {
  const pathSubmit = document.getElementById("pathSubmit");
  let startingPoint = document.getElementById("StartingPointInput").value;
  let endPoint = document.getElementById("EndPointInput").value;
  const pathDiv = document.getElementById("pathDiv");
  let graphElement = new Graph();
  let weightedGraph = new Djikstra();
  let djikstra = new Djikstra();
  const loadKey = "GraphSave";

  function edgeListToAdjacencyList(edgeList) {
    const adjList = {};

    for (const [src, destWeight] of edgeList) {
      const [dest, weight] = destWeight;

      if (!(src in adjList)) {
        adjList[src] = {};
      }

      if (!(dest in adjList)) {
        adjList[dest] = {};
      }

      adjList[src][dest] = weight;
      adjList[dest][src] = weight;
    }

    return adjList;
  }

  function dijkstra (adjList, start, end) {
    const distances = {};
    for (const node in adjList) {
      distances[node] = Infinity;
    }
    distances[start] = 0;

    const priorityQueue = [[0, start]];

    while (priorityQueue.length > 0) {
      const [currentDistance, currentNode] = priorityQueue.shift();

      if (currentDistance > distances[currentNode]) {
        continue;
      }

      for (const [neighbor, weight] of Object.entries(adjList[currentNode])) {
        const distance = currentDistance + weight;

        if (distance < distances[neighbor]) {
          distances[neighbor] = distance;
          priorityQueue.push([distance, neighbor]);
        }
      }
    }

    return distances[end];
  }

// Input: [["A",[["B",1],["C",1]]],["B",[["C",1]]],["C",[]],["D",[]]]
  function inputGraph(loadKey, start, end) {
    let input = JSON.parse(localStorage.getItem(loadKey));
    const edgeList = input.flatMap(([node, edges]) =>
        edges.flatMap(([dest, weight]) => [{ src: node, dest, weight }])
    );

    const adjList = edgeListToAdjacencyList(edgeList);
    const dist = dijkstra(adjList, start, end);
    console.log(`Shortest Distances from ${start} to ${end} is: ${dist}`);
    return dist;
  }



  pathSubmit.addEventListener("click", function () {
    startingPoint = document.getElementById("StartingPointInput").value;
    endPoint = document.getElementById("EndPointInput").value;

    if (!startingPoint || !endPoint) {
      console.error("Starting point or end point is not provided.");
      return;
    }

    let path = inputGraph(loadKey, startingPoint, endPoint);
    console.log(path);
    let p = document.createElement("p");
    if (path !== null) {
      p.innerHTML = path.toString();
      pathDiv.appendChild(p);
    }
  });


});
