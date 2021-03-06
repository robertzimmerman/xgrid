/**
 * @author - Robert Zimmerman
 * @assignment
 * Purpose: Create a N x N grid where you can place an X mark.
 * Usecases: You can tap a square for an 'X' to appear, if you
 * tap a square where an 'X' is already occupied, it removes that 'X'.
 * You can drag an 'X' to another square, but if the square is occupied
 * the drag is cancelled.
 */


var containerGrid = document.getElementById("container-grid");
var fromElement = null; // moving object from element
var toElement = null; // moving object to element

/**
 * get the param for the size of the grid
 */
n = window.location.search.substr(1);

n = parseInt(n);

if (isNaN(n)) {
    n = 4;
}

/**
 * Creates grid and populates any 'X's if there is a cookie available
 **/
if (createGrid(n)) {
    if (document.cookie) {
        populatePastElements();
    }
}

/*
 * add an EventListerner to clear cookie
 */
document.getElementById("clear-cookie").addEventListener("click", function(event){
       deleteCookie(); 
    }, false);


/**
 *  purpose: function to create the grid based on param
 *  it is n x n
 */
function createGrid(n) {
    containerGrid.style.width = ((n * 160) + (n * 10)) + "px";
    containerGrid.style.height = ((n * 160) + (n * 20)) + "px";
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
    
    return true;
}

/**
 * purpose: function to add a X class and mark the box marked
 * @element
 * sets cookie with all elements in container
 */
function checkBox(e) {
   
    var obj = e.target;
    if (hasClass(obj, "marked-x")) {
        obj.parentNode.setAttribute("class","square");
        obj.parentNode.setAttribute("ondrop", "drop(event)");
        obj.parentNode.setAttribute("ondragover", "allowDrop(event)");
        obj.parentNode.removeChild(obj);
    } else {
        markX(obj);
    }
    setAllPastElementsWithMarkedX();
}

/**
 * purpose: creating the square from grid coordinates
 *          adds attributes to be draggable and clickable
 * @argument rowId, sqrId
 * @returns grid
 */
function createSquare(rowId, sqrId) {
    var grid = document.createElement("div");
    grid.className = "square";
    grid.setAttribute("id", "row-"+rowId+"-sq-"+sqrId);
    grid.setAttribute("ondrop", "drop(event)");
    grid.setAttribute("ondragover", "allowDrop(event)");
    grid.addEventListener("click", function(event){
       checkBox(event); 
    }, false);
    return grid;
}

/**
 * purpose: creating the markX div container "OR" removing it if its occupied
 * @argument object of the square
 * @returns true
 */
function markX(objSqr) {
    
    if (objSqr.firstChild != null) {
        
        if (objSqr.firstChild.getAttribute("class") == "marked-x") {
            objSqr.innerHTML = "";
            objSqr.className = "square";
        }
            
    } else {
        objSqr.className += " marked";
        objSqr.setAttribute("ondrop","");
        objSqr.setAttribute("ondragover","");
        var markXObjectAttributes = createMarkX(objSqr.getAttribute("id"));
        objSqr.appendChild(markXObjectAttributes);
        
    }
    return true;        
}


/**
 * purpose: when creating the X mark, set attributes such as draggable, class mark
 *          and parent id from what it is residing to.
 * @argument parentIdName
 */
function createMarkX(parentIdName) {
    xAttri = document.createElement("div");
    xAttri.className = "marked-x";
    xAttri.setAttribute("draggable", "true");
    xAttri.setAttribute("ondragstart", "drag(event)");
    xAttri.setAttribute("id", parentIdName + "-mark");
    return xAttri;
}

/**
 * purpose: when a drag is completed from one sqr to another
 *          adjustments need to be updated such as sqr fromElement needs to
 *          be clear of "marked" and toElement needs to be known as "marked"
 * @augments fromElement toElement
 */
function swapPropertiesBetweenElements(fromElement, toElement) {
    // remove marked class
    fromElement.className = "square";   
    // add mark class and set attributes
    toElement.className = "square marked"
    toElement.firstChild.setAttribute("id", toElement.getAttribute("id") + "-mark")
    toElement.setAttribute("ondrop","");
    toElement.setAttribute("ondragover","");
}

/**
 * drag and drop functionality
 */
function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
    fromElement = ev.target.parentElement;
}

function allowDrop(ev) {
    ev.preventDefault();
}

function drop(ev) {
    ev.stopPropagation(); // stops firefox from loading image on drag
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    ev.target.appendChild(document.getElementById(data));
    swapPropertiesBetweenElements(fromElement,ev.target);
}

/** Helper Functions **/
function hasClass(element, clsName) {
    return (' '+ element.className + ' ').indexOf(' ' + clsName + ' ') > -1;
}

/**
 * Purpose: if there is a cookie - populate the grid with the existing "X"
 * @cookie
 */
function populatePastElements() {
    var elements = getCookie();
    for (i = 0; i < elements.length; i++) {
        // here we populate x
        markX(document.getElementById(elements[i]));
    }
    
}

// sets all past elements with marked x in cookie
function setAllPastElementsWithMarkedX() {
    markedElements = document.getElementsByClassName("marked");
    var markedSaves = '';
    // looping through to get the names
    for (i = 0; i< markedElements.length; i++) {
        markedSaves += markedElements[i].id +',';
    }
    
    setCookie(markedSaves.slice(0, -1)); // slice the last ,
}

// setting cookie for 1 hour
function setCookie(markedSaves) {
    var d = new Date();
    d.setTime(d.getTime() + 3600 * 1000);
    document.cookie = 'elements=' + markedSaves + '; expires=' + d.toUTCString() + '; path=/';
}

// checks if cookie elements field exist
function checkCookieExist() {
    return (getCookie('elements') != "");
}

// deletes cookie
function deleteCookie() {
    document.cookie = 'elements=; expires=Thu, 01-Jan-70 00:00:01 GMT; path=/';
}

// returns the field's value 
function getCookie(fields) {
   var elem = document.cookie.split('=');
   var elems = elem[1].split(',');
   return elems;
}

