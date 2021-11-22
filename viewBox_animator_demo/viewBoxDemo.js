//const gsap = require('./../node_modules/gsap/dist/gsap');

console.clear();
const svgns = "http://www.w3.org/2000/svg";
const demo = document.querySelector("svg");
let count = 0;
const colorArray = ["#94c356", "#46a4cc", "#a63e4b"];

for (let j = 0; j < 4; j++) {
  for (let i = 0; i < 4; i++) {
    count++;

    let newSquare = document.createElementNS(svgns, "rect");
    let txt = document.createElementNS(svgns, "text");
    demo.appendChild(newSquare);
    demo.appendChild(txt);
    txt.textContent = count;

    gsap.set(newSquare, {
      attr: {
        x: 200 * i,
        y: j * 200,
        width: 200,
        height: 200,
        fill: colorArray[count % 3]
      }
    });
    gsap.set(txt, {
      attr: { x: 200 * i + 100, y: j * 200 + 115, "text-anchor": "middle" }
    });
  }
}