let grid_size = 16;
let element_size = getElementSize(grid_size);

let slider = document.querySelector('#changeGridSlider');
let sliderValue = document.querySelector('#sliderValue');
let grid = document.querySelector('.grid');
const reset = document.querySelector('#resetBtn');
const randomColorBtn = document.querySelector('#randomColorBtn');
const blackColorBtn = document.querySelector('#blackColorBtn');
let grid_elements;
let colorBlack = true;

randomColorBtn.style.backgroundColor = getRandomColor();
randomColorBtn.style.color = 'white';
randomColorBtn.style.textShadow = '1px 1px black, -1px 1px black, -1px -1px black, 1px -1px black';

randomColorBtn.addEventListener('click', () => {
    colorBlack = false;
});

blackColorBtn.addEventListener('click', () => {
    colorBlack = true;
});

reset.addEventListener('click', () => {
    grid_elements.forEach(gridElement => {
        if(gridElement.classList.contains('active')){
            gridElement.classList.remove('active');
            gridElement.style.backgroundColor = 'white';
        }
    })
});

function getElementSize(grid_size){
    return 512 / grid_size;
}

function setSliderValue(grid_size) {
    slider.setAttribute('value', grid_size);
    sliderValue.textContent = `Number of pixels: ${grid_size}*${grid_size}`;
}

function createGrid(grid_size){
    grid = document.querySelector('.grid');
    element_size = getElementSize(grid_size);
    for(let i = 0; i < grid_size**2; i++){
        let grid_element = document.createElement('div');
        grid_element.style.width = `${element_size}px`;
        grid_element.style.height = `${element_size}px`;
        grid_element.classList.add('grid_element');
        grid.appendChild(grid_element);
    }
    grid_elements = document.querySelectorAll('.grid_element');     
    grid_elements.forEach(gridElement => {
        gridElement.addEventListener('mouseover', (gridElement) => {
            gridElement.target.classList.add('active');
            if(colorBlack === false){
                gridElement.target.style.backgroundColor = getRandomColor();
            }
            else{
                gridElement.target.style.backgroundColor = 'black';
            }
        }
        )
    });
}

slider.oninput = () => {
    sliderValue.textContent = `Number of pixels: ${slider.value}`;
    // let grid = document.querySelector('.grid');
    grid_size = slider.value;
    removeGrid(grid);
    createGrid(grid_size);
};

function removeGrid(grid) {
    while(grid.firstChild){
        grid.removeChild(grid.firstChild);
    }
}

function getRandomColor() {
    let randomColor = Math.floor(Math.random()*16777215).toString(16);
    return '#' + randomColor;
}

createGrid(grid_size);