
//-------------event listener for input ----------------
let inputMessage = document.getElementById('messageInput');
inputMessage.addEventListener('keyup', (event) => {
    let inputFromUser = event.target.value;
    let inputAsRawBinary = inputFromUser.split('').map( e => e.charCodeAt(0).toString(2).padStart(8, '0')).join('');
    document.getElementById('messageAsBinary').innerHTML = inputFromUser.length === 0?'':inputAsRawBinary;
});

function padWithZerosTo448Bits(){
    document.getElementById('messageInput').disabled = true;
    //add 1 to end of message as encoding, then followed with zeroes
    let inputAsBinary
    let messageAsBinary = `${document.getElementById('messageAsBinary').value}`;
    let originalBinaryLengthInBinary = messageAsBinary.length.toString(2);
    console.log(originalBinaryLengthInBinary);
    messageAsBinary = messageAsBinary + '1';
    let paddedMessageAsBinary = `${messageAsBinary}${''.padStart(512-messageAsBinary.length-originalBinaryLengthInBinary.length, '0')}${originalBinaryLengthInBinary}`;
    document.getElementById('completeBinaryMessage').value = paddedMessageAsBinary;
}

function hideMessageInputCard(cardToHide){
    cardToHide.remove();
}

function initilizeMessageSchedule(){
    let paddedMessage = document.getElementById('completeBinaryMessage').value;
    if (!paddedMessage) return;
    if(document.getElementById('messageSchedule').children.length>1){
        return hideMessageInputCard(document.getElementById('messageInputCard'))
    };
    const first16WordsArray = (paddedMessage) => {
        let messageArray = [];
        for(let i = 0; i < paddedMessage.length; i += 32){
            messageArray.push(paddedMessage.slice(i, i+32));
        }
        return messageArray;
    };
    const stick16WordsIntoDom = (first16WordsArray) => {
        let parentToAppendTo = document.getElementById('messageSchedule');
        let nodeToClone = parentToAppendTo.firstElementChild;
        for(let [i,v] of first16WordsArray.entries()){
            let newWord = nodeToClone.cloneNode(true);
            newWord.firstElementChild.children[0].innerHTML = `W(${i})`;
            newWord.querySelector('.constantContents').innerHTML = `${v}`;
            newWord.querySelector('.constantContents').classList.add('activeRow');
            parentToAppendTo.appendChild(newWord);
        }
        return parentToAppendTo.children;
    };
    // let children = stick16WordsIntoDom(first16WordsArray(paddedMessage));
    let children = stick16WordsIntoDom(first16WordsArray(paddedMessage));
    setTimeout( () => {
        for(let child of children){
            child.querySelector('.constantContents').classList.remove('activeRow');
        }
    }, 500);
}

function handleMessageInput(){
    return;
}

//grab the elements we need to build the transformation specs: ie ROTR or SHR and degree
const grabRotationSpecElementsReturnSpecArray = (cardId) => {
    let specElementsList = document.querySelectorAll(`#${cardId} .transformationName`);
    const specObjectArray = () => {
        let specObjects = [];
        for (let i = 0; i < specElementsList.length; i++) {
            specObjects.push(
                {
                    transformation: specElementsList[i].children[0].innerHTML,
                    degree: specElementsList[i].children[1].innerHTML
                }
            );
        }
        return specObjects;
    }
    return specObjectArray();
}

const generateRotationSchedules = (inputWord, transformationSpecs) => {
    let transDigests = [];
    for (let spec of transformationSpecs) {
        transDigests.push(transformWordAndReturnReceipt(inputWord, spec.degree, spec.transformation));
    }
    return transDigests;
}

