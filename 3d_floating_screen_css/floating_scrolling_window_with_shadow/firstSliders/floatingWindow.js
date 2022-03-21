const rotateAxisVals = {
    x: '0.14',
    y: '1',
    z: '-0.06',
    amount: '-18',
    rotateZ: '-1',
    translateZ: '0'
};

const perspectiveValues = {
    perspective: '0',
    originX: '0',
    originY: '0'
};

const updateRotateValues = (attribute, value) => {
    rotateAxisVals[attribute] = value;
    let short = {...rotateAxisVals};
    console.log(short);
    floating_display.style.transform = `rotate3d(${short.x}, ${short.y}, ${short.z}, ${short.amount}deg) rotateZ(${short.rotateZ}deg) translateZ(${short.translateZ}rem)`;
};

const updatePerspectiveValues = (attribute, value) => {
    perspectiveValues[attribute] = value;
    let short = {...perspectiveValues};
    if(attribute === 'perspective'){
        wordsAndBoards.style.perspective = `${short.perspective}rem`;
    }
    wordsAndBoards.style.perspectiveOrigin = `${short.originX}% ${short.originY}%`;
};

let floating_display = document.getElementById('floating_display');
let wordsAndBoards = document.querySelector('.words-and-board');
let amountSlider = document.getElementById('amount');
amountSlider.addEventListener('input', () => {
    return updateRotateValues('amount', amountSlider.value);
});

//WHEN YOU SIT BACK DOWN FIND A DRY WAY TO HANDLE ADDING STATE TO THIS OBJECT WITH SLIDERS!!

let xSlider = document.getElementById('x');
xSlider.addEventListener('input', () => {
    return updateRotateValues('x', xSlider.value);
});

let ySlider = document.getElementById('y');
ySlider.addEventListener('input', () => {
    return updateRotateValues('y', ySlider.value);
});

let zSlider = document.getElementById('z');
zSlider.addEventListener('input', () => {
    return updateRotateValues('z', zSlider.value);
});

let rotateZ = document.getElementById('rotateZ');
rotateZ.addEventListener('input', () => {
    return updateRotateValues('rotateZ', rotateZ.value); 
});

let translateZ = document.getElementById('translateZ');
translateZ.addEventListener('input', () => {
    return updateRotateValues('translateZ', translateZ.value);
});

let perspective = document.getElementById('perspective');
perspective.addEventListener('input', () => {
    return updatePerspectiveValues('perspective', perspective.value);
});

let originX = document.getElementById('originX');
originX.addEventListener('input', () => {
    return updatePerspectiveValues('originX', originX.value); 
});

let originY = document.getElementById('originY');
originY.addEventListener('input', () => {
    return updatePerspectiveValues('originY',originY.value);
});