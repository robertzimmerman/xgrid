
var containerGrid = document.getElementById("container-grid");

n = 4;

for (rows = 1; rows <= 4; rows++) {
    // creating rows
    var row = document.createElement("div");
    row.setAttribute("id", "row-"+rows);
    
    row.style.width = ((n * 160) + (n * 10)) + "px"; // fixed box width
    
    for (sqrs = 1; sqrs <= 4; sqrs++) {
        row.appendChild(createSquare(rows, sqrs));
    }
    containerGrid.appendChild(row);
}


document.body.addEventListener('click', function(e) {
    
    console.log(e);
    var obj = e.srcElement;
    obj.className += " marked";
    console.log(obj.getAttribute("id"));
    // place an x on the obj
    markX(obj);
    
});

function createSquare(rowId, sqrId) {
    var grid = document.createElement("div");
    grid.className = "square";
    grid.setAttribute("id", "row-"+rowId+"-sq-"+sqrId);
    grid.setAttribute("ondrop", "drop(event)");
    grid.setAttribute("ondragover", "allowDrop(event)");
    return grid;
}


function markX(objSqr) {
    
    if (objSqr.firstChild != null) {
        console.log('do nothing something is already in place');
        
        if (objSqr.firstChild.getAttribute("class") == "marked-x") {
            // instead we remove it
            objSqr.innerHTML = "";
            objSqr.className = "square";
        }
            
    } else {
        xAttri = document.createElement("div");
        xAttri.className = "marked-x";
        xAttri.setAttribute("draggable", "true");
        xAttri.setAttribute("ondragstart", "drag(event)");
        xAttri.setAttribute("id", objSqr.getAttribute("id") + "-mark");
        //xAttri.innerHTML = "X";
        objSqr.appendChild(xAttri);
        
    }    
    return true;        
}

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}

function allowDrop(ev) {
    ev.preventDefault();
}

function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    ev.target.appendChild(document.getElementById(data));
}
