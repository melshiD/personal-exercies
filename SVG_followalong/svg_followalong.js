var tl = new TimelineMax(),
         box = document.querySelectorAll('.box');

tl.staggerFrom(box, 1, {
    x: -200, ease: Bounce.easeOut
}, 0.1)
tl.staggerFrom(box, 1, {
    rotation: 90, ease: Bounce.easeOut, delay: 1
}, 0.1)
tl.add('test_tag');

tl.staggerTo(box, 1, {
    x: '300%', ease: Bounce.easeOut
}, 0.1, '-=0.4')

tl.staggerTo(box, 3, { rotation: 1080}, 0.3);

tl.staggerTo(box, 2, {
    scale: 2,
    ease: 'Bounce.inOut'
}, 1, "test_tag");
tl.to('.new-box', 1, {
    skew: 35,
    scaleX: 2
}, 'test_tag-=0.5');