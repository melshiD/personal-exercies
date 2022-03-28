//-------------event listener for input  length----------------
let inputBits = document.getElementById('bitsInput');
inputBits.addEventListener('keyup', (event) => {
    lengthIndicator = event.target.value;
    inputBits.classList.add('incorrectLength');
    inputBits.classList.remove('correctLength');
    if(inputBits.value.length === 32){
        inputBits.classList.remove('incorrectLength');
        inputBits.classList.add('correctLength');
    }
});

//grab the elements we need to build the specs
const grabRotationSpecElementsReturnSpecArray = (cardId) => {
    let specElementsList = document.querySelectorAll(`#${cardId} .transformationName`);
    const specObjectArray = () => {
        let specObjects = [];
        for(let i = 0; i < specElementsList.length; i++){
            specObjects.push(
                {transformation: specElementsList[i].children[0].innerHTML, 
                 degree: specElementsList[i].children[1].innerHTML}
            );
        }
        return specObjects;
    }
    return specObjectArray();
}

const generateRotationSchedules = (inputWord, transformationSpecs) => {
    let transDigests = [];
    for(let spec of transformationSpecs){
        transDigests.push(transformWordAndReturnReceipt(inputWord, spec.degree, spec.transformation));
    }
    return transDigests;
}

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

const printWordsFromDigest = (digest, transformationDuration, index = 0, element, followOnFunction = null) => { 
    // console.log(index);
    if(index > digest.length - 1){
        if(!followOnFunction){return}
        return followOnFunction();
    }
    element.innerHTML = digest[index];

    setTimeout( () => {
        printWordsFromDigest(digest, transformationDuration, index+1, element);
    }, transformationDuration);
}

function handleAndRotateInput(rotTime, cardName){
    let cardForTransformation = document.getElementById(cardName);
    let xorDisplayElement = cardForTransformation.querySelector('.resultBits');
    xorDisplayElement.innerHTML = '';

    const transformationSpecs = grabRotationSpecElementsReturnSpecArray(cardName);
    let inputValue = document.getElementById('bitsInput').value;
    let schedules = generateRotationSchedules(inputValue, transformationSpecs)
    let transTimeOne = Math.floor(rotTime/schedules[0].length);
    let transTimeTwo = Math.floor(rotTime/schedules[1].length);
    let transTimeThree = Math.floor(rotTime/schedules[2].length);
    let elements = cardForTransformation.querySelectorAll(`.transformationExample`);
    elements.forEach( elem => elem.innerHTML = inputValue);

    let wordsToXor = [
        schedules[0][schedules[0].length-1], 
        schedules[1][schedules[1].length-1], 
        schedules[2][schedules[2].length-1] 
    ]
    let xorValue = exclusiveOr(wordsToXor).join('');
    console.log(xorValue);

    //printXorAtEnd... is a function optionally passed to printWordsFromDigest so the timing functionality has access
    //to the values needed to update the transfromationOutputs.  Janky, but less janky than having to grab the dom elements
    //over and over again
    const printXorAtEndOfTransformation = (delay, xorValue, xorDisplayElement) => {
        setTimeout(() => {
            xorDisplayElement.innerHTML = xorValue;
        }, delay);
    }
    setTimeout( () => printWordsFromDigest(schedules[1], transTimeTwo, 0, elements[1]), 200);
    setTimeout( () => printWordsFromDigest(schedules[2], transTimeThree, 0, elements[2]), 0);
    setTimeout( () => printWordsFromDigest(schedules[0], transTimeOne, 0, elements[0], 
        printXorAtEndOfTransformation(420, xorValue, xorDisplayElement)
    ), 350);
}


// ------Constant Generation and Animation-------------------------
function generateConstants(){
    //needs to go from 0-63 and do the following each iteration:
    //1. Build a constantRow with K(currentIndex): 3√prime(currentIndex)
    //2. Append the constantRow
    //3. animate the constantContents innerHTML with the prime base-10 number
    //4. Animate innerHTML then to the prime without the decimals
    //5. Animate innerHTML to the final usable pure binary value
    //6. Move on to next element until finished
    const rawPrimes = compilePrimes(64);
    console.log(rawPrimes);
    const cubedPrimes = rawPrimes.map( (primeValue) => Math.cbrt(primeValue));
    console.log(cubedPrimes);
    const cubedPrimesLessWholeNumbers = cubedPrimes.map( cubedPrime => cubedPrime % 1 );
    console.log(cubedPrimesLessWholeNumbers);
    const binaryCubedConstants = genCubedValues(rawPrimes);
    console.log(binaryCubedConstants);
    // const cubedPrimesDecimals = cubedPrimes.forEach( cubedPrime => cubedPrime.toString(10).split('.')[0] ); //already string value
    // const cubedPrimesAsBinaryConstants = cubedPrimesDecimals.forEach( cubedPrimeDecimal => parseInt(cubedPrimeDecimal, 2).toString(2) );

    // console.log(cubedPrimesAsBinaryConstants);
    // const parentElement = document.getElementById('constantCard');
    // const populateAndAnimatePrimes = (parentToAppendTo, numberOfConstants) => {
    //     for(let i = 0; i < rawPrimesArray.length; i++){
    //         let constantIndexLable = `K(${i})`;
    //         let thisPrimeDecimalValues = thisPrime.split('.')[1];
    //         let binaryConstant = parseInt(thisPrimeDecimalValues, 2).substring(0, 32);

    //         let constantContentsDisplayArray = [
    //             `3√prime(${i})`,
    //             `${thisPrime}`,
    //             `${thisPrimeDecimalValues}`
    //         ]
    //     }
    // }
    let newConstantCardRow = document.querySelector('.constantCardRow').cloneNode(true);
    let constantIndexNumber = newConstantCardRow.firstElementChild.children[0];
    constantIndexNumber.innerHTML = 'K(23)';
    let constantContents = newConstantCardRow.children[1];
    constantContents.innerHTML = '11111111110000000000111000111111'
    // parentElement.appendChild(newConstantCardRow);
}


// ------SHA and Math functions---------------------------------------------
function exclusiveOr(arrayOfWords){
    let collapsedWordsArray = collapseArrayOfBinWords(arrayOfWords);
    for(let i = 0; i < collapsedWordsArray.length; i++){
        collapsedWordsArray[i] = collapsedWordsArray[i]%2;
    }
    return collapsedWordsArray;
}

function collapseArrayOfBinWords(arrayOfWords){
    let collapsedWordsArray = [];
    for(let i = arrayOfWords[0].length-1; i >= 0; i --){
        let columnSum = 0;
        arrayOfWords.forEach( (word) => columnSum += parseInt(word[i]) );
        collapsedWordsArray.push(columnSum);
    }
    return collapsedWordsArray.reverse();
}
//---//---Prime Constant Generation Functions
function genCubedValues(primeNumberArray){
    let cubedConstants = [];
    primeNumberArray.forEach( (prime) => {
        cubedConstants.push( Math.cbrt(prime)
        .toString(2).split('.')[1]
        .substring(0, 32) );
    });
    return cubedConstants
}

function compilePrimes(howMany){
    let primeArray = [];
    let counter = 2;
    while(primeArray.length < howMany){
        if(isPrime(counter)){primeArray.push(counter)}
        counter ++;
    }
    return primeArray;
}

function isPrime(n){
    if(n < 2) return 0;
    for(let i = 2; i < n; i++){
        if(n % i === 0){
            return 0;
        }
    }
    return n;
}
