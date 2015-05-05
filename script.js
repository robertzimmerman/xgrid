
var containerGrid = document.getElementById("container-grid");

var fromElement = null; // moving object from element
var toElement = null; // moving object to element

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
    
    var obj = e.srcElement;
    if (hasClass(obj, "marked-x")) {
        //code
        obj.parentNode.setAttribute("class","square");
        obj.parentNode.removeChild(obj);
        
    } else {
        obj.className += " marked";
        markX(obj);
    }
    
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
        
        //var markXObjectAttributes = createMarkX(objSqr.getAttribute("id"));
        //objSqr.appendChild(markXObjectAttributes);
        objSqr.appendChild(xAttri);
        
    }    
    return true;        
}

function createMarkX(parentIdName) {
    xAttri = document.createElement("div");
    xAttri.className = "marked-x";
    xAttri.setAttribute("draggable", "true");
    xAttri.setAttribute("ondragstart", "drag(event)");
    xAttri.setAttribute("id", parentIdName + "-mark");
    return xAttri;
}

function resetProperties(fromElement, toElement) {
    
}


function drag(ev) {
    //console.log(ev.target.id);
    ev.dataTransfer.setData("text", ev.target.id);
    toElement = ev.target.id.replace("-mark","");
}

function allowDrop(ev) {
    ev.preventDefault();
}

function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    ev.target.appendChild(document.getElementById(data));
}

/** Helper Functions **/
function hasClass(element, clsName) {
    return (' '+ element.className + ' ').indexOf(' ' + clsName + ' ') > -1;
}
