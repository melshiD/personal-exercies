const loadFile = file => Promise.resolve(`contents of ${file}`);
const files = ['01.md', '02.md', '03.md', '04.md', '05.md']

// let currentPromise = Promise.resolve([]);
// files.forEach( file =>{
//     currentPromise = currentPromise.then(allContents => {
//         return loadFile(file).then(contents => {
//             // setTimeout( (allContents, contents) => {
//                 allContents.push(contents);
//                 return allContents;
//             // }, 300);
//         })
//     })
// })
// currentPromise.then(result => console.log(result));

const finalPromise = files.reduce((previousPromise, file) => {
    return previousPromise.then(allContents=>{
        return loadFile(file).then(contents=>{
            allContents.push(contents);
            return allContents;
        })
    })
}, Promise.resolve([]));

finalPromise.then(result => {
    console.log(result);
});

// var orders = [
//     {amount: 250},
//     {amount: 400},
//     {amount: 100},
//     {amount: 325}
// ]

// const totalAmount = orders.reduce( function(sum, order) {
//     console.log(sum);
//     return sum += order.amount;
// }, 0);
// console.log(totalAmount);

async function* readFiles(files) {
    for(const file of files) {
      yield await readFile(file);
    }
  }; //async generator