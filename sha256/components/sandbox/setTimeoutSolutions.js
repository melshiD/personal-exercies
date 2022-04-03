function delay(ms) {
    return new Promise(endsUp => setTimeout(endsUp, ms));
  }
  
function delayTwo(ms) {
    return new Promise( )
}
function delayThree(ms) {

}

  delay(3000).then(() => console.log('1: first running')).then( () => {
    delay(3000).then( () => {
        console.log('2: here we are');
        console.log('2: haiku');
    })
  })
