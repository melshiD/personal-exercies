//starting out same as uppercaseSigmaOne.js
//Implementing some more click handlers to aid my presentation and 
//ditching the set-timeout-only sequences with some promises

// const { listen } = require("express/lib/application");

// const res = require("express/lib/response");

//-------PUNCH LIST-----------------------
//Animated padding
//click to go through prime building sequence until button press
//Perhaps same for message schedule
//remove W(64) after message schedule completion is concluded

//-------------event listener for input ----------------
let inputMessage = document.getElementById('messageInput');
inputMessage.addEventListener('keyup', (event) => {
    let inputFromUser = event.target.value;
    let inputAsRawBinary = inputFromUser.split('').map( e => e.charCodeAt(0).toString(2).padStart(8, '0')).join('');
    document.getElementById('messageAsBinary').innerHTML = inputFromUser.length === 0?'':inputAsRawBinary;
});

function padAndEncodeLength(){
    let messageAsBinary = `${document.getElementById('messageAsBinary').value}`;
    if(messageAsBinary === '') return;
    document.getElementById('messageInput').disabled = true;
    let originalBinaryLengthInBinary = messageAsBinary.length.toString(2);
    messageAsBinary = messageAsBinary + '1';
    let paddedMessageAsBinary = `${messageAsBinary}${''.padStart(512-messageAsBinary.length-originalBinaryLengthInBinary.length, '0')}${originalBinaryLengthInBinary}`;
    document.getElementById('completeBinaryMessage').value = paddedMessageAsBinary;
}

function hideMessageInputCard(cardToHide){
    cardToHide.remove();
    cardToHide = null;
    return;
}

