
var containerGrid = document.getElementById("container-grid");

$n = 4;

for (rows = 1; rows <= 4; rows++) {
    // creating rows
    var row = document.createElement("div");
    row.setAttribute("id", "row-"+rows);

    for (sqrs = 1; sqrs <= 4; sqrs++) {
        // setting squares for each row
        var grid = document.createElement("div");
        grid.className = "square";
        grid.setAttribute("id", "row-"+rows+"-sq-"+sqrs);
        row.appendChild(grid);
    }
    containerGrid.appendChild(row);
}

/**
for (i = 0; i < 4; i++) {
    //code
    var grid = document.createElement("div");
    grid.className = "square";
    grid.setAttribute("id", "sq-"+i);
    
    containerGrid.appendChild(grid);
}
**/

document.body.addEventListener('click', function(e) {
    console.log(e);
    var obj = e.srcElement;
    obj.className += " marked";
    console.log(obj.getAttribute("id"));
    // place an x on the obj
    markX(obj);
    
});


function markX(objSqr) {
    // if childNode exist
    
    
    if (objSqr.firstChild != null) {
        console.log('do nothing something is already in place');
        
        if (objSqr.firstChild.getAttribute("class") == "marked-x") {
            // instead we remove it
            objSqr.innerHTML = "";
        }
            
    } else {
        xAttri = document.createElement("div");
        xAttri.className = "marked-x";
        //xAttri.innerHTML = "X";
        objSqr.appendChild(xAttri);
    }    
        
    
    
}