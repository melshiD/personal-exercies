const performCardFive = new Promise( resolve => {
    for (let i = 0, p = Promise.resolve(); i < 32; i++) {
        console.log('im here');
        p = p.then(() => sequencePromise(evalDuration)).then(() => {
            let majority = parseInt(inputStringsAsArrays[0][i], 10) +
                parseInt(inputStringsAsArrays[1][i], 10) +
                parseInt(inputStringsAsArrays[2][i], 10);
            let resultsDisplayOutput = '';
            if (majority > 1) {
                //highlight the majority digit/s in that column;
                for (let t = 0; t < 3; t++) {
                    if (inputStringsAsArrays[0][i] > 0) threeListsOf32Spans[0].children[(31 - i)].classList.add('activeSpanDigitOne');
                    if (inputStringsAsArrays[1][i] > 0) threeListsOf32Spans[1].children[(31 - i)].classList.add('activeSpanDigitOne');
                    if (inputStringsAsArrays[2][i] > 0) threeListsOf32Spans[2].children[(31 - i)].classList.add('activeSpanDigitOne');
                }
                resultsDisplayOutput = `${'1'}${resultsDiv.innerHTML}`;
                resultsDiv.innerHTML = `${resultsDisplayOutput}`;
            }
            if (majority < 2) {
                //highlight the majority digit/s in that column;
                for (let t = 0; t < 3; t++) {
                    if (inputStringsAsArrays[0][i] == '0') threeListsOf32Spans[0].children[(31 - i)].classList.add('activeSpanDigitZero');
                    if (inputStringsAsArrays[1][i] == '0') threeListsOf32Spans[1].children[(31 - i)].classList.add('activeSpanDigitZero');
                    if (inputStringsAsArrays[2][i] == '0') threeListsOf32Spans[2].children[(31 - i)].classList.add('activeSpanDigitZero');
                }
                resultsDisplayOutput = `${'0'}${resultsDiv.innerHTML}`;
                resultsDiv.innerHTML = `${resultsDisplayOutput}`;
            }
            // await delay.then(removeDigitStyle(threeListsOf32Spans, i));
        });
    }
})