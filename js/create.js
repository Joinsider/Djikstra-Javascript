document.getElementById('addButton').addEventListener('click', function() {
    let table = document.getElementById("addTable");
    let newRow = table.insertRow(-1);
    let cell1 = newRow.insertCell(0);
    let cell2 = newRow.insertCell(1);
    let cell3 = newRow.insertCell(2);

    // get current last row and set the ending point of the previous row as the starting point of the new row and the new starting field as readonly
    let lastRow = table.rows[table.rows.length - 2];
    let lastRowEndPoint = lastRow.cells[2].children[0].value;
    
    if(localStorage['TableID'] == undefined){
        localStorage['TableID'] = 1;
    }

    //set cell1 with the id of startingPoint plus number of starting point
    cell1.innerHTML = "<input type='text' name = 'startPoint' id='" + "startPoint" + localStorage['TableID'] + "' value=''>";
    cell2.innerHTML = "<input type='number' name='cost' id='" + "cost" + localStorage['TableID'] + "'>";
    cell3.innerHTML = "<input type='text' name='endPoint' id='" + "endPoint" + localStorage['TableID'] + "' required>";
});