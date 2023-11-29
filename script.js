//setting some default global parameters
let gridSize = 16;
let color = document.querySelector("#colorPicker");
let sketchPad = document.querySelector(".sketchPad");
let colorChoice = "black";
let userToolSelect = 0;
let randomColor = "rgb(0,0,0)"


//allows "scribbling"
let mouseStatus = 0;

window.addEventListener('mousedown', () => {
    mouseStatus = 1;
})

window.addEventListener('mouseup', () => {
    mouseStatus = 0;
})


//default state of webpage
window.addEventListener('load', () => {
    sketchPaper();
})

//the primary function everything feeds into
function sketchPaper() {
    changeGrid(gridSize);
    colorIn();
}

//setting input based on 
color.addEventListener('input', () => {
    colorChoice = color.value;
})

//building canvas for painting
function changeGrid(size){
    let pixelWidth = (960/size);
    for (let i = 0; i < (size*size); i++) {
        let pixel = document.createElement("div");
        pixel.id = "pixel" + i;
        pixel.className = "pixel";
        pixel.style = `flex: 1 1 ${pixelWidth}px`
        sketchPad.appendChild(pixel);        
    }
}

//how to color things in on the canvas
function colorIn() {
    let pixels = document.querySelectorAll(".pixel");
    pixels.forEach(pixel => {
        pixel.addEventListener('mouseenter', () => {
            if (mouseStatus == 1 && userToolSelect == 0) {
                pixel.style.backgroundColor = colorChoice;
            } else if (mouseStatus == 1 && userToolSelect == 1) {
                        pixel.style.backgroundColor = "white";
            } else if (mouseStatus == 1 && userToolSelect == 2) {
                        rainbowPen();
                        pixel.style.backgroundColor = rainbowColor;
            } else if (mouseStatus == 1 && userToolSelect == 3) {
                        staticPen();
                        pixel.style.backgroundColor = randomColor; 
            }
            })
            
        pixel.addEventListener('click', () => {
            switch(userToolSelect) {
                case 0:
                    pixel.style.backgroundColor = colorChoice;
                    break;
                case 1:
                    pixel.style.backgroundColor = "white";
                    break;
                case 2: 
                    rainbowPen();
                    pixel.style.backgroundColor = rainbowColor;
                    break;
                case 3: 
                    staticPen();
                    pixel.style.backgroundColor = randomColor;
                    break;
            }
        }
    )
            }
        )
    }

//clear canvas code
function clearCanvas() {
   sketchPad.innerHTML = "";
}

// resetting the canvas
let btn = document.querySelector("#resetBtn");
btn.addEventListener('click', () => {
    clearCanvas();
    sketchPaper();
    })

//change size of canvas
let sizeSlide = document.querySelector("#changeSize");
let displayValue = document.querySelector("#sliderValue");
sizeSlide.addEventListener('change', () => {
    let change = sizeSlide.value;
    gridSize = change;
    clearCanvas();
    changeGrid(change);
    colorIn();
})

//paintbrush button
let paintBtn = document.querySelector("#paintBrush");
paintBtn.addEventListener('click', () => {
    userToolSelect = 0;
  })

//eraser button
let eraseBtn = document.querySelector("#eraser");
eraseBtn.addEventListener('click', () => {
    userToolSelect = 1;
})

//rainbow button
let rainbowBtn = document.querySelector("#rainbow");
rainbowBtn.addEventListener('click', () => {
    userToolSelect = 2;
})

//static button
let staticBtn = document.querySelector("#static");
staticBtn.addEventListener('click', () => {
    userToolSelect = 3;
})

//random grayscale
function staticPen() {
    let randomValue = Math.floor(Math.random() * 255) +1;
    randomColor = `rgb(${randomValue},${randomValue},${randomValue})`
}

function randomNumber() {
    return (Math.floor(Math.random() * 255) + 1)
}

function rainbowPen() {
    rainbowColor = `rgb(${randomNumber()},${randomNumber()},${randomNumber()})`
}

//dry brush
