var pixelsPerSecond = 200;
var animation = gsap.timeline();
animation
    .to("#star", {duration:20, x:1150})
    .to("#circle", {duration:1, x:1150})
    .to("#square", {duration:3, x:1150}, "<-2")



animation.eventCallback("onUpdate", movePlayhead).paused(true);
gsap.to("svg", {autoAlpha:1})
var time = document.getElementById("time")
var maxX = animation.duration() * pixelsPerSecond;

var children = animation.getChildren()
var numChildren = children.length;

for(var i = 0; i < numChildren; i++){
  gsap.set("#tween" + i, {x:children[i].startTime() * pixelsPerSecond})
  gsap.set("#rect" + i, {width:children[i].duration() * pixelsPerSecond})
}
var dragger = Draggable.create("#playhead", {
  type:"x", 
  
  cursor:"pointer",
  trigger:"#timeline",
  bounds: {minX:0, maxX:maxX},
  onDrag:function(){
    animation.pause();
    time.textContent=animation.time().toFixed(1);
    animation.progress(this.x/maxX);
  }

});

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

