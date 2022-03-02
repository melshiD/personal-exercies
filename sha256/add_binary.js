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
    console.log(evaluatedBinaryString);
    return evaluatedBinaryString.reverse().join('');
}

let testArray = ['10100111', '11010001', '10000011', '10111101'];
//parseInt(num.toString(2)[4]) + parseInt(num.toString(2)[4]);
console.log(addArrayOfBinWords(testArray));