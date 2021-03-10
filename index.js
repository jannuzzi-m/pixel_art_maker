const table = document.getElementById("canvas");
const colorMenu = document.getElementById("color-input");
const resetButton = document.getElementById("reset");
const favColors = document.getElementById("favorite-colors");
const addFavColorButton = document.getElementById("add-fav-color");
const pencil = document.getElementById("pencil");
const eraser = document.getElementById("eraser");
const togleGridButton = document.getElementById("remove-grid")
const addImageButton = document.getElementById("add-image")
const addImageInput = document.getElementById("file-input");
const hideImage = document.getElementById("hide-image");
const imageToggleChackbox = document.getElementById('hide-checkbox')

let image;

let color = "#000";
let mouseOver = false;
let mode = 'drawing';
let columns = Math.floor(table.offsetWidth / 10)
let grid = true;
let rows = Math.floor(table.offsetHeight / 10)

const init = () => {
    colorMenu.value = "#000000"
    color = colorMenu.value

    addImageButton.addEventListener('click', () => {
        addImageInput.click();
    })
    
    for(let i = 0; i < rows; i++){
        const row = document.createElement('tr');
        row.classList.add("row");
        for(let j = 0; j < columns; j++){
            const cell = document.createElement('td');
            cell.classList.add("cell")
            cell.classList.add("grid")
            
            cell.addEventListener('mousemove', () => {
                if(mouseOver && mode == 'drawing'){
                    cell.style.backgroundColor = color;
                }else if(mouseOver && mode == 'erasing'){
                    cell.style.backgroundColor = "transparent";
                }
            })
            cell.addEventListener('mousedown', (event) => {
                event.preventDefault();
                if(mode == 'drawing'){
                    cell.style.backgroundColor = color;
                }else if('erasing'){
                    cell.style.backgroundColor = "transparent";
                }
                mouseOver = true;
            })
            cell.addEventListener('mouseup', () => {
                mouseOver = false;
            })
            
            row.appendChild(cell);
        }
        table.appendChild(row);
    }
    colorMenu.addEventListener('input', event => {
        color = event.target.value;
    })

    for (let i = 0; i < 5; i++) {
        let favColorCell
        let row = document.createElement('tr');
        for (let j = 0; j < 3; j++) {
            favColorCell = document.createElement("td");
            favColorCell.classList.add("favorite-colors-cell");
            row.appendChild(favColorCell);
        }

        favColors.appendChild(row)
    }


}

const changeCellColor = (cell, color) => {
    cell.style.backgroundColor = color
}

const reset = () => {
    const cells = document.getElementsByClassName("cell");
    for(i = 0; i < cells.length; i++){
        cells[i].style.backgroundColor = "transparent"
    }
    
}

const addFavColor = () => {
    let favColorsCell = document.getElementsByClassName("favorite-colors-cell");

    for (let i = 0; i < favColorsCell.length; i++) {
        if(favColorsCell[i].bgColor == ""){
            favColorsCell[i].style.cursor = "pointer";
            favColorsCell[i].bgColor = color
            favColorsCell[i].addEventListener('click', () => {
                if(favColorsCell[i].bgColor != ""){
                    colorMenu.value = favColorsCell[i].bgColor;
                    color = favColorsCell[i].bgColor;
                                    
                }
            })
            favColorsCell[i].addEventListener('dblclick', () => {
                if(favColorsCell[i].bgColor != ""){
                    favColorsCell[i].bgColor = ""
                }
            })
            break
        }
    }
}

const togleGrid = () =>{
    let cells = document.getElementsByClassName("cell")
    
    if(grid){
        for (let i = 0; i < cells.length; i++) {
            cells[i].classList.remove("grid")   
        }
        togleGridButton.innerHTML = "show grid"
        grid = false
    }else{
        for (let i = 0; i < cells.length; i++) {
            
            cells[i].classList.add("grid")
        }
        togleGridButton.innerHTML = "hide grid"
        grid = true
    }
}

togleGridButton.addEventListener("click", togleGrid);

addFavColorButton.addEventListener("click", () => {
    addFavColor()
})
pencil.addEventListener("click", () => {
    mode = "drawing";
})
eraser.addEventListener("click", () => {
    mode = "erasing";
})
resetButton.addEventListener("click", reset);
togleGridButton.innerHTML = "Hide Grid"

addImageInput.addEventListener('change', handleImageChange, false);

function handleImageChange(e){
    const file = e.target.files[0];
    table.style.backgroundImage = `url(${URL.createObjectURL(file)})`
    image = file
    imageToggleChackbox.style.display = 'block'
    hideImage.checked = true
}

hideImage.addEventListener('change', handleShowImageToggle);

function handleShowImageToggle(e){
    if(e.target.checked){
        table.style.backgroundImage = `url(${URL.createObjectURL(image)})`;
    }
    else{
        table.style.backgroundImage = "none"
    }
}

init();
