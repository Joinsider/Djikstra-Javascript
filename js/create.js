const table = document.getElementById("addTable");
const addButton = document.getElementById('addButton');
const removeButton = document.getElementById('removeButton');
const submit = document.getElementById('submit');
const showGraphButton = document.getElementById('showGraphButton');
const graphDiv = document.getElementById('graphDiv');
const graph = new Graph();

let graphStorage = localStorage.getItem('Graph');
if (graphStorage) {
    let data = JSON.parse(graphStorage);
    graph.importNodes(data);
}else{
    localStorage.setItem('Graph', "");
    graphStorage = 1;
}

addButton.addEventListener('click', function() {
    let row = document.createElement('tr');
    
    for(let i = 1; i<=3; i++) {
        let cell = document.createElement('td');
        let input = document.createElement('input');
        switch (i) {
            case 1:
                input.setAttribute('type', 'text');
                input.setAttribute('placeholder', 'e.g. A');
                input.setAttribute('id', 'startPoint')
                break;
            case 2:
                input.setAttribute('type', 'number');
                input.setAttribute('min', 0);
                input.setAttribute('id', 'cost');
                break;
            case 3:
                input.setAttribute('type', 'text');
                input.setAttribute('placeholder', 'e.g. B');
                input.setAttribute('id', 'endPoint');
                break;
        }
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
        console.log("LocalSotrage cleaned");

        for(let i = 1; i<rows.length; i++){
            let cells = rows[i].cells;
            let startPoint = cells[0].children[0].value;
            let cost = parseInt(cells[1].children[0].querySelector('#cost').value);
            let endPoint = cells[2].children[0].value;
            if(cost <= 0){
                cost = 1;
            }
            let ConnectionPossible = graph.addNodes(startPoint, endPoint, cost);
            if(!ConnectionPossible){
                alert('You entered two identical connections. Please check inputs again');
                console.log("Two identical connections entered");
                return;
            }
            console.log("Connection established")
        }
        let graphID = "Graph";
        exportNodes(graphID);
        localStorage.setItem('Graph', graphString);
        console.log("Graph saved to localStorage");
        alert("Graph creation successful!");
    }
});

showGraphButton.addEventListener('click', function(){
   let savedGraph = localStorage.getItem('Graph')
   if(savedGraph === ""){
       alert('No Graph was set, please input one above!');
   }else{
       graph.importGraph(JSON.parse(savedGraph));
       let graphRepresentation = graph.createRepresentation();
       graphDiv.appendChild(graphRepresentation);
   }
});

function validateForm(){
    let rows = table.rows;
    for(let row of rows){
        let cells = row.cells;
        for(let cell of cells){
            if(cell.textContent.trim === ""){
                alert("Please Fill all fields")
                return false;
            }
        }
    }
    return true;
}


class Graph {
    constructor() {
        this.nodes = new Map();
    }

    checkKey(key) {
        return this.nodes.has(key);
    }

    getNode(key) {
        return this.nodes.get(key);
    }

    importGraph(graphID){
        let graphString = localStorage.getItem(graphID);
        if(graphString === ""){
            console.log("No graph found");
            return false;
        }else{
            this.nodes = JSON.parse(graphString);
            console.log("Graph import successful");
            return true;
        }
    }

    exportGraph(graphID){
        let graphString = JSON.stringify(this.nodes);
        let success = localStorage.setItem(graphID, graphString);
        if(success){
            console.log("Graph Export successful")
            return true;
        }else{
            console.log("Graph Export failed.");
            return false;
        }
    }

    checkConnection(key, value) {
        let node = this.getNode(key);
        for (let i = 0; i < node.length(); i++) {
            if (node[i][0] === value) {
                return true;
            }
        }
        return false;
    }

    addNodes(key, value, cost) {
        if(key < 1){
            alert("Please enter a number larger or equal to 1.")
            return false;
        }else if (this.checkKey(key)) {
            if (!this.checkConnection(key, value)) {
                return false;
            }
            this.nodes.get(key).push([value, parseInt(cost)]);
        } else {
            this.nodes.set(key, [[value, cost]])
        }
        return true;
    }

    createRepresentation(){
        let list = document.createElement('ul');
        let keys = Array.from(this.nodes.keys());
        for(let key of keys){
            let li = document.createElement('li');
            let connections = this.nodes.get(key);
            let liText = key + ": ";
            for (let i = 0; i < connections.length; i++) {
                let neighbor = connections[i];
                let point = neighbor[0];
                let cost = neighbor[1];
                liText = liText + (i === 0 ? "" : "{ ") + point + ": " + cost + "}";
                if (i < connections.length - 1) {
                    liText = liText + ", ";
                }
            }
            liText = liText.toString();
            li.innerHTML(liText);
            list.appendChild(li);
        }
        return list;
    }
}