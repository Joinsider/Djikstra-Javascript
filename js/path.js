document.addEventListener("DOMContentLoaded", function () {
  const pathSubmit = document.getElementById("pathSubmit");
  const startingPoint = document.getElementById("StartingPointInput").value;
  const endPoint = document.getElementById("EndPointInput").value;
  const pathDiv = document.getElementById("pathDiv");
  let graphElement = new Graph();
  let weightedGraph = new Djikstra();
  let djikstra = new Djikstra();
  const loadKey = "GraphSave";

  pathSubmit.addEventListener("click", function () {
    let path = weightedGraph.shortestDist(loadKey, startingPoint, endPoint);
    console.log("Djikstra RUN!")
    console.log(path);
    let p = document.createElement("p");
    p.innerHTML = path.toString();
    pathDiv.appendChild(p);
  });


});
