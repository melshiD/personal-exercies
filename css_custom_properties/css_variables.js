var slider = document.querySelector('.arb-val-slider');
console.log(slider);
slider.addEventListener('change', () => {
    this.setHoverColor(slider.value);
    console.log(slider.value);

});
//why can't I use 'this' in the context of the above function??
function setHoverColor(newArbVal){
    let body = document.querySelector('body');
    body.style.setProperty('--arb-val', newArbVal);
    console.log('in the setHoverColor function');
}