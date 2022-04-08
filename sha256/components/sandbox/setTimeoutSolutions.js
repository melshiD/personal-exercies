function delay(t, v){
  return new Promise(function(resolve){
    setTimeout(resolve.bind(null, v) t)
  });
}



// let newButton = document.createElement('button');
// newButton.innerHTML = 'Im a button';
// document.body.appendChild(newButton);