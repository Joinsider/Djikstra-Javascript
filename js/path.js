document.addEventListener('DOMContentLoaded', function () {
    const pathSubmit = document.getElementById('pathSubmit');
    const startingPoint = document.getElementById('startingPointInput');
    const endPoint = document.getElementById('endPointInput');
    const pathDiv = document.getElementById('pathDiv');
    let graphElement = new Graph();
    let djikstra = new Djikstra();
    const loadKey = "GraphSave"


    pathSubmit.addEventListener('click', function () {
        let loadSuccessful = graphElement.importList(loadKey);
        if (!loadSuccessful) {
            alert('No Graph was set, please input one above!');
            window.location.href = '/create.html';
        } else {
            djikstra.graphToDjikstra(graphElement.returnGraph());
            let path = djikstra.findPath(startingPoint, endPoint);
            let p = document.createElement('p');
            p.innerHTML = path;
            pathDiv.appendChild(p);

        }
    });
});