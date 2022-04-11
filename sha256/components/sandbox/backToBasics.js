//in an effort to make well-formed timelines with chained promises and setTimeouts
function sayBlue(){
    console.log('blue');
}
function sayPink(){
    console.log('pink');
}
function sayGreen(){
    console.log('green');
}

function delayFunction(delayTime, delayFunc, necessaryItems = null){
    return new Promise( (resolve) =>{
        setTimeout(delayFunc, delayTime);
    })
}

delayFunction(1000, sayBlue)
    .then( 
        delayFunction(1000, sayPink)
    );