//build an object containing a rotation's name an it's amount/degree, as well as capturing
const fetchTransformationConstituientsAndEventualDisplayElements = () => {
    const rotationSpecs = [],
          concernedBitDisplayElementPointers = [];

    const rotationNamesAndNumElements = document.querySelectorAll('.rotationNameAndNumber');
    rotationNamesAndNumElements.forEach( (rotationElemAndAmountElem)=> {
        //also take an opportunity to build an array of pointers while we're at it
        concernedBitDisplayElementPointers.push(rotationElemAndAmountElem.nextElementSibling.children[0]);
        let spec = {};
        spec.rotation = rotationElemAndAmountElem.children[0].innerHTML;
        spec.amount = rotationElemAndAmountElem.children[1].innerHTML;
        rotationSpecs.push(spec);
    });
    let displays = concernedBitDisplayElementPointers;
    // return {rotationSpecs, displays};
    return zipperTwoArraysTogether(rotationSpecs, displays);
}
//WHEN YOU SIT BACK DOWN ZIPPER THESE ARRAYS
function zipperTwoArraysTogether(array1, array2){

}
// let {rotationSpecs, displays} = fetchTransformationConstituientsAndEventualDisplayElements();
let displays = fetchTransformationConstituientsAndEventualDisplayElements().displays;
let rotationSpecs = fetchTransformationConstituientsAndEventualDisplayElements().rotationSpecs;

const generateRotationSchedule = (inputWord, rotationSpecs) => {
    let transDigests = [];
    for(let spec of rotationSpecs){
        if(spec.rotation === 'ROTR'){
            let digest = rotateBitsAndReturnReceipt(inputWord, parseInt(spec.amount, 10));
            transDigests.push(digest);
        }
        if(spec.rotation === 'SHR'){
            let digest = shiftAndReturnReceipt(inputWord, parseInt(spec.amount, 10));
            transDigests.push(digest);
        }
    }
    return transDigests;
}

//--------ROTATE AND SHIFT FUNCTIONS-----------------
function rotateBitsAndReturnReceipt(inputBits, amount){
    let rotationDigest = [inputBits];
    for(let i = 0; i < amount; i++){
        let rotated = `${inputBits.slice(-1)}${(inputBits.slice(0, 31))}`;
        inputBits = rotated;
        rotationDigest.push(inputBits);
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

const THREE_DIGESTS = generateRotationSchedule('10100101011010111010101101110000', rotationSpecs, displays);

const greeting = delayAmount => {
    setTimeout( () => {
        console.log('it rains today at ' + delayAmount);
        if(delayAmount <= 0){
            return;
        }
        greeting(Math.floor(delayAmount/2));
    }, delayAmount)
}
//greeting(4000)