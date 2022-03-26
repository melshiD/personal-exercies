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

let THREE_DIGESTS = generateRotationSchedule('11111111000000001111110100000000', 
                                        [{rotation: 'ROTR', amount: 13}, 
                                         {rotation: 'ROTR', amount: 2},
                                         {rotation: 'SHR', amount: 23}]);

let ONE_DIGEST = THREE_DIGESTS[0];
let DIGEST_TWO = THREE_DIGESTS[1];
let DIGEST_THREE = THREE_DIGESTS[2];

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

function double(rotTime){
    let timeOne = Math.floor(rotTime/ONE_DIGEST.length);
    let timeTwo = Math.floor(rotTime/DIGEST_TWO.length);
    let timeThree = Math.floor(rotTime/DIGEST_THREE.length);
    printWordsFromDigest(ONE_DIGEST, timeOne, 0, element1);
    printWordsFromDigest(DIGEST_TWO, timeTwo, 0, element2);
    printWordsFromDigest(DIGEST_THREE, timeThree, 0, element3);
}
// printWordsFromDigest(ONE_DIGEST, 200, 0);
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
