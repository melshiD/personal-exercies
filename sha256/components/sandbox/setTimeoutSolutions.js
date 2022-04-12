// function getTemperature(){
//   return new Promise((resolve, reject) => {
//     const delay = Math.floor(Math.random() * (10000 - 1000 +1) + 1000);
//     const temp = Math.floor(Math.random() * (300 - 1 + 1) + 1);
//     console.log(delay, temp);
//     setTimeout(() => {
//       if(temp>200){
//         reject('too hot');
//       }else if(temp<100){
//         reject('too cold');
//       }
//       else{
//         resolve('just right');
//       }
//     }, delay)
//   });
// }

// getTemperature()
//   .then(result=>console.log(result))
//   .catch(error => console.log(error));


  // function delay(delayTime, v){
//   return new Promise(function(resolve){
//     setTimeout(resolve.bind(null, v) delayTime)
//   });
// }
