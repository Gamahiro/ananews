const container = document.getElementById("container");
const containerBorder = document.getElementById("containerBorder");
const gridbox = document.createElement('div');
const gridboxes = document.getElementsByClassName("gridElement");
const initiateButton = document.getElementById("initiateGridboxes");


let containerHeight = parseInt(getComputedStyle(container).height);
let containerWidth = parseInt(getComputedStyle(container).width);

let xAmount = 30;
let yAmount = 30;

function listenGridbox() {
    for (let i = 0; i < gridboxes.length; i++) {

        gridboxes[i].addEventListener("mouseover", () => {
            gridboxes[i].style.backgroundColor = "gray";
            gridboxes[i].style.width = containerWidth / xAmount;
            gridboxes[i].style.height = containerHeight / yAmount;
        });

        
    }

}

//creates columns and rows based on x and y axis, also runs a for loop to create divs (x * y) times
function createGridBox(xAmount, yAmount) {
    console.log(xAmount);

    if (xAmount === undefined) {
        xAmount = prompt("Define box size (1 = 1x1)");
        yAmount = xAmount;
        if(xAmount>100) {
        xAmount = prompt("Box size cannot be larger than 100");
        yAmount = xAmount;
        if(xAmount>100) {
            alert("NO!!!")
            return;
        }
        }
    }


    container.style.gridTemplateRows = "repeat(" + xAmount + ", " + (containerWidth / xAmount)  + "px";
    container.style.gridTemplateColumns = "repeat(" + yAmount + ", " + (containerHeight/ yAmount) + "px";

    for (let i = 0; i < (xAmount * yAmount); i++) {

        const gridbox = document.createElement('div');
        gridbox.className = "gridElement";
        container.appendChild(gridbox);
    }
    listenGridbox();
    
    
}

function removeGridBox() {
    for (let i = gridboxes.length - 1; gridboxes.length > 0; i--) {
        container.removeChild(gridboxes[i]);
    }
}



createGridBox(xAmount, yAmount);
initiateButton.addEventListener('click', initiateEtch);


function initiateEtch() {
    //remove gridboxes
    removeGridBox();
    createGridBox();

}