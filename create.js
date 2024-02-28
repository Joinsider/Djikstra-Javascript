document.getElementById('addButton').addEventListener('click', function() {
    let table = document.getElementById("addTable");
    let newRow = table.insertRow(-1);
    let cell1 = newRow.insertCell(0);
    let cell2 = newRow.insertCell(1);
    let cell3 = newRow.insertCell(2);

    // get current last row and set the ending point of the previous row as the starting point of the new row and the new starting field as readonly
    let lastRow = table.rows[table.rows.length - 2];
    let lastRowEndPoint = lastRow.cells[2].children[0].value;
    cell1.innerHTML = "<input type='text' name='startPoint' value='" + lastRowEndPoint + "' readonly>";
    cell2.innerHTML = "<input type='number' name='cost'>";
    cell3.innerHTML = "<input type='text' name='endPoint' required>";
});

document.getElementById('endButton').addEventListener('change', function() {
    let table = document.getElementById("addTable");
    // check if there is a following row to the row that was changed
    let row = this.parentNode.parentNode;
    let nextRow = row.nextSibling;
    if (nextRow) {
        let nextRowStartPoint = nextRow.cells[0].children[0];
        nextRowStartPoint.value = this.value;
    }
}