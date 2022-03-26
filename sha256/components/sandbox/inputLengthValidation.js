//-------------event listener for input  length----------------
let inputBits = document.getElementById('bitsInput');
inputBits.addEventListener('keyup', (event) => {
    lengthIndicator = event.target.value;
    inputBits.classList.add('incorrectLength');
    inputBits.classList.remove('correctLength');
    if(inputBits.value.length === 32){
        inputBits.classList.remove('incorrectLength');
        inputBits.classList.add('correctLength');
    }
});

