document.addEventListener('DOMContentLoaded', function() {
    class Graph {
        constructor() {
            this.nodes = new Map();
        }
    
        checkNode(key) {
            return this.nodes.has(key);
        }
    
        importList(loadID){
            const mapArrayString = localStorage.getItem('myNestedMap');
            const mapArray = JSON.parse(mapArrayString);

            const nestedMap = new Map(mapArray.map(([key, value]) => [key, new Map(value)]));

            if(nestedMap === ""){
                console.log("No graph found");
                return false;
            }else {
                this.nodes = nestedMap;
                console.log("Graph import successful");
                return true;
            }
        }
    
        exportList(graphID){

            // Convert Map to an array of key-value pairs
            const mapArray = Array.from(this.nodes, ([key, value]) => [key, Array.from(value.entries())]);

            // Stringify the array
            const mapString = JSON.stringify(mapArray);

            // Save the stringified array to LocalStorage
            localStorage.setItem(graphID, mapString);

            if(localStorage.getItem(graphID) === mapString){
                console.log("Graph Export successful")
                return true;
            }else{
                console.log("Graph Export failed.");
                return false;
            }
        }
    
        checkConnection(key, value) {
            let nodeValue = this.nodes.get(key);
            return nodeValue.has(value);
        }
    
        addNodes(key, value, cost) {
            let nodeSet = new Map();
            nodeSet.set(value, cost);
            if(key < 1){
                alert("Please enter a number larger or equal to 1.")
                return false;
            }else if (graphElement.checkNode(key)) {
                if (!this.checkConnection(key, value)) {
                    return false;
                }
                let currentValue = this.nodes.get(key);
                currentValue.set(value, cost);
                this.nodes.set(key, currentValue);
            } else {
                this.nodes.set(key, nodeSet);
            }
            return true;
        }
    
        createRepresentation(){
            let list = document.createElement('ul');
            list.setAttribute('id', 'representationUL')
            let keys = this.nodes.keys();
            for(let key of keys){
                let liID = "value" + key;
                let li = document.createElement('li');
                li.setAttribute('id', liID);
                let neighbors = this.nodes.get(key);
                for(let neighbor of neighbors){
                    let point = neighbor[0]
                }
            }
            this.nodes.forEach (function(value, key){
                let liID = "value" + key;
                let li = document.createElement('li');
                li.setAttribute('id', liID);
                let connections = value;
                let liText = "";
                for(let i = 0; i < value.length; i++){
                    let neighbor = connections[i];
                    let point = neighbor[0];
                    let cost = neighbor[1];
                    liText = liText + (i === 0 ? "" : "{ ") + point + ": " + cost + "}";
                    if (i < connections.length - 1) {
                        liText = liText + ", ";
                    }
                }
                liText = liText.toString();
                li.innerHTML = liText;
                list.appendChild(li);
            });
            return list;
        }
    }
    
    const table = document.getElementById("addTable");
    const addButton = document.getElementById('addButton');
    const removeButton = document.getElementById('removeButton');
    const submit = document.getElementById('submitButton');
    const showGraphButton = document.getElementById('showGraphButton');
    const graphDiv = document.getElementById('graphDiv');
    const graphElement = new Graph(); // Create a new graph object to store the nodes
    const loadKey = "GraphSave"


    
    addButton.addEventListener('click', function() {
        let row = document.createElement('tr');
        
        for(let i = 1; i<=3; i++) {
            let cell = document.createElement('td');
            let input = document.createElement('input');
            let idText = "";
            switch (i) {
                case 1:
                    input.setAttribute('type', 'text');
                    input.setAttribute('placeholder', 'e.g. A');
                    idText = "startPoint" + i;
                    break;
                case 2:
                    input.setAttribute('type', 'number');
                    input.setAttribute('min', '0');
                    idText = "cost" + i;
                    break;
                case 3:
                    input.setAttribute('type', 'text');
                    input.setAttribute('placeholder', 'e.g. B');
                    idText = "endPoint" + i;
                    break;
            }
            input.setAttribute('id', idText);
            cell.appendChild(input);
            console.log(input.value);
            row.appendChild(cell);
        }
        table.appendChild(row);
    });
    removeButton.addEventListener('click', function() {
        if (table.rows.length > 1) {
            table.deleteRow(-1);
            console.log("Last Row removed");
        }else{
            console.log("No rows to remove");
        }
    });
    
    submit.addEventListener('click', function() {
        // Check if all fields are filled
        if(validateForm()){
            let rows = table.rows;
            localStorage.clear();
            console.log("LocalStorage cleaned");
    
            for(let i = 1; i<rows.length; i++){
                let cells = rows[i].cells;
                let startPoint = cells[0].children[0].value;
                let cost = parseInt(cells[1].children[0].value);
                let endPoint = cells[2].children[0].value;
                if(cost <= 0){
                    cost = 1;
                }
                let ConnectionPossible = graphElement.addNodes(startPoint, endPoint, cost);
                if(!ConnectionPossible){
                    alert('You entered two identical connections. Please check inputs again');
                    console.log("Two identical connections entered");
                    return;
                }
                console.log("Connection established")
            }
            let exportSuccessful = graphElement.exportList(loadKey);
            if(exportSuccessful){
                console.log("Graph saved to localStorage");
                alert("Graph creation successful!");
            }else{
                console.log("Error Graph couldn't be saved");
                alert("Graph creation not successful!");
            }
        }
    });
    
    showGraphButton.addEventListener('click', function(){
       let loadSuccessful = graphElement.importList(loadKey);
       if(!loadSuccessful){
           alert('No Graph was set, please input one above!');
       }else{
           let graphRepresentationOutput = graphElement.createRepresentation();
           graphDiv.appendChild(graphRepresentationOutput);
       }
    });
    
    function validateForm(){
        let rows = table.rows;
        for(let row of rows){
            let cells = row.cells;
            for(let cell of cells){
                if(cell.innerHTML.trim.toString() === ""){
                    alert("Please Fill all fields")
                    return false;
                }
            }
        }
        return true;
    }
    
    
    
});