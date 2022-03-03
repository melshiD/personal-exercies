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

function shiftRight(amount){
    let padding = Array.apply(null, Array(amount)).map(function (pad) {return'0'}).join('');
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
    //first input word indexed value determines whether the second word's value
    //or thrid word's value is used
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
    //return word values dependent on the majority of three words at an index
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

function genCubedConstants(primeNumberArray){
    let cubedConstants = [];
    //review this below again.  How is substring working here?
    primeNumberArray.forEach( (prime) => {
        cubedConstants.push( Math.cbrt(prime)
        .toString(2).split('.')[1]
        .substring(0, 32) );
    });
    return cubedConstants
}

console.log(lowerCaseSigmaZero('00000000000000000011111111111111'));
console.log( upperCaseSigmaOne('00000000000000000011111111111111'));
console.log(choice(majorityArray));
console.log(majority(majorityArray));
console.log(genCubedConstants(compilePrimes(64)));