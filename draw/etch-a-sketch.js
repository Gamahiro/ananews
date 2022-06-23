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

        gridboxes[i].addEventListener("mousedown", () => {
            gridboxes[i].style.backgroundColor = "black";
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



///////////////////////////////////////////<---------Color Picker--------->//////////////////////////////////////////

class ColorPicker {
    constructor(root) {
        this.root = root;
        this.colorjoe = colorjoe.rgb(this.root.querySelector(".color-picker"));
        this.selectedColor = null;
        this.savedColors = this.getSavedColors();


        this.colorjoe.show();
        this.setSelectedColor("#009578");

        this.colorjoe.on("change", color => {
            this.setSelectedColor(color.hex(), true);
        });

        this.root.querySelectorAll(".saved-color").forEach((el, i) => {
            this.showSavedColor(el, this.savedColors[i]);

            el.addEventListener("mouseup", e => {
                if(e.button === 1) {
                    this.saveColor(this.selectedColor, i);
                    this.showSavedColor(el, this.selectedColor);
                }

                this.setSelectedColor(el.dataset.color);
            });
        });
    }


    setSelectedColor(color, skipCjUpdate = false) {
        this.selectedColor = color;
        this.root.querySelector(".selected-color-text").textContent = color;
        this.root.querySelector(".selected-color").style.background = color;

        if(!skipCjUpdate) {
            this.colorjoe.set(color);
        }

    }

    getSavedColors() {
        const saved = JSON.parse(localStorage.getItem("colorpicker-saved") || "[]");
        console.log(saved);

        return Array(6).fill("#ffffff").map((defaultColor, i) => {
            return saved[i] || defaultColor;
        })
    }

    showSavedColor(el, color) {
        el.style.background = color;
        el.dataset.color = color;
    }

    saveColor(color, i) {
        this.savedColors[i] = color;
        localStorage.setItem("colorpicker-saved", JSON.stringify(this.savedColors));
    }


}



const cp = new ColorPicker(document.querySelector(".container"));