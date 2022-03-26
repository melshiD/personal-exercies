//--------Single rotate/shift transform function-----------------
function transformWordsAndReturnReceipt(inputBits, amount, flag){
    let transformedDigest = [inputBits];
    let transformed = '';
    for(let i = 0; i < amount; i++){
        if(flag === 'ROTR'){
            console.log('rotating, rotating');
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
        console.log(spec);
        transDigests.push(transformWordsAndReturnReceipt(inputWord, spec.amount, spec.rotation));
    }
    return transDigests;
}

let digest = generateRotationSchedule('11111111000000001111111100000000', 
                                        [{rotation: 'ROTR', amount: 12}, 
                                         {rotation: 'SHR', amount: 22},
                                         {rotation: 'SHR', amount: 23}]);
console.log(digest);