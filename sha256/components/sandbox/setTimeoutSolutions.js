function delay(delayTime, v){
  return new Promise(function(resolve){
    setTimeout(resolve.bind(null, v) delayTime)
  });
}




// let newButton = document.createElement('button');
// newButton.innerHTML = 'Im a button';
// document.body.appendChild(newButton);
