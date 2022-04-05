function delay(ms) {
    return new Promise(endsUp => setTimeout(endsUp, ms));
  }

  delay(3000)
    .then(() => console.log('1: first running'))
    .then(() => { delay(3000)
    .then(() => {
        let newButton = document.createElement('button');
        newButton.innerHTML = 'Im a button';
        document.body.appendChild(newButton);
    })
  })
