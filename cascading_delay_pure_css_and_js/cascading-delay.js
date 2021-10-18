//for x-number of iterations, make an html element and apply a inline delay
//then try to stagger animations by adding variables to the root declaration

var numberOfSquares = 100;
var parentNode = document.getElementById('master-div');
var numberOfSquares = 200;
var delayTimeInMS = 50;

function makeSomeSquare(numberOfSquares, parentNode){
    for(let i = 0; i < numberOfSquares; i ++){
        let thisNode = document.createElement('div');
        thisNode.id = `index-${i}`;
        thisNode.style.transition = `opacity ${i * delayTimeInMS}ms`
        parentNode.appendChild(thisNode);
    }

}

makeSomeSquare(numberOfSquares, parentNode);