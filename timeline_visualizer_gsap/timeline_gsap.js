var pixelsPerSecond = 200;
var animation = gsap.timeline();
animation
    .to("#star", {duration:4, x:1150}, 1)
    .to("#circle", {duration:1, x:1150}, 1)
    .to("#square", {duration:3, x:1150}, 1);



animation.eventCallback("onUpdate", movePlayhead).paused(true);
gsap.to("svg", {autoAlpha:1});
var time = document.getElementById("time")
var maxX = animation.duration() * pixelsPerSecond;

var children = animation.getChildren()
var numChildren = children.length;

for(var i = 0; i < numChildren; i++){
  gsap.set("#tween" + i, {x:children[i].startTime() * pixelsPerSecond})
  gsap.set("#rect" + i, {width:children[i].duration() * pixelsPerSecond})
}

var svgTimeline = document.getElementById('timeline');

var dragger = Draggable.create("#playhead", {
  type:"x", 
  cursor:"pointer",
  trigger:"#playhead",
  bounds: {minX:0, maxX:maxX},
  onDrag:function(){
    animation.pause();
    time.textContent=animation.time().toFixed(1);
    animation.progress(this.x/maxX);
  }
});

svgTimeline.addEventListener('mousedown', handleClick);


function movePlayhead() {
  gsap.set("#playhead", {x:animation.progress() * maxX});
  time.textContent=animation.time().toFixed(1); 
}

document.getElementById("play").onclick = function() {
  animation.play();
}

document.getElementById("pause").onclick = function() {
  animation.pause();
}

document.getElementById("reverse").onclick = function() {
  animation.reverse();
}

function handleClick(e) {
  let newX = findPercentIntoTimeline(e.offsetX);
  // animation.pause();
  // gsap.set("#playhead", { x: newX*1200 });
  animation.progress(newX);
}

function findPercentIntoTimeline(offsetX) {
  let timelineWidth = document.getElementById('tween_x5F_bg').getBoundingClientRect().width,
    timelineOffset = document.getElementById('tween_x5F_bg').getBoundingClientRect().x;
  let xIntoRect = offsetX - timelineOffset;
  let percentIntoTimeline = xIntoRect / timelineWidth;
  return percentIntoTimeline;
}