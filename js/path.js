document.addEventListener("DOMContentLoaded", function () {
  const pathSubmit = document.getElementById("pathSubmit");
  let startingPoint = document.getElementById("StartingPointInput").value;
  let endPoint = document.getElementById("EndPointInput").value;
  const pathDiv = document.getElementById("pathDiv");
  let dijkstra = new Dijkstra();
  const loadKey = "GraphSave";

  pathSubmit.addEventListener("click", function () {
    startingPoint = document.getElementById("StartingPointInput").value;
    endPoint = document.getElementById("EndPointInput").value;

    // Find the shortest Path by running dijkstra
    let path = dijkstra.shortestPath(loadKey, startingPoint, endPoint);
    if (path !== []) {
      console.log("Djikstra run successfully!");
      alert(path.toString());
    } else {
      console.log("Djikstra didn't run successfully!");
      alert(path.toString());
      return;
    }

    let pathString = "";
    for (let i = 0; i < path.length - 2; i++) {
      pathString = pathString + path[i] + " --> ";
    }
    pathString = pathString + path[path.length - 2];
    pathString = pathString + " Cost: " + path[path.length - 1];
    console.log("This is the path " + path.toString());
    console.log("This is the pathString: " + pathString);
    let p = document.createElement("p");
    p.innerHTML = pathString;
    pathDiv.appendChild(p);
  });


});
