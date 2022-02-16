const fruitBasket = {
    'apple': 23,
    'pear': 14,
    'banana': 2030
}

const sleep = ms => {
    return new Promise(resolve => setTimeout(resolve, ms))
}

const getNumFruit = fruit => {
    return sleep(200).then( () => fruitBasket[fruit])
}

const fruitsToGet = ['apple', 'banana', 'pear'];

const forLoop = async _ => {
    console.log('start');
    for(let i = 0; i < fruitsToGet.length; i++){
        // console.log(fruitBasket[fruitsToGet[i]]);
        let fruit = await getNumFruit(fruitsToGet[i]);
        console.log(fruit);
    }
}

forLoop();