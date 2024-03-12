document.addEventListener("DOMContentLoaded", function () {
  const pathSubmit = document.getElementById("pathSubmit");
  let startingPoint = document.getElementById("StartingPointInput").value;
  let endPoint = document.getElementById("EndPointInput").value;
  const pathDiv = document.getElementById("pathDiv");
  let graphElement = new Graph();
  let weightedGraph = new Djikstra();
  let djikstra = new Djikstra();
  const loadKey = "GraphSave";

  pathSubmit.addEventListener("click", function () {
    startingPoint = document.getElementById("StartingPointInput").value;
    endPoint = document.getElementById("EndPointInput").value;
    let path = weightedGraph.shortestDist(loadKey, startingPoint, endPoint);
    console.log("Djikstra RUN!")
    console.log(path);
    let p = document.createElement("p");
    p.innerHTML = path.toString();
    pathDiv.appendChild(p);
  });


});
