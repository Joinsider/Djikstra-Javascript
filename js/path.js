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
    let path = dijkstra.shortestPath(loadKey, startingPoint, endPoint);
    console.log("Djikstra RUN!")
    let pathString = "";
    for (let node of path) {
      pathString = pathString + node + " --> ";
    }
    pathString = pathString.substring(0, -5);
    console.log("This is the path " + path.toString());
    let p = document.createElement("p");
    p.innerHTML = pathString;
    pathDiv.appendChild(p);
  });


});
