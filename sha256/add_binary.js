const { download } = require("express/lib/response");

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
    //ridiculous padding function to fill in the front with zeros
    let padding = Array.apply(null, Array(amount)).map(function (pad) {return'0'}).join('');
    return function(word){
        let shifted = `${padding}${word.slice(0, -17)}`;
        console.log(`original word :${word}`);
        console.log(`${amount} Char right :${shifted}`);

        // return `${padding}${word.slice(0, -17)}`;
        return shifted;
    }
}

const SR17 = shiftRight(17);
let shifted = SR17('11100001011000100110001110001100');

let testArray = ['11100001011000100110001110001100',
                 '01100001011000000110001110000000',
                 '01000100000000000000000010000000',
                 '01100001011000101100000110000011'];

// console.log(addArrayOfBinWords(testArray));

// WHEN YOU SIT BACK DOWN FIGURE OUT TWO THINGS: 
// IS THE SHIFT RIGHT SR FUNCTION REALLY HANDING INPUT AS BINARY AS IT SHOULD
// WHATS UP WITH THE SIGN OVERFLOWING WHEN I USE ALL 32 BITS TO THE SR17 FUNCTION
