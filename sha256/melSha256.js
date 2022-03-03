const { raw } = require("express");

let testArray = ['11100001011000100110001110001100',
                 '01100001011000000110001110000000',
                 '01000100000000000000000010000000',
                 '01100001011000101100000110000011'];

let tripleArray = ['01100001011000000110001110000000',
                   '01000100000000000000000010000000',
                   '01100001011000101100000110000011'];

let majorityArray = ['00000000111111110000000011111111',
                     '00000000000000001111111111111111',
                     '11111111111111110000000000000000'];

function collapseArrayOfBinWords(arrayOfWords){
    let collapsedWordsArray = [];
    for(let i = arrayOfWords[0].length-1; i >= 0; i --){
        let columnSum = 0;
        arrayOfWords.forEach( (word) => columnSum += parseInt(word[i]) );
        collapsedWordsArray.push(columnSum);
    }
    return collapsedWordsArray.reverse();
}

//fundamental operations for sha256
function addArrayOfBinWords(arrayOfWords){
    //this is a novel way I came up with for doing binary math on multiple
    //binary words 'all at once'
    //we will test to make sure all entries are correct length
    //need to all be same length, or no good
    if(!arrayOfWords) return -1;
    if(arrayOfWords.length == 1) return arrayOfWords[0];
    let evaluatedBinaryString = [];
    let carryOver = 0;
    for(let i = arrayOfWords[0].length-1; i >= 0; i --){
        let columnSum = 0;
        arrayOfWords.forEach( (word) => columnSum += parseInt(word[i]) );
        columnSum += carryOver;
        //now we can evaluate for the result and next carryover value
        //we will build the result string backward, and correct before returning
        evaluatedBinaryString.push(columnSum % 2);
        carryOver = Math.floor(columnSum/2);
    }
    return evaluatedBinaryString.reverse().join('');
}

function makeSomePadding(howManyZeros){
    return Array.apply(null, Array(howManyZeros)).map(function (pad) {return'0'}).join('');
}

function shiftRight(amount){
    let padding = makeSomePadding(amount);
    return function(word){
        let shifted = `${padding}${word.slice(0, -Math.abs(amount))}`;
        return shifted;
    }
}

function rightRotation(amount){
    return function(word){
        let newWord = word.slice(word.length - amount)+(word.slice(0, word.length - amount));
        return newWord;
    }
}

function exclusiveOr(arrayOfWords){
    let collapsedWordsArray = collapseArrayOfBinWords(arrayOfWords);
    for(let i = 0; i < collapsedWordsArray.length; i++){
        collapsedWordsArray[i] = collapsedWordsArray[i]%2;
    }
    return collapsedWordsArray;
}

//composite transformations used in sha256
function lowerCaseSigmaZero(word){
    const ROTR7 = rightRotation(7),
          ROTR18 = rightRotation(18),
          SHR3 = shiftRight(3);
    let wordArray = [ROTR7(word), ROTR18(word), SHR3(word)];
    return exclusiveOr(wordArray).join('');
}

function lowerCaseSigmaOne(word){
    const ROTR17 = rightRotation(17),
          ROTR19 = rightRotation(19),
          SHR10 = shiftRight(10);
    let wordArray = [ROTR17(word), ROTR19(word), SHR10(word)];
    return exclusiveOr(wordArray).join('');
}

function upperCaseSigmaZero(word){
    const ROTR2 = rightRotation(2),
          ROTR13 = rightRotation(13),
          ROTR22 = rightRotation(22);
    let wordArray = [ROTR2(word), ROTR13(word), ROTR22(word)];
    return exclusiveOr(wordArray).join('');
}

function upperCaseSigmaOne(word){
    const ROTR6 = rightRotation(6),
          ROTR11 = rightRotation(11),
          ROTR25 = rightRotation(25);
    let wordArray = [ROTR6(word), ROTR11(word), ROTR25(word)];
    return exclusiveOr(wordArray).join('');
}

function choice(wordArray){
    if(wordArray.length != 3){
        console.log('Failed to pass exactly three words to the choice function');
    }
    let choiceArray = [];
    for(let i = 0; i < wordArray[0].length; i++){
        choiceArray.push(wordArray[0][i] == 1? wordArray[1][i]:wordArray[2][i]);
    }
    return choiceArray.join('');
}

function majority(wordArray){
    if(wordArray.length != 3){
        console.log('Failed to pass exactly three words to the majority function');
    }
    let collapsedArray = collapseArrayOfBinWords(wordArray);
    let majorityArray = [];
    for(let i = 0; i < wordArray[0].length; i++){
        majorityArray.push(collapsedArray[i] > 1? 1:0);
    }
    return majorityArray.join('');
}

//---------constant generation-----------
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

