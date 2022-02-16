const svgns = "http://www.w3.org/2000/svg";
const fullSvg = document.querySelector("svg");
let count = 0;

  for (let i = 0; i < 52; i++) {
    for (let j = 0; j < 7; j++) {
    count++;

    let gridSpace = document.createElementNS(svgns, 'g');
    gridSpace.setAttribute('id', `grid_space_${count}`)
    let outerSquare = document.createElementNS(svgns, "rect");
    let innerSquare = document.createElementNS(svgns, "rect");
    innerSquare.setAttribute('dayId', count);

    outerSquare.classList.add('dayContainer');
    innerSquare.classList.add('emptyDay');
    innerSquare.classList.add(`commit-0`);
    // innerSquare.classList.add(`commit-${count%4}`);

    gridSpace.appendChild(outerSquare);
    gridSpace.appendChild(innerSquare);

    fullSvg.appendChild(gridSpace);

    let squareSize = 80;

    gsap.set(outerSquare, {
      attr: {
        x: squareSize * i,
        y: j * squareSize,
        width: squareSize,
        height: squareSize
      }
    });

    let borderPercentage = Math.floor(squareSize/3.8);
    let borderInPixels = borderPercentage/2;

    gsap.set(innerSquare, {
      attr: {  //if it seems weird, it's just to position the inner square 
                //centered on the outer square
        x: squareSize * i + borderInPixels/2,
        y: j * squareSize + borderInPixels/2,
        width: squareSize-borderInPixels,
        height: squareSize-borderInPixels
      }
    });
  }
}
let targets = gsap.utils.toArray("button");
targets.forEach((obj) => {
  obj.addEventListener("click", animateViewBox);
});
function animateViewBox() {
  let moveTo = this.getAttribute("data-view");
  gsap.to(demo, {
    duration: 1,
    attr: { viewBox: moveTo },
    ease: "power3.inOut"
  });
}

function changePatternVisually(patternSeed){
  let days = document.querySelectorAll('.emptyDay');
  days.forEach( daySquare => {
    daySquare.classList.remove('commit-1', 'commit-2', 'commit-3', 'commit-4', 'commit-5', 'commit-6', 'commit-7');
    let numberInput = daySquare.getAttribute('dayId');
    daySquare.classList.add(`commit-${numberInput%patternSeed}`);
  })
}

function changePatternBelivably(){
  let days = document.querySelectorAll('.emptyDay');
  days.forEach( daySquare => {
    daySquare.classList.remove('commit-1', 'commit-2', 'commit-3', 'commit-4', 'commit-5', 'commit-6', 'commit-7');
    let numberInput = daySquare.getAttribute('dayId');
    if(numberInput % 7 == 0 || numberInput % 7 == 1){
      let rand = Math.floor(Math.random()*2);
      // daySquare.classList.add(`commit-red`);
      daySquare.classList.add(`commit-${rand}`);
    }
    else{
      let rand = Math.floor(Math.random()*4);
      daySquare.classList.add(`commit-${rand+1}`);
    }
  });
}

changePatternBelivably();
