
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
    //padding to fill in the front with zeros
    let padding = Array.apply(null, Array(amount)).map(function (pad) {return'0'}).join('');
    return function(word){
        let shifted = `${padding}${word.slice(0, -Math.abs(amount))}`;
        console.log(`original word :${word}`);
        console.log(`${amount} Char right :${shifted}`);

        // return `${padding}${word.slice(0, -17)}`;
        return shifted;
    }
}

function rightRotation(amount){
    return function(word){
        let newWord = word.slice(word.length - amount)+(word.slice(0, word.length - amount));
        return newWord;
    }
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

function exclusiveOr(arrayOfWords){
    let collapsedWordsArray = collapseArrayOfBinWords(arrayOfWords);
    console.log(collapsedWordsArray);
}

const SR17 = shiftRight(17);
let shifted = SR17('11100001011000100110001110001100');

let testArray = ['11100001011000100110001110001100',
                 '01100001011000000110001110000000',
                 '01000100000000000000000010000000',
                 '01100001011000101100000110000011'];

const ROTR13 = rightRotation(13);
let rotated = ROTR13('1111111111111110000000011111');
console.log(rotated);

console.log(addArrayOfBinWords(testArray));
exclusiveOr(testArray);