function initilizeMessageSchedule(){
    if(!document.getElementById('messageInputCard')) return;
    if(document.getElementById('messageSchedule').children.length>1){
        return hideMessageInputCard(document.getElementById('messageInputCard'))
    };
    let paddedMessage = document.getElementById('completeBinaryMessage').value;
    if (!paddedMessage) return;
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
        nodeToClone.remove();
        nodeToClone.classList.add('movingEquation');
        parentToAppendTo.appendChild(nodeToClone);
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

function handleAndRotateInput(rotTime, cardName, inputBits = null) {
    let cardForTransformation = document.getElementById(cardName);
    cardForTransformation.classList.toggle('activeCard');
    let xorDisplayElement = cardForTransformation.querySelector('.resultBits');
    xorDisplayElement.innerHTML = '';

    const transformationSpecs = grabRotationSpecElementsReturnSpecArray(cardName);
    let inputValue = !inputBits ? document.getElementById('bitsInput').value : inputBits;
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

// ------Majority and Choice---------------------------------------
function majorityAndChoice(evalDuration, cardName, inputBits = null){ 
    const inputArray = !inputBits === null?inputBits:[ //for testing
        '01101111011101010111000000111011',
        '00100000001001000011010100101100',
        '00110000001100000011000000101100'
    ];
    inputStringsAsArrays = [];
    inputArray.forEach( (inputString) => {
        inputStringsAsArrays.push(inputString.split('').reverse());
    });
    // ------ show card as active ------
    let cardForTransformation = document.getElementById(cardName);
    cardForTransformation.classList.add('activeCard');
    // ------ populate card with values from inputArray -------
    let threeListsOf32Spans = cardForTransformation.querySelectorAll('[class*="Value"]');
    inputStringsAsArrays.forEach( (inputArray, arrayIndex) => {
        inputArray.forEach( (value, i) => {
            let spanIndex = (31 - i);
            threeListsOf32Spans[arrayIndex].children[spanIndex].innerHTML = value;
        })
    });
    // ------ depending on which transformation, animate and populate answer accordingly ------
    const sequencePromise = (ms) => {
        return new Promise(resolvingAction => setTimeout(resolvingAction, ms))
    }
    const differentSequencePromise = (ms) => {
        return new Promise(resolvingAction => setTimeout(resolvingAction, ms))
    }
    const removeDigitStyle = (threeListsOf32Spans, i) => {
            threeListsOf32Spans[0].children[(31 - i)].classList.remove('activeSpanDigitOne');
            threeListsOf32Spans[1].children[(31 - i)].classList.remove('activeSpanDigitOne');
            threeListsOf32Spans[2].children[(31 - i)].classList.remove('activeSpanDigitOne');
            threeListsOf32Spans[0].children[(31 - i)].classList.remove('activeSpanDigitZero');
            threeListsOf32Spans[1].children[(31 - i)].classList.remove('activeSpanDigitZero');
            threeListsOf32Spans[2].children[(31 - i)].classList.remove('activeSpanDigitZero');
            console.log('removing styling now')
    };
    
    if(cardName === 'cardFive'){
        //for each item in the array (0 - 32), find the majority character,
        //then highlight each case of that character at the current index,
        //then output the result character under the highlighted chars/unhighlight chars
        //move to the next index and repeat
        let resultsDiv = cardForTransformation.querySelector('.resultBits');
        for(let i = 0, p = Promise.resolve(); i < 32; i++){
            console.log('im here');
            p = p.then( () => sequencePromise(evalDuration)).then( () => {
                let majority = parseInt(inputStringsAsArrays[0][i], 10) + parseInt(inputStringsAsArrays[1][i], 10) + parseInt(inputStringsAsArrays[2][i], 10);
                console.log(majority);
                let resultsDisplayOutput = '';
                if(majority > 1){
                    //highlight the majority digit/s in that column;
                    for(let t = 0; t < 3; t ++){
                        if(inputStringsAsArrays[0][i] > 0) threeListsOf32Spans[0].children[(31 - i)].classList.add('activeSpanDigitOne');
                        if(inputStringsAsArrays[1][i] > 0) threeListsOf32Spans[1].children[(31 - i)].classList.add('activeSpanDigitOne');
                        if(inputStringsAsArrays[2][i] > 0) threeListsOf32Spans[2].children[(31 - i)].classList.add('activeSpanDigitOne');
                    }
                    resultsDisplayOutput = `${'1'}${resultsDiv.innerHTML}`;
                    resultsDiv.innerHTML = `${resultsDisplayOutput}`;
                }
                if(majority < 2){
                    //highlight the majority digit/s in that column;
                    for(let t = 0; t < 3; t ++){
                        if(inputStringsAsArrays[0][i] == '0') threeListsOf32Spans[0].children[(31 - i)].classList.add('activeSpanDigitZero');
                        if(inputStringsAsArrays[1][i] == '0') threeListsOf32Spans[1].children[(31 - i)].classList.add('activeSpanDigitZero');
                        if(inputStringsAsArrays[2][i] == '0') threeListsOf32Spans[2].children[(31 - i)].classList.add('activeSpanDigitZero');
                    }
                    resultsDisplayOutput = `${'0'}${resultsDiv.innerHTML}`;
                    resultsDiv.innerHTML = `${resultsDisplayOutput}`;
                }
                // delay.then( removeDigitStyle(threeListsOf32Spans, i) );
            });
        }
    }
    if(cardName === 'cardSix'){
        //if X is 0, the output is Z.
        //if X is 1, the output is Y
        let resultsDiv = cardForTransformation.querySelector('.resultBits');
        for(let i = 0, p = Promise.resolve(); i < 32; i++){


            //`WHEN YOU SIT BACK DOWN, SEE ABOUT BUILDING AN ARRAY OF EACH CHILD THAT NEEDS STYLES REMOVED, THEN SEND 
            //THE ARRAY TO BE GONE THROUGH

            //2 when you sit back down build the event listener to cycle values into the test slots for use during explanation


            p = p.then( () => sequencePromise(evalDuration)).then( () => {
                let choiceValue = parseInt(inputStringsAsArrays[0][i], 10);
                let resultsDisplayOutput = '';
                if(choiceValue === 0){
                    //then just activate the span in place Z
                    let valueInZ = threeListsOf32Spans[2].children[(31 - i)].innerHTML;
                    for(let t = 0; t < 3; t ++){
                        threeListsOf32Spans[0].children[(31 - i)].classList.add('activeSpanDigitOne');
                        threeListsOf32Spans[2].children[(31 - i)].classList.add('activeSpanDigitOne');
                    }
                    resultsDisplayOutput = `${valueInZ}${resultsDiv.innerHTML}`;
                    resultsDiv.innerHTML = `${resultsDisplayOutput}`;
                }
                if(choiceValue === 1){
                    let valueInY = threeListsOf32Spans[1].children[(31 - i)].innerHTML;
                    for(let t = 0; t < 3; t ++){
                        threeListsOf32Spans[0].children[(31 - i)].classList.add('activeSpanDigitOne');
                        threeListsOf32Spans[1].children[(31 - i)].classList.add('activeSpanDigitOne');
                    }
                    resultsDisplayOutput = `${valueInY}${resultsDiv.innerHTML}`;
                    resultsDiv.innerHTML = `${resultsDisplayOutput}`;
                }
                // removeDigitStyle(threeListsOf32Spans, i);
            });
        }
        //how the hell do I get rid of the styles AFTER the event
        //maybe return a function and send it everything that needs styles removed from
    }
}

// ------Constant Generation and Animation-------------------------
function generateConstants() {
    //needs to go from 0-63 and do the following each iteration:
    //1. Build a constantRow with K(currentIndex): 3√prime(currentIndex)
    //2. Append the constantRow
    //3. Animate the constantContents innerHTML with the prime base-10 number
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
    let startingDelay = 3000;
    const populateAndAnimatePrimes = (parentToAppendTo) => {
        let constantContentsDisplayArrays = [];
        for (let i = 0; i < rawPrimes.length; i++) {
            constantContentsDisplayArrays.push(
                [
                    `3√prime(${i+1})`,
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
            constantContents.classList.add('activeRow');
            parentToAppendTo.appendChild(newConstantCardRow);
            

            // let startingDelay = 50;
            let currentInnerDelay = currentConstantIndex > 1 ? 50 : startingDelay;
            let rowDisplayArray = constantContentsDisplayArrays[currentConstantIndex];
            const animateRowToBinary = (newConstantCardRow, rowDisplayArray, rowCurrentDisplayIndex) => {
                if (rowCurrentDisplayIndex >= rowDisplayArray.length) { 
                    return animateToBinary(constantContentsDisplayArrays, parentToAppendTo, currentConstantIndex + 1) 
                }
                newConstantCardRow.innerHTML = rowDisplayArray[rowCurrentDisplayIndex];
                // constantContents.classList.add('activeRow'); //this accidently works because I'm toggleing an odd number of times.  obvoius when running slowly
                setTimeout(animateRowToBinary, Math.floor(currentInnerDelay), newConstantCardRow, rowDisplayArray, rowCurrentDisplayIndex + 1);
            }
            setTimeout( () => {
                constantContents.classList.remove('activeRow');
            }, currentInnerDelay*5);
            animateRowToBinary(constantContents, rowDisplayArray, 0);
        }
        animateToBinary(constantContentsDisplayArrays, parentToAppendTo, 0);
    }
    populateAndAnimatePrimes(parentToAppendTo);
    setTimeout( () => {
        document.getElementById('constantCard').firstElementChild.remove();
    }, 25000);
    //this timeout delay to remove the top element is being hard-coded on account of the 
    //change in delay times within the row animations 
}

// ------Complete Message Schedule --------------------------------
// function completeMessageSchedule(wordIndex = 16, startingDelay = 2000){
//     if(wordIndex > 20) startingDelay = 500;
function completeMessageSchedule(wordIndex = 16, startingDelay = 5000){
    const parentElement = document.getElementById('messageSchedule');
    if(parentElement.childElementCount === 1) return;
    if(wordIndex > 17) startingDelay = 500;
    if(wordIndex > 20) startingDelay = 80;
    if(wordIndex === 64) return;
    const nodeArray = parentElement.children;
    //    W(16) : σ1(t-2) + (t-7) + σ0(t-15) + (t-16)
    // σ1(t-2):
    let addend1RowElement = parentElement.firstElementChild.cloneNode(true);
    let addend2RowElement = parentElement.firstElementChild.cloneNode(true);
    let addend3RowElement = parentElement.firstElementChild.cloneNode(true);
    let addend4RowElement = parentElement.firstElementChild.cloneNode(true);
    
    const appendAddend1 = () => {
        let xor = handleAndRotateInput(300, 'cardTwo', nodeArray[wordIndex-2].children[1].innerHTML);
        document.querySelector('.movingEquation .constantContents').children[0].classList.add('activeRow'); //span styles
        nodeArray[wordIndex-2].children[1].classList.add('activeRow');
        addend1RowElement.firstElementChild.children[0].innerHTML = '';
        addend1RowElement.children[1].innerHTML = xor;
        setTimeout( () => {
            // addend1RowElement.querySelector('.constantContents').classList.add('activeRow');
            parentElement.appendChild(addend1RowElement);
            setTimeout(()=>addend1RowElement.querySelector('.constantContents').classList.remove('activeRow'), startingDelay*0.2)
        }, startingDelay*0.8);
    }
    setTimeout( appendAddend1(), startingDelay);

    const appendAddend2 = () => {
        addend2RowElement.firstElementChild.children[0].innerHTML = '';
        addend2RowElement.children[1].innerHTML = nodeArray[wordIndex-7].children[1].innerHTML;
        setTimeout( () => {
            nodeArray[wordIndex-7].children[1].classList.add('activeRow');
            document.querySelector('.movingEquation .constantContents').children[1].classList.add('activeRow'); //span styles
            // parentElement.appendChild(addend2RowElement);
            setTimeout(()=>{
                parentElement.appendChild(addend2RowElement);
                addend2RowElement.querySelector('.constantContents').classList.remove('activeRow')}, 
            startingDelay*0.8)
        }, startingDelay*0.8);
    }
    setTimeout( appendAddend2(), startingDelay*0.9);

    const appendAddend3 = () => {
        setTimeout(() => {
            let xor = handleAndRotateInput(300, 'cardOne', nodeArray[wordIndex - 15].children[1].innerHTML);
            addend3RowElement.firstElementChild.children[0].innerHTML = '';
            addend3RowElement.children[1].innerHTML = xor;
            nodeArray[wordIndex - 15].children[1].classList.add('activeRow');
            document.querySelector('.movingEquation .constantContents').children[2].classList.add('activeRow'); //span styles
            // addend3RowElement.querySelector('.constantContents').classList.add('activeRow');
            setTimeout(() => {
                // addend3RowElement.querySelector('.constantContents').classList.remove('activeRow');
                setTimeout( () => parentElement.appendChild(addend3RowElement), startingDelay*0.4);
            }, startingDelay*0.2)
        }, startingDelay*0.8);
    }
    setTimeout( appendAddend3, startingDelay*1);

    const appendAddend4 = () => {
        setTimeout( () => {
            addend4RowElement.firstElementChild.children[0].innerHTML = '';
            addend4RowElement.children[1].innerHTML = nodeArray[wordIndex-16].children[1].innerHTML;
            nodeArray[wordIndex-16].children[1].classList.add('activeRow');
            document.querySelector('.movingEquation .constantContents').children[3].classList.add('activeRow'); //span styles
            // addend4RowElement.querySelector('.constantContents').classList.add('activeRow');
            parentElement.appendChild(addend4RowElement);
            // addend4RowElement.querySelector('.constantContents').classList.remove('activeRow')
            setTimeout( ()=> {
                setTimeout( () => {
                    parentElement.appendChild(addend4RowElement);
                    setTimeout( addWordsAndAdvanceToNext(wordIndex, startingDelay*0.3), startingDelay);
                }, startingDelay*0.4)
            }, startingDelay*0.2); //maybe back to 4.  need promises bad
        }, startingDelay*0.8);
    }
    setTimeout( appendAddend4, startingDelay*2);
}
const addWordsAndAdvanceToNext = (currentConstantIndex, delay) => {  //function used in tandem with completeMessageSchedule to build full schedule
    if(currentConstantIndex === 64) return;

    let functionSpans = document.querySelectorAll('.constantContents span');
    functionSpans.forEach( (span) => span.classList.remove('activeRow'));

    let messageSchedule = document.getElementById('messageSchedule');
    Array.from(messageSchedule.children).forEach( (child) => child.children[1].classList.remove('activeRow'));
    let arrayToAddTogether = [
        messageSchedule.children[messageSchedule.children.length - 1].children[1].innerHTML,
        messageSchedule.children[messageSchedule.children.length - 2].children[1].innerHTML,
        messageSchedule.children[messageSchedule.children.length - 3].children[1].innerHTML,
        messageSchedule.children[messageSchedule.children.length - 4].children[1].innerHTML
    ];
    let wordSum = addArrayOfBinWords(arrayToAddTogether);
    let removeAndReplace = document.querySelector('.movingEquation');
    removeAndReplace.children[0].children[0].innerHTML = `W(${currentConstantIndex+1})`;

    removeAndReplace.remove();
    messageSchedule.children[messageSchedule.children.length - 1].remove();
    messageSchedule.children[messageSchedule.children.length - 1].remove();
    messageSchedule.children[messageSchedule.children.length - 1].remove();
    messageSchedule.children[messageSchedule.children.length - 1].children[1].innerHTML = wordSum;
    messageSchedule.children[messageSchedule.children.length - 1].children[0].children[0].innerHTML = `W(${currentConstantIndex})`;
    messageSchedule.appendChild(removeAndReplace);
    setTimeout( completeMessageSchedule(currentConstantIndex+1), delay);
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
//SHA//---Prime Constant Generation Functions
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

function addArrayOfBinWords(arrayOfWords){
    //re-used from earlier SHA256 I wrote.  Refactor when appropriate
    if(!arrayOfWords) return -1;
    if(arrayOfWords.length == 1) return arrayOfWords[0];
    let evaluatedBinaryString = [];
    let carryOver = 0;
    for(let i = arrayOfWords[0].length-1; i >= 0; i --){
        let columnSum = 0;
        arrayOfWords.forEach( (word) => columnSum += parseInt(word[i]) );
        columnSum += carryOver;
        evaluatedBinaryString.push(columnSum % 2);
        carryOver = Math.floor(columnSum/2);
    }
    return evaluatedBinaryString.reverse().join('');
}

//----- So I don't have to keep clicking to move through the flow -----
document.getElementById('messageInput').dispatchEvent(new Event("keyup"));
setTimeout( () => {
    padAndEncodeLength();
    // initilizeMessageSchedule();
    // initilizeMessageSchedule();
},5);

function toggleBackground(){
    document.body.classList.toggle('toggleBackground');
}