function transformWordAndReturnReceipt(inputBits, amount, flag) {
    //---------returns a 'transformation digest' for one word's transformation----
    let transformedDigest = [inputBits];
    let transformed = '';
    for (let i = 0; i < amount; i++) {
        if (flag === 'ROTR') {
            transformed = `${inputBits.slice(-1)}${(inputBits.slice(0, 31))}`;
        }
        if (flag === 'SHR') {
            transformed = `${(inputBits.slice(0, -1)).padStart(32, '0')}`;
        }
        inputBits = transformed;
        transformedDigest.push(transformed);
    }
    return transformedDigest;
}

const printWordsFromRotationDigest = (digest, transformationDuration, index = 0, element, followOnFunction = null) => {
    // console.log(index);
    if (index > digest.length - 1) {
        if (!followOnFunction) { return }
        return followOnFunction();
    }
    element.innerHTML = digest[index];

    setTimeout(() => {
        printWordsFromRotationDigest(digest, transformationDuration, index + 1, element);
    }, transformationDuration);
}

function handleAndRotateInput(rotTime, cardName) {
    let cardForTransformation = document.getElementById(cardName);
    cardForTransformation.classList.toggle('activeCard');
    let xorDisplayElement = cardForTransformation.querySelector('.resultBits');
    xorDisplayElement.innerHTML = '';

    const transformationSpecs = grabRotationSpecElementsReturnSpecArray(cardName);
    let inputValue = document.getElementById('bitsInput').value;
    let schedules = generateRotationSchedules(inputValue, transformationSpecs)
    let transTimeOne = Math.floor(rotTime / schedules[0].length);
    let transTimeTwo = Math.floor(rotTime / schedules[1].length);
    let transTimeThree = Math.floor(rotTime / schedules[2].length);
    let elements = cardForTransformation.querySelectorAll(`.transformationExample`);
    elements.forEach(elem => elem.innerHTML = inputValue);

    let wordsToXor = [
        schedules[0][schedules[0].length - 1],
        schedules[1][schedules[1].length - 1],
        schedules[2][schedules[2].length - 1]
    ]
    let xorValue = exclusiveOr(wordsToXor).join('');
    console.log(xorValue);

    //printXorAtEnd: is a function optionally passed to printWordsFromRotationDigest so the timing 
    //functionality has access to the values needed to update the transfromationOutputs.  
    //Janky, but less janky than having to grab the dom elements over and over again.
    const printXorAtEndOfTransformation = (delay, xorValue, xorDisplayElement) => {
        setTimeout(() => {
            xorDisplayElement.innerHTML = xorValue;
            xorDisplayElement.parentElement.parentElement.classList.toggle('activeCard');
        }, delay);
    }
    setTimeout(() => printWordsFromRotationDigest(schedules[1], transTimeTwo, 0, elements[1]), 200);
    setTimeout(() => printWordsFromRotationDigest(schedules[2], transTimeThree, 0, elements[2]), 0);
    setTimeout(() => printWordsFromRotationDigest(schedules[0], transTimeOne, 0, elements[0],
        printXorAtEndOfTransformation(420, xorValue, xorDisplayElement)
    ), 350);
    return xorValue;
}


