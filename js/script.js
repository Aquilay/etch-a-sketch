// global variables
const size_slider = document.getElementById("size-slider");
const size_indicator = document.getElementById("size-indicator");
const size_btn = document.getElementById("size-btn");
const clear_btn = document.getElementById("clear-btn");
const black_btn = document.getElementById("black-btn");
const grayscale_btn = document.getElementById("grayscale-btn");
const rainbow_btn = document.getElementById("rainbow-btn");
const custom_btn = document.getElementById("custom-btn");
const eraser_btn = document.getElementById("eraser-btn");
const grid = document.getElementById("grid");
let draw = false;
let custom_color = "";
let draw_mode = "";
let cells = [];
let size = 16;
// Initial grid
redrawGrid();

// Redraws Grid
function redrawGrid() {
    grid.style.gridTemplateRows = `repeat(${size}, 1fr)`;
    grid.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    cells = [];
    while(grid.firstChild) {
        grid.removeChild(grid.firstChild);
    }
    for (i=1; i <= size*size; i++) {
        let div = document.createElement("div");
        div.classList.add("grid-cell");
        grid.appendChild(div);
    }
    cells = Array.from(document.querySelectorAll(".grid-cell"));
    // Hover
    cells.forEach(cell => cell.addEventListener("mouseover", colorCell));
}
// Generate random color
function randomColor(brightness){
    function randomChannel(brightness){
      var r = 255-brightness;
      var n = 0|((Math.random() * r) + brightness);
      var s = n.toString(16);
      return (s.length==1) ? '0'+s : s;
    }
    return '#' + randomChannel(brightness) + randomChannel(brightness) + randomChannel(brightness);
  }
// Colors cells
function colorCell(){
    if (draw) {
        switch (draw_mode) {
            case "black":
                this.style.backgroundColor = "black";
                break;
            case "rainbow":
                this.style.backgroundColor = `${randomColor(0)}`;
                break;
            case "grayscale":
                let color = window.getComputedStyle(this).backgroundColor;
                let alpha = color.match(/[\d\.]+\)$/g)[0];
                alpha = alpha.slice(0,-1);
                console.log(alpha);
                color = color.replace(/[\d\.]+\)$/g, `${Number(alpha)+.1})`);
                this.style.backgroundColor = color;
                break;
            case "custom":
                this.style.backgroundColor = custom_color;
                break;
            case "eraser":
                this.style.backgroundColor = "white";
                break;     
    }
    } 
}
// updating size slider and variable
size_slider.addEventListener("input", function() {
     size_indicator.textContent = size_slider.value
     size = size_slider.value;
});
// Redrawing Grid
size_btn.addEventListener("click", redrawGrid);
// Toggling draw on / off
grid.addEventListener("click", function() {draw = !draw});
// Buttons event listeners
clear_btn.addEventListener("click", redrawGrid);
black_btn.addEventListener("click", function() {draw_mode = "black"});
grayscale_btn.addEventListener("click", function() {draw_mode = "grayscale"});
rainbow_btn.addEventListener("click", function() {draw_mode = "rainbow"});
eraser_btn.addEventListener("click", function() {draw_mode = "eraser"});
custom_btn.addEventListener("click", function() {draw_mode = "custom"});
jscolor.install();
custom_btn.jscolor.option("position", "left");
custom_btn.jscolor.onInput = function() {
    custom_color = this.toRGBAString();
}