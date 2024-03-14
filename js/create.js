document.addEventListener("DOMContentLoaded", function () {
  const table = document.getElementById("addTable");
  const addButton = document.getElementById("addButton");
  const removeButton = document.getElementById("removeButton");
  const submit = document.getElementById("submitButton");
  const resetButton = document.getElementById("resetButton");
  const showGraphButton = document.getElementById("showGraphButton");
  const exampleButton = document.getElementById("exampleButton");
  const graphDiv = document.getElementById("graphDiv");
  const graphElement = new Graph(); // Create a new graph object to store the nodes
  const loadKey = "GraphSave";

  addButton.addEventListener("click", function () {
    let currentRow = table.rows.length++;
    let row = table.insertRow(-1);
    for (let i = 1; i <= 3; i++) {
      let input = document.createElement("input");
      let idText = "";
      switch (i) {
        case 1:
          input.setAttribute("type", "text");
          input.setAttribute("placeholder", "e.g. A");
          idText = "startPoint" + currentRow;
          break;
        case 2:
          input.setAttribute("type", "number");
          input.setAttribute("min", "0");
          input.setAttribute("value", "1");
          idText = "cost" + currentRow;
          break;
        case 3:
          input.setAttribute("type", "text");
          input.setAttribute("placeholder", "e.g. B");
          idText = "endPoint" + currentRow;
          break;
      }
      input.setAttribute("id", idText);
      let cell = row.insertCell(-1);
      cell.appendChild(input);
      console.log(input.value);
    }
  });
  removeButton.addEventListener("click", function () {
    if (table.rows.length > 1) {
      table.deleteRow(-1);
      console.log("Last Row removed");
    } else {
      console.log("No rows to remove");
    }
  });
  /*
    function validateForm(startPoint, cost, endPoint, row) {
        if (startPoint === "" || endPoint === "" || cost.toString() === "") {
            return "empty";
        } else if (startPoint === endPoint) {
            return "same";
        }for (let i = 1; i < table.rows.length; i++) {
            if (row !== i) {
                let checkCells = this.table.rows[i].cells;
                let checkStart = checkCells[0].children[0].value;
                let checkEnd = checkCells[2].children[0].value;

                if (checkStart === startPoint && checkEnd === endPoint) {
                    return "sameConnection";
                }
            }
        }
        return "true";
    }
    */

  submit.addEventListener("click", function () {
    // Check if all fields are filled
    let valid = "";
    let rows = table.rows;
    localStorage.clear();
    console.log("LocalStorage cleaned");
    let connectionPossible = true;
    for (let i = 1; i < rows.length; i++) {
      if (!connectionPossible) {
        console.log("Connection " + i-- + " failed!");
        break;
      } else {
        console.log("Connection established");
      }
      let cells = rows[i].cells;
      let startPoint = cells[0].children[0].value;
      let cost = parseInt(cells[1].children[0].value);
      let endPoint = cells[2].children[0].value;
      if (cost <= 0) {
        cost = 1;
      }
      connectionPossible = graphElement.addNodes(startPoint, endPoint, cost);
    }

    if (connectionPossible) {
      let exportSuccessful = graphElement.exportList(loadKey);
      if (exportSuccessful) {
        console.log("Graph saved to localStorage");
        alert("Graph creation successful!");
      } else {
        console.log("Error Graph couldn't be saved");
        alert("Graph creation not successful!");
      }
    }
  });

  resetButton.addEventListener("click", function () {
    for (let i = table.rows.length; i > 1; i--) {
      table.delete(-1);
    }
    localStorage.setItem(loadKey, "");
    alert("Reset successful");
  });

  showGraphButton.addEventListener("click", function () {
    let loadSuccessful = graphElement.importList(loadKey);
    graphDiv.innerHTML = "";
    if (!loadSuccessful) {
      alert("No Graph was set, please input one above!");
    } else {
      let graphRepresentationOutput = graphElement.createRepresentation();
      graphDiv.appendChild(graphRepresentationOutput);
    }
  });

  exampleButton.addEventListener('click', function(){
    localStorage.clear();
    graphElement.addNodes("A", "B", 25);
    graphElement.addNodes("B", "C", 10);
    graphElement.addNodes("A", "D", 14);
    graphElement.addNodes("D", "C", 4);
    // Example Graph from Image
    let exportSuccessful = graphElement.exportList(loadKey);
    console.log("Graph saved to localStorage");
    alert("Graph creation successful!");
  });

});