// ------Constant Generation and Animation-------------------------
function generateConstants() {
    //needs to go from 0-63 and do the following each iteration:
    //1. Build a constantRow with K(currentIndex): 3√prime(currentIndex)
    //2. Append the constantRow
    //3. animate the constantContents innerHTML with the prime base-10 number
    //4. Animate innerHTML then to the prime without the decimals
    //5. Animate innerHTML to the final usable pure binary value
    //6. Move on to next element until finished
    const parentToAppendTo = document.getElementById('constantCard');
    if(parentToAppendTo.children.length > 1) {
        return;
        //this isn't over, and I will figure out how to clear the card of all but the first rowConstant (also refactor later to make it moot)
        cleanConstantsCard(parentToAppendTo);
    }

    const rawPrimes = compilePrimes(64);
    const cubedPrimes = rawPrimes.map((primeValue) => Math.cbrt(primeValue));
    const cubedPrimesLessWholeNumbers = cubedPrimes.map(cubedPrime => cubedPrime.toString(10).split('.')[1]);
    const cubedPrimesAsBinary = genCubedValues(rawPrimes);

    const populateAndAnimatePrimes = (parentToAppendTo) => {
        let constantContentsDisplayArrays = [];
        for (let i = 0; i < rawPrimes.length; i++) {
            constantContentsDisplayArrays.push(
                [
                    `3√prime(${i})`,
                    `3√ ${rawPrimes[i]}`,
                    `${cubedPrimes[i]}`,
                    `${cubedPrimesLessWholeNumbers[i]}`,
                    `${cubedPrimesAsBinary[i]}`
                ]
            )
        }
        let currentConstantIndex = 0;
        const animateToBinary = (constantContentsDisplayArrays, parentToAppendTo, currentConstantIndex) => {
            if (currentConstantIndex >= constantContentsDisplayArrays.length) { return }

            let newConstantCardRow = parentToAppendTo.querySelector('.constantCardRow').cloneNode(true);
            let constantIndexNumber = newConstantCardRow.firstElementChild.children[0];
            constantIndexNumber.innerHTML = `K(${currentConstantIndex})`;
            let constantContents = newConstantCardRow.children[1];
            constantContents.innerHTML = constantContentsDisplayArrays[currentConstantIndex][1];
            constantContents.classList.toggle('activeRow');
            parentToAppendTo.appendChild(newConstantCardRow);
            

            let startingDelay = 50;
            let rowDisplayArray = constantContentsDisplayArrays[currentConstantIndex];
            const animateRowToBinary = (newConstantCardRow, rowDisplayArray, rowCurrentDisplayIndex) => {
                if (rowCurrentDisplayIndex >= rowDisplayArray.length) { 
                    return animateToBinary(constantContentsDisplayArrays, parentToAppendTo, currentConstantIndex + 1) 
                }
                newConstantCardRow.innerHTML = rowDisplayArray[rowCurrentDisplayIndex];
                constantContents.classList.toggle('activeRow'); //this accidently works because I'm toggleing an odd number of times.  obvoius when running slowly
                setTimeout(animateRowToBinary, Math.floor(startingDelay), newConstantCardRow, rowDisplayArray, rowCurrentDisplayIndex + 1);
            }
            animateRowToBinary(constantContents, rowDisplayArray, 0);
        }
        animateToBinary(constantContentsDisplayArrays, parentToAppendTo, 0);
    }
    populateAndAnimatePrimes(parentToAppendTo);
}

// ------SHA and Math functions---------------------------------------------
function exclusiveOr(arrayOfWords) {
    let collapsedWordsArray = collapseArrayOfBinWords(arrayOfWords);
    for (let i = 0; i < collapsedWordsArray.length; i++) {
        collapsedWordsArray[i] = collapsedWordsArray[i] % 2;
    }
    return collapsedWordsArray;
}

function collapseArrayOfBinWords(arrayOfWords) {
    let collapsedWordsArray = [];
    for (let i = arrayOfWords[0].length - 1; i >= 0; i--) {
        let columnSum = 0;
        arrayOfWords.forEach((word) => columnSum += parseInt(word[i]));
        collapsedWordsArray.push(columnSum);
    }
    return collapsedWordsArray.reverse();
}
//---//---Prime Constant Generation Functions
function genCubedValues(primeNumberArray) {
    let cubedConstants = [];
    primeNumberArray.forEach((prime) => {
        cubedConstants.push(Math.cbrt(prime)
            .toString(2).split('.')[1]
            .substring(0, 32));
    });
    return cubedConstants
}

function compilePrimes(howMany) {
    let primeArray = [];
    let counter = 2;
    while (primeArray.length < howMany) {
        if (isPrime(counter)) { primeArray.push(counter) }
        counter++;
    }
    return primeArray;
}

function isPrime(n) {
    if (n < 2) return 0;
    for (let i = 2; i < n; i++) {
        if (n % i === 0) {
            return 0;
        }
    }
    return n;
}

