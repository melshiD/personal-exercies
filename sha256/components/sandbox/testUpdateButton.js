const rotationNamesAndNumElements = document.querySelectorAll('.rotationNameAndNumber');

let rotationSpecs = [];

rotationNamesAndNumElements.forEach( (rotationElemAndAmountElem)=> {
    let spec = {};
    console.log(rotationElemAndAmountElem.nextElementSibling.children[0].innerHTML);//vals
    spec.rotation = rotationElemAndAmountElem.children[0].innerHTML;
    spec.amount = rotationElemAndAmountElem.children[1].innerHTML;
    rotationSpecs.push(spec);
});
console.log(rotationSpecs);

const generateRotationSchedule = (inputBits, rotationSpecs) => {
    //build three arrays of strings.  
    //Each array's length depends on how many movements the bits make
    let fullTransformationsDigest = [];
    for(let spec of rotationSpecs){
        if(spec.rotation === 'ROTR'){
            let digest = rotateAndReturnReceipt(inputBits, parseInt(spec.amount, 10));
            fullTransformationsDigest.push(digest);
        }
        if(spec.rotation === 'SHR'){
            let digest = shiftAndReturnReceipt(inputBits, parseInt(spec.amount, 10));
            fullTransformationsDigest.push(digest);
        }
    }
    return fullTransformationsDigest
}
//refactor rotation and shift function to be one
function rotateAndReturnReceipt(inputBits, amount){
    let rotationDigest = [inputBits];
    for(let i = 0; i < amount; i++){
        let rotated = `${inputBits.slice(-1)}${(inputBits.slice(0, 31))}`;
        inputBits = rotated;
        rotationDigest.push(inputBits);
        // console.log(rotationDigest);
    }
    return rotationDigest;
}
function shiftAndReturnReceipt(inputBits, amount){
    let shiftDigest = [inputBits];
    for(let i = 0; i < amount; i++){
        let shifted = `${(inputBits.slice(0, -1)).padStart(32, '0')}`;
        inputBits = shifted;
        shiftDigest.push(inputBits);
    }
    return shiftDigest;
}

//-------------event listener for input----------------
let inputBits = document.getElementById('bitsInput');
let lengthIndicator = '';
inputBits.addEventListener('keyup', (event) => {
    lengthIndicator = event.target.value;
    inputBits.classList.add('incorrectLength');
    inputBits.classList.remove('correctLength');
    if(lengthIndicator.length === 32){
        inputBits.classList.remove('incorrectLength');
        inputBits.classList.add('correctLength');
    }
});

//----load entered values into sigma rotation slots-----
console.log(generateRotationSchedule(inputBits.value, rotationSpecs));


