//--------Single rotate/shift transform function-----------------
function transformWordsAndReturnReceipt(inputBits, amount, flag){
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

const generateRotationSchedule = (inputWord, rotationSpecs) => {
    let transDigests = [];
    for(let spec of rotationSpecs){
        transDigests.push(transformWordsAndReturnReceipt(inputWord, spec.amount, spec.rotation));
    }
    return transDigests;
}

let THREE_DIGESTS = generateRotationSchedule('11111111000000001111119100000000', 
                                        [{rotation: 'ROTR', amount: 9}, 
                                         {rotation: 'SHR', amount: 22},
                                         {rotation: 'SHR', amount: 23}]);

let ONE_DIGEST = THREE_DIGESTS[0];

const printWordsFromDigest = (digest, rotationDuration, index = 0) => { 
    if(index > digest.length - 1){
        return;
    }
    console.log(digest[index]);
    setTimeout( () => {
        printWordsFromDigest(digest, rotationDuration, index+1);
    }, rotationDuration);
}

printWordsFromDigest(ONE_DIGEST, 200, 0);
// const greeting = delayAmount => {
//     setTimeout( () => {
//         console.log('it rains today at ' + delayAmount);
//         if(delayAmount <= 0){
//             return;
//         }
//         greeting(Math.floor(delayAmount/2));
//     }, delayAmount)
// }
// greeting(2000);