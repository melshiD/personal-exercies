console.clear();
const svgns = "http://www.w3.org/2000/svg";
const demo = document.querySelector("svg");
let count = 0;
const colorArray = ["#94c356", "#46a4cc", "#a63e4b"];

for (let j = 0; j < 8; j++) {
  for (let i = 0; i < 8; i++) {
    count++;

    let newSquare = document.createElementNS(svgns, "rect");
    let txt = document.createElementNS(svgns, "text");
    demo.appendChild(newSquare);
    demo.appendChild(txt);
    txt.textContent = count;

    let squareSize = 100;

    gsap.set(newSquare, {
      attr: {
        x: squareSize * i,
        y: j * squareSize,
        width: squareSize,
        height: squareSize,
        fill: colorArray[count % 3]
      }
    });
    gsap.set(txt, {
      attr: { x: 100 * i + 50, y: j * 100 + 70, "text-anchor": "middle" }
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

