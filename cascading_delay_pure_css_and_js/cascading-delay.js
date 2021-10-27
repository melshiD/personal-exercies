//for x-number of iterations, make an html element and apply a inline delay
//then try to stagger animations by adding variables to the root declaration

var numberOfSquares = 100;
var parentNode = document.getElementById('master-div');
var numberOfSquares = 200;
var delayTimeInMS = 30;

function makeSomeSquare(numberOfSquares, parentNode){
    for(let i = 0; i < numberOfSquares; i ++){
        let thisOuterNode = document.createElement('div');
        thisOuterNode.id = `fade-transform-${i}`;
        let thisNode = document.createElement('div');
        thisNode.id = `index-${i}`;
        thisOuterNode.style.transition = `opacity 0.9s ${i * delayTimeInMS}ms`;
        thisOuterNode.appendChild(thisNode);
        parentNode.appendChild(thisOuterNode);
    }

}
makeSomeSquare(numberOfSquares, parentNode);