function genCubedValues(primeNumberArray){
    let cubedConstants = [];
    //review this below again.  How is substring working here?
    primeNumberArray.forEach( (prime) => {
        cubedConstants.push( Math.cbrt(prime)
        .toString(2).split('.')[1]
        .substring(0, 32) );
    });
    return cubedConstants
}

function genSquaredValues(primeNumberArray){
    let squaredConstants = [];
    //review this below again.  How is substring working here?
    primeNumberArray.forEach( (prime) => {
        squaredConstants.push( Math.sqrt(prime)
        .toString(2).split('.')[1]
        .substring(0, 32) );
    });
    return squaredConstants
}

const CubedConstants = genCubedValues(compilePrimes(64));
//-----INPUT MESSAGE HANDLING------

function convertRawMessageToBinary(inputToConvert){
    if(typeof(inputToConvert) !== 'string'){
        console.log('please send a valid character string');
        return;
    }
    let rawInputAsBinary = ``;
    for(let i = 0; i < inputToConvert.length; i ++){
        rawInputAsBinary = rawInputAsBinary
                    .concat(inputToConvert.charCodeAt(i).toString(2).padStart(8, '0'));
    }
    return rawInputAsBinary;
}

// const someMessageAsBinary = convertRawMessageToBinary('as#$#@#$??fasdfasdfasdfasdfasdfasdfasdfsdfasdfdddddddddddddddddddddddddddddddddd@#?n.f.t!$///009)()ead');
const someMessageAsBinary = convertRawMessageToBinary('abc');

function padAndReturnMessage(newMessage){
    //add a 1 to message and then pad with zeros until length is 448 bits
    //past the last multiple of 512
    let paddedMessage = newMessage + '1';
    let paddingZeros = makeSomePadding((512 - paddedMessage.length%512)-64).toString();
    paddedMessage += paddingZeros;
    let encodedLength = newMessage.length.toString(2).padStart(64, '0');
    paddedMessage += encodedLength;
    return paddedMessage;
}
//-----BUILD MESSAGE BLOCK ARRAY------

const paddedMessage = padAndReturnMessage(someMessageAsBinary);

function breakStringIntoChunksAsArray(desiredSizeOfChunks){
    return function(paddedMessage){
        let arrayOfChunks = [];
        for(i = 0; i < paddedMessage.length; i += desiredSizeOfChunks){
            arrayOfChunks.push(paddedMessage.slice(i, i+desiredSizeOfChunks));
        }
        return arrayOfChunks;
    }
}

function returnArrayOfMessageBlocks(paddedMessage){
    const make512BitChunks = breakStringIntoChunksAsArray(512);
    let messageBlockArray = make512BitChunks(paddedMessage);
    return messageBlockArray;
}

let arrayOfMessages = returnArrayOfMessageBlocks(padAndReturnMessage(someMessageAsBinary));
// console.log(arrayOfMessages);
//-----BUILD MESSAGE SCHEDULE FOR EACH MESSAGE------

function first16WordsOfMessageSchedules(arrayOfMessages){
    const make32BitChunks = breakStringIntoChunksAsArray(32);
    let messageScheduleArray = [];
    arrayOfMessages.forEach( (individualMessage) => {
        messageScheduleArray.push(make32BitChunks(individualMessage))
    });
    return messageScheduleArray;
}
// console.log(first16WordsOfMessageSchedules(arrayOfMessages));
let AOMSFST16 = first16WordsOfMessageSchedules(arrayOfMessages);

function finishBuildingMessageSchedules(partialSchedules){
    //new word at index i = σ1(i-2) + (i-7) + σ0(i-15) + (i-16)
    let fullSchedules = partialSchedules;
    fullSchedules.forEach( (individualSchedule) => {
        for(let i = 16; i < 64; i++){
            let input1 = lowerCaseSigmaOne(individualSchedule[i-2]),
                input2 = individualSchedule[i-7],
                input3 = lowerCaseSigmaZero(individualSchedule[i-15]),
                input4 = individualSchedule[i-16];
            let inputArray = [input1, input2, input3, input4];
            individualSchedule.push(addArrayOfBinWords(inputArray));
        }
    });
    return fullSchedules;
}
console.log(finishBuildingMessageSchedules(AOMSFST16));
//-----COMPRESSION FUNCTIONS------ (H0 -> H1)

function initilizeHashValues(howManyValues){
    return genSquaredValues(compilePrimes(howManyValues));
}

const InitialHashValues = initilizeHashValues(8);
console.log(InitialHashValues);

//temp word T1 = Σ1(e) + Ch(e, f, g) + h + K0 + W0
//temp word T1 = Σ1(hashVals[4]) + Ch(hashVals[4], hashVals[5], hashVals[6]) + h + K0 + W0
//temp word T2 = Σ0(a) + Maj(a, b, c)
//temp word T2 = Σ0(0) + Maj(0, 1, 2)