
var containerGrid = document.getElementById("container-grid");

var fromElement = null; // moving object from element
var toElement = null; // moving object to element

n = 5;

createGrid(n);

function createGrid(n) {

    for (rows = 1; rows <= n; rows++) {
        // creating rows
        var row = document.createElement("div");
        row.setAttribute("id", "row-"+rows);
        
        row.style.width = ((n * 160) + (n * 10)) + "px"; // fixed box width
        
        for (sqrs = 1; sqrs <= n; sqrs++) {
            row.appendChild(createSquare(rows, sqrs));
        }
        containerGrid.appendChild(row);
    }

}



document.body.addEventListener('click', function(e) {
    
    var obj = e.srcElement;
    if (hasClass(obj, "marked-x")) {
        obj.parentNode.setAttribute("class","square");
        obj.parentNode.setAttribute("ondrop", "drop(event)");
        obj.parentNode.setAttribute("ondragover", "allowDrop(event)");
        obj.parentNode.removeChild(obj);
       
    } else {
        obj.className += " marked";
        obj.setAttribute("ondrop","");
        obj.setAttribute("ondragover","");
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
            objSqr.innerHTML = "";
            objSqr.className = "square";
           
        }
            
    } else {
        var markXObjectAttributes = createMarkX(objSqr.getAttribute("id"));
        objSqr.appendChild(markXObjectAttributes);
        
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

function swapPropertiesBetweenElements(fromElement, toElement) {
    // remove marked class
    fromElement.className = "square";
    
    // add mark class and set attributes
    toElement.className = "square marked"
    toElement.firstChild.setAttribute("id", toElement.getAttribute("id") + "-mark")
    toElement.setAttribute("ondrop","");
    toElement.setAttribute("ondragover","");
    
}


function drag(ev) {
    console.log(ev.target.id);
    ev.dataTransfer.setData("text", ev.target.id);
    fromElement = ev.srcElement.parentElement;
}

function allowDrop(ev) {
    ev.preventDefault();
}

function drop(ev) {
    
    var data = ev.dataTransfer.getData("text");
    ev.target.appendChild(document.getElementById(data));
    swapPropertiesBetweenElements(fromElement,ev.srcElement);
    
}

/** Helper Functions **/
function hasClass(element, clsName) {
    return (' '+ element.className + ' ').indexOf(' ' + clsName + ' ') > -1;
}
