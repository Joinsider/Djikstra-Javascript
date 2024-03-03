const table = document.getElementById("addTable");
const addButton = document.getElementById('addButton');
const removeButton = document.getElementById('removeButton');
const submit = document.getElementById('submit');
const showGraphButton = document.getElementById('showGraphButton');
const graphDiv = document.getElementById('graphDiv');


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
        row.appendChild(cell);
    }
    table.appendChild(row);
});
removeButton.addEventListener('click', function() {
    if (table.rows.length > 1) {
        table.deleteRow(-1);
    }
});

submit.addEventListener('click', function() {
    // Check if all fields are filled
    if(validateForm()){
        let rows = table.rows;
        localStorage.clear();
        let graph = new Graph();

        for(let i = 1; i<rows.length; i++){
            let cells = rows[i].cells;
            let startPoint = cells[0].children[0].value;
            let cost = cells[1].children[0].querySelector('#cost').value;
            let endPoint = cells[2].children[0].value;
            
            let ConnectionPossible = Graph.addNodes(startPoint, endPoint, cost);
            if(!ConnectionPossible){
                alert('You entered two identical connections. Please check inputs again');
                return;
            }
            let graph = JSON.stringify(Graph.exportNodes());
            localStorage.setItem('Graph', graph);
            alert("Graph creation successful!");
        }
    }
});

showGraphButton.addEventListener('click', function(){
   let savedGraph = localStorage.getItem('Graph')
   if(savedGraph === ""){
       alert('No Graph was set, please input one above!');
   }else{
       Graph.importGraph(JSON.parse(savedGraph));
       let graphRepresentation = Graph.createRepresentation();
       graphDiv.appendChild(graphRepresentation);
   }
});

function validateForm(){
    let rows = table.rows;
    for(let row of rows){
        let cells = row.cells;
        for(let cell of cells){
            if(cell.value === ""){
                alert("Please Fill all fields")
                return false;
            }
        }
    }
    return true;
}


let graphStorage = localStorage.getItem('Graph');
if (!graphStorage) {
    localStorage.setItem('Graph', "");
    graphStorage = 1;
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

    importGraph(graphImport){
        this.nodes = graphImport;
    }

    exportGraph = () => this.nodes;

    checkConnection(key, value) {
        let node = this.getNode(key);
        for (let i = 0; i < node.length; i++) {
            if (node[i][0] === value) {
                return true;
            }
        }
        return false;
    }

    addNodes(key, value, cost) {
        if (this.checkKey(key)) {
            if (!this.checkConnection(key, value)) {
                return false;
            }
            this.nodes.get(key).push([value, cost]);
            return true;
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
            for (let neighbor of connections) {
                let point = neighbor[0];
                let cost = neighbor[1];
                liText = liText + "{ " + point + ": " + cost + "}, ";
            }
            liText.slice(0, -1);
            li.textContent(liText);
            list.appendChild(li);
        }
        
    return list;
    }
}