var pixelsPerSecond = 200;
var animation = gsap.timeline();
let bodyDeltaBackground = currentMargin();
var svgTimeline = document.getElementById('timeline');
svgTimeline.addEventListener('mousedown', handleClick);
svgTimeline.addEventListener('wheel', handleWheel, { passive: true });

function currentMargin() {
  //manages the margins that may be between the SVG background and the body as a whole
  let currentMargin = Math.floor(Math.abs((document.body.offsetWidth -
    document.getElementById('Layer_1')
      .getBoundingClientRect().width) / 2));
  return currentMargin;
}

window.addEventListener('resize', () => {
  bodyDeltaBackground = currentMargin();
});

console.log("HERE: " + bodyDeltaBackground);
gsap.to("svg", { autoAlpha: 1 });
animation
  .to("#star", { duration: 6, x: 1150 }, 0)
  .to("#circle", { duration: 1, x: 1150 }, 1)
  .to("#square", { duration: 1, x: 1150 }, 1)
  // .to("#cheap_tricks", {duration: 6, x: 0}, 0);

var duration = animation.duration() * pixelsPerSecond;
let portionOfPlaybackThatsAnimation = duration/document.getElementById('tween_x5F_bg').getAttribute('width');
console.log("portionOfPlaybackThatsAnimation " + portionOfPlaybackThatsAnimation);

animation.eventCallback("onUpdate", movePlayhead).paused(true);

var time = document.getElementById("time")

// let maxX = 1200; looked to work because 6 sec x 200 is 1200
let maxX = document.getElementById('tween_x5F_bg').getBoundingClientRect().width;
let timelineScalingFactor = maxX/document.getElementById('tween_x5F_bg').getAttribute('width');
let pixelsOfDuration = Math.floor(duration * timelineScalingFactor);
console.log("pixels of duration :" + pixelsOfDuration);

console.log(maxX);

var children = animation.getChildren()
var numChildren = children.length;

for (var i = 0; i < numChildren; i++) {
  gsap.set("#tween" + i, { x: children[i].startTime() * pixelsPerSecond })
  gsap.set("#rect" + i, { width: children[i].duration() * pixelsPerSecond })
}



var dragger = Draggable.create("#playhead", {
  type: "x",
  cursor: "pointer",
  trigger: "#playhead",
  bounds: { minX: 0, maxX: maxX },
  // onPress: handleClick(),
  onDrag: function () {
    animation.pause();
    time.textContent = animation.time().toFixed(1);
    animation.progress(this.x / 1000);
    //use a 'playableWidth' variable?
  }
});

function movePlayhead() {
  //multiplication factor needs to match the svg length of the playhead
  gsap.set("#playhead", { x: animation.progress() * duration });
  time.textContent = animation.time().toFixed(2);
}

document.getElementById("play").onclick = function () {
  animation.play();
}

document.getElementById("pause").onclick = function () {
  animation.pause();
}

document.getElementById("reverse").onclick = function () {
  animation.reverse();
}

function handleClick(e) {
console.log(e.offsetX);
  let xOffset = document.getElementById('tween_x5F_bg').getBoundingClientRect().x
  console.log("offset of tween_rect :" + xOffset);
  let percentIntoDuration = clickInAnimation(e, xOffset);
  
  animation.pause();

  //here is where the persumed length of the playhead and duration of the 
  //animation can confict to cause the time to not track with the palyhead past the 
  //set animations
  gsap.set("#playhead", { x: percentIntoDuration*duration });//going a percent of duration?
  animation.progress(percentIntoDuration);
  // movePlayhead();
}

function handleWheel(e) {
  let degree = - (e.deltaY * 0.0001);
  animation.progress(animation.progress() + degree).pause();

}

function findPercentIntoTimeline(offsetX) {
  // let timelineWidth = document.getElementById('timeline').getBoundingClientRect().width,
  //   timelineOffset = document.getElementById('timeline').getBoundingClientRect().x;
  let timelineWidth = document.getElementById('tween_x5F_bg').getBoundingClientRect().width,
    timelineOffset = document.getElementById('tween_x5F_bg').getBoundingClientRect().x;
  let xIntoRect = offsetX - timelineOffset + bodyDeltaBackground;
  let percentIntoTimeline = xIntoRect / timelineWidth;
  return percentIntoTimeline;
}

function clickInAnimation(e, xOffset){
  let xPositionClicked = e.offsetX - xOffset;
  if(xPositionClicked >= pixelsOfDuration){
    return 1;
  }
  return xPositionClicked/pixelsOfDuration;
}
//percent into playhead assumes annimation goes all the way to end of playhead