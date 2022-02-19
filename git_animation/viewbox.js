

const svgns = "http://www.w3.org/2000/svg";
const fullSvg = document.querySelector("svg");
let count = 0;

  for (let i = 0; i < 208; i++) {
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
      daySquare.classList.add(`commit-${rand+1}`);
    }
    else{
      let rand = Math.floor(Math.random()*4);
      daySquare.classList.add(`commit-${rand+2}`);
    }
  });
}

async function changeOnAnInterval(delayAmount){
  const timeDelay = ms => new Promise(resolve => setTimeout(resolve, ms));
  const patternKeys = [8, 14, 6, 6];
  const patternKey = key => {
    return timeDelay(delayAmount).then( () => {
      changePatternVisually(key);
    })
  }
  for(let i of patternKeys){
    await patternKey(i);
  }
  await changePatternBelivably();
}

let viewBox = document.querySelector('svg');
// viewBox.setAttribute('viewBox', '0 0 16640 560');
// viewBox.setAttribute('viewBox', '0 0 12480 560');
// viewBox.setAttribute('viewBox', '0 0 4160 560');
viewBox.setAttribute('viewBox', '0 0 5500 560');

function animateViewBox(newViewBox) {
  let target = document.querySelector('svg');
  tl = gsap.timeline({ defaults: {duration: 1.2, ease: "power1.inOut"} } );
  tl.delay(1.8);
  tl.to(target, {attr: {viewBox: newViewBox}, duration: .98, ease: 'power3'}, 'zoom-out-move-up');
  tl.to('.svg-container', {top: '2vh', ease: "power3.inOut", duration: 1.2}, 'zoom-out-move-up');
  // tl.to('.emptyDay', {attr:{rx: '0.01%'}, ease: "power3.inOut", duration: 1.2}, 'zoom-out-move-up');

  // tl.delay(1.8);
  // tl.addLabel('change-to-solid');
  // tl.to(['.dayContainer', '.emptyDay'],{stroke: 'rgba(27, 31, 35, 1)', fill: 'rgba(27, 31, 35, 1)', duration: 0.7}, 'change-to-solid');
  // tl.to('.svg-container', {borderWidth: '2px', backgroundColor: 'rgba(27, 31, 35, 1)'}, 'change-to-solid');
  // tl.addLabel('squish-nav');
  // tl.to(target, {attr: {viewBox: '0 0 10160 40'}, ease: 'linear'}, 'squish-nav');
  
  tl.play();
}

function goSolid(){
  let days = document.querySelectorAll('.emptyDay');
  let borders = document.querySelectorAll('.dayContainer');
  days.forEach( daySquare => {
      daySquare.setAttribute('id', 'go-solid');        
  });
  borders.forEach( border => {
    border.setAttribute('id', 'go-soild');
  })
}

changeOnAnInterval(300);
animateViewBox('0 0 16540 560');
// animateViewBox('0 0 16640 560');
