const container = document.getElementById("container");
const containerBorder = document.getElementById("containerBorder");
const gridbox = document.createElement('div');
const gridboxes = document.getElementsByClassName("gridElement");
const initiateButton = document.getElementById("initiateGridboxes");
const eraserButton = document.querySelector(".eraser");
const selectedColorText = document.querySelector(".selected-color-text");
const selectedColor = document.querySelector(".selected-color");
const clearButton = document.querySelector("#clearButton");
const canvasButton8 = document.querySelector('#canvasSize8');
const canvasButton16 = document.querySelector('#canvasSize16');
const canvasButton32 = document.querySelector('#canvasSize32');
const canvasButton64 = document.querySelector('#canvasSize64');
const canvasButton128 = document.querySelector('#canvasSize128');
const canvasButtons = document.querySelectorAll(".sizeButton");




canvasButtons.forEach((btn) => {

    if (btn.id == "canvasSize8") {
        console.log("yep");
        btn.addEventListener("click", () => {removeGridBox(); createGridBox(8, 8);});
    }
    else if (btn.id == "canvasSize16") {
        console.log("yep");
        btn.addEventListener("click", () => {removeGridBox();createGridBox(16, 16);});
    }
    else if (btn.id == "canvasSize32") {
        console.log("yep");
        btn.addEventListener("click", () => {removeGridBox();createGridBox(32, 32);});
    }
    else if (btn.id == "canvasSize64") {
        console.log("yep");
        btn.addEventListener("click", () => {removeGridBox();createGridBox(64, 64);});
    }
    else if (btn.id == "canvasSize128") {
        console.log("yep");
        btn.addEventListener("click", () => {
            removeGridBox();
            createGridBox(128, 128);});
    }
})


function sizeButtonListener() {
    for (let i = 0; i < canvasButtons.length; i++) {

    }



}



let containerHeight = parseInt(getComputedStyle(container).height);
let containerWidth = parseInt(getComputedStyle(container).width);

let xAmount = 30;
let yAmount = 30;

let mouseClicked = false;





function listenGridbox() {
    for (let i = 0; i < gridboxes.length; i++) {

        gridboxes[i].addEventListener('click', () => {
            gridboxes[i].style.backgroundColor = selectedColorText.textContent;
        })

        gridboxes[i].addEventListener("mouseenter", () => {


            if (event.buttons == 1) {
                event.preventDefault();
                gridboxes[i].style.backgroundColor = selectedColorText.textContent;
                gridboxes[i].style.width = containerWidth / xAmount;
                gridboxes[i].style.height = containerHeight / yAmount;



                gridboxes[i].addEventListener('dragstart', (e) => {
                    e.preventDefault()
                });

                gridboxes[i].addEventListener('drop', (e) => {
                    e.preventDefault()
                })

            }



        });


    }
    clearButton.addEventListener("click", () => {

        let confirmClear = confirm("This will clear the entire canvas. Do you want to proceed?");
        if (confirmClear) {

        
        for (let i = 0; i < gridboxes.length; i++) {
        gridboxes[i].style.backgroundColor = "#FFFFFF";
        }
    }
    });
}

//creates columns and rows based on x and y axis, also runs a for loop to create divs (x * y) times
function createGridBox(xAmount, yAmount) {
    if (xAmount === undefined) {
        xAmount = prompt("Define box size (1 = 1x1)");
        yAmount = xAmount;
        if (xAmount > 150) {
            xAmount = prompt("Box size cannot be larger than 150");
            yAmount = xAmount;
            if (xAmount > 150) {
                alert("Wrong input");
                return;
            }
        } else if (!xAmount || xAmount < 1) {
            xAmount = 30;
            yAmount = 30
        }
    }


    container.style.gridTemplateRows = "repeat(" + xAmount + ", " + (containerWidth / xAmount) + "px";
    container.style.gridTemplateColumns = "repeat(" + yAmount + ", " + (containerHeight / yAmount) + "px";

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









function initiateEtch() {
    //remove gridboxes
    removeGridBox();
    createGridBox();

}

function initiate() {
    createGridBox(xAmount, yAmount);



    initiateButton.addEventListener('click', initiateEtch);

    eraserButton.addEventListener('click', () => {
        selectedColorText.textContent = "#FFFFFF";
        selectedColor.style.backgroundColor = "#FFFFFF";
    });

}

initiate();




///////////////////////////////////////////<---------Color Picker--------->//////////////////////////////////////////


class ColorPicker {
    constructor(root) {
        this.root = root;
        this.colorjoe = colorjoe.rgb(this.root.querySelector(".color-picker"));
        this.selectedColor = null;
        this.savedColors = this.getSavedColors();


        this.colorjoe.show();
        this.setSelectedColor("#000000");

        this.colorjoe.on("change", color => {
            this.setSelectedColor(color.hex(), true);
        });

        this.root.querySelectorAll(".saved-color").forEach((el, i) => {
            this.showSavedColor(el, this.savedColors[i]);

            el.addEventListener("mouseup", e => {
                if (e.button === 1) {
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

        if (!skipCjUpdate) {
            this.colorjoe.set(color);
        }

    }

    getSavedColors() {
        const saved = JSON.parse(localStorage.getItem("colorpicker-saved") || "[]");
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

    getSelectedColor() {
        this.get();
        console.log(this.get());
    }


}



const cp = new ColorPicker(document.querySelector(".container"));
