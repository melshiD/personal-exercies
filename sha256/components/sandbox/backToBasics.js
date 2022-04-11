const res = require("express/lib/response");

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

//Well, as you know a Promise really just calls a resolve function or reject function after something happens.

const asyncFoo = async () => {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    console.log('nice');
    console.log('way better');
    await new Promise((resolve) => setTimeout(resolve, 2000));
    console.log('and thats a wrap')
}


const resFunc = () => console.log('resolving log func');
const sleep = (ms, resolvingFunc) =>{
    return new Promise(flobsDizzle => setTimeout(
        flobsDizzle, ms));
}

async function asyncBar(ms){
    console.log('did it...');
    await sleep(ms, resFunc);
    console.log('doe');
    await sleep(ms, resFunc);
    console.log('and again');
}
asyncBar(1000);