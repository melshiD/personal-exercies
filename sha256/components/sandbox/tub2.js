function transformWordAndReturnReceipt(inputBits, amount, flag){
    //---------returns a 'transformation digest' for one word's transformation----
    let transformedDigest = [inputBits];
    let transformed = '';
    for(let i = 0; i < amount; i++){
        if(flag === 'ROTR'){
            transformed = `${inputBits.slice(-1)}${(inputBits.slice(0, 31))}`;
        }
        if(flag === 'SHR'){
            transformed = `${(inputBits.slice(0, -1)).padStart(32, '0')}`;
        }
        inputBits = transformed;
        transformedDigest.push(transformed);
    }
    return transformedDigest;
}

const generateRotationSchedules = (inputWord, rotationSpecs) => {
    let transDigests = [];
    for(let spec of rotationSpecs){
        transDigests.push(transformWordAndReturnReceipt(inputWord, spec.amount, spec.rotation));
    }
    return transDigests;
}

const printWordsFromDigest = (digest, rotationDuration, index = 0, element) => { 
    // console.log(index);
    if(index > digest.length - 1){
        return;
    }
    element.innerHTML = digest[index];
    // console.log(digest[index]);

    setTimeout( () => {
        printWordsFromDigest(digest, rotationDuration, index+1, element);
    }, rotationDuration);
}

let bitDisplays = document.querySelectorAll('.bitDisplay');
let element1 = bitDisplays[0];
let element2 = bitDisplays[1];
let element3 = bitDisplays[2];

//---------BINARY OPERATIONS------------------------------------
function collapseArrayOfBinWords(arrayOfWords){
    let collapsedWordsArray = [];
    for(let i = arrayOfWords[0].length-1; i >= 0; i --){
        let columnSum = 0;
        arrayOfWords.forEach( (word) => columnSum += parseInt(word[i]) );
        collapsedWordsArray.push(columnSum);
    }
    return collapsedWordsArray.reverse();
}

function exclusiveOr(arrayOfWords){
    let collapsedWordsArray = collapseArrayOfBinWords(arrayOfWords);
    for(let i = 0; i < collapsedWordsArray.length; i++){
        collapsedWordsArray[i] = collapsedWordsArray[i]%2;
    }
    return collapsedWordsArray;
}


// let inputBits = document.getElementById('bitsInput');
// inputBits.addEventListener( (event) => {

// })


function handleAndRotateInput(rotTime){
    let inputValue = document.getElementById('bitsInput').value;
    let transSpecs = [{transformation: 'ROTR', degree: 13}, 
                      {transformation: 'ROTR', degree: 2},
                      {transformation: 'ROTR', degree: 23}];
            console.log(inputValue);
    let schedules = generateRotationSchedules(inputValue, transSpecs)
    let timeOne = Math.floor(rotTime/schedules[0].length);
    let timeTwo = Math.floor(rotTime/schedules[1].length);
    let timeThree = Math.floor(rotTime/schedules[2].length);
    printWordsFromDigest(schedules[0], timeOne, 0, element1);
    printWordsFromDigest(schedules[1], timeTwo, 0, element2);
    printWordsFromDigest(schedules[2], timeThree, 0, element3);
}