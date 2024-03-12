class Graph {
  constructor() {
    this.nodes = new Map();
  }

  importList(loadID) {
    const mapArrayString = localStorage.getItem(loadID);
    const importArray = JSON.parse(mapArrayString);
    let nestedMap = new Map();
    for (let i = 0; i < importArray.length; i++) {
      let valueMap;

      let key = importArray[i][0];
      let value = importArray[i][1];
      valueMap = new Map();

      for (let j = 0; j < value.length; j++) {
        let neighbor = value[j][0];
        let cost = value[j][1];
        valueMap.set(neighbor, cost);
      }
      nestedMap.set(key, valueMap);
    }

    if (importArray.toString() === "") {
      console.log("No graph found");
      return false;
    } else {
      this.nodes = nestedMap;
      console.log("Graph import successful");
      return true;
    }
  }

  exportList(graphID) {
    let exportMap = this.nodes;
    const keys = exportMap.keys();
    for (let key of keys) {
      let keyMap = exportMap.get(key);
      let keyArray = Array.from(keyMap);
      exportMap.set(key, keyArray);
    }
    let exportArray = Array.from(exportMap);

    const mapString = JSON.stringify(exportArray);

    // Save the stringify array to LocalStorage
    localStorage.setItem(graphID, mapString);

    if (localStorage.getItem(graphID) === mapString) {
      console.log("Graph Export successful");
      return true;
    } else {
      console.log("Graph Export failed.");
      return false;
    }
  }

  addNodes(key, value, cost) {
    let nodeSet = new Map();
    nodeSet.set(value, cost);
    let thisNode = this.nodes.get(key);
    if (key.toString() === "" || value.toString() === "") {
      alert(
          "Please check your Connections, you might entered empty connections"
      );
    } else if (cost < 1) {
      alert("Please enter a number larger or equal to 1.");
      return false;
    } else if (this.nodes.has(key)) {
      if (thisNode.has(value)) {
        alert(
            "Please check your Connections, you might entered two identical connections!"
        );
        return false;
      }
      let currentValue = this.nodes.get(key);
      currentValue.set(value, cost);
      this.nodes.set(key, currentValue);
    } else {
      this.nodes.set(key, nodeSet);
    }
    this.nodes.set(value, new Map()); // Adds an empty point to the end with no neighbors
    return true;
  }

  createRepresentation() {
    let list = document.createElement("ul");
    list.setAttribute("id", "representationUL");
    let keys = this.nodes.keys();
    for (let key of keys) {
      let liID = "value" + key;
      let li = document.createElement("li");
      li.setAttribute("id", liID);

      let liText = key + ":";

      let neighbors = this.nodes.get(key); // Returns the neighbors map
      let neighborsKeys = neighbors.keys(); // Return all neighbors
      for (let neighborKey of neighborsKeys) {
        let cost = neighbors.get(neighborKey);
        liText = liText + " [" + neighborKey + ": " + cost + "] ";
      }
      li.innerHTML = liText;
      list.appendChild(li);
    }
    return list;
  }
}
