
// const foo =async () => {
//     setTimeout(() => {
//         console.log('Callback based stuff');
//         console.log('yet another thing');
//         // lots more stuff
//     }, 2000);
// }

const { Float16BufferAttribute } = require("three");

const asyncFoo = async () => {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    console.log('promise finished and awaited');
}

function resolveAfter2Seconds(x) {
    return new Promise( (_, other) => {
      setTimeout(() => {
        _(x);
      }, 2000);
    });
  }
  
  async function f1() {
    var x = await resolveAfter2Seconds(10);
    console.log(x); // 10
  }
  
f1();