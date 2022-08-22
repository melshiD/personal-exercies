TweenMax.set('#Application_process, #host_instance, #host-shadow, #tube, #functions, #platform', {
    visibility: 'visible'
  })
  
  var tl = new TimelineMax();
  
  tl.add('start', '+=0.5')
  tl.fromTo('#host_instance, #host-shadow', 2, {
    autoAlpha: 0,
    scale: 0.9
  }, {
    autoAlpha: 1,
    scale: 1,
    transformOrigin: '50% 50%',
    ease: Elastic.easeOut.config(1, 0.75)
  }, 'start')
  tl.fromTo('#host_instance, #host-shadow, #tube', 2, {
    autoAlpha: 0
  }, {
    autoAlpha: 1,
    transformOrigin: '50% 50%',
    ease: Sine.easeOut
  }, 'start')
  tl.fromTo('#Application_process', 2, {
    autoAlpha: 0,
    scale: 0.9
  }, {
    autoAlpha: 1,
    scale: 1,
    transformOrigin: '50% 50%',
    ease: Elastic.easeOut.config(1, 0.75)
  })
  tl.fromTo('#functions', 2, {
    autoAlpha: 0,
    scale: 0.9
  }, {
    autoAlpha: 1,
    scale: 1,
    transformOrigin: '50% 50%',
    ease: Elastic.easeOut.config(1, 0.75)
  })
  tl.add('faas')
  tl.to('#Application_process, #host_instance, #tube, .first', 1, {
    autoAlpha: 0,
    ease: Sine.easeIn
  }, 'faas+=1')
  tl.to('#host-shadow', 0.5, {
    opacity: 0.4,
    y: -40,
    ease: Sine.easeIn
  }, 'faas+=1')
  tl.fromTo('#platform', 2, {
    autoAlpha: 0,
    scale: 0.9
  }, {
    autoAlpha: 1,
    scale: 1,
    transformOrigin: '50% 50%',
    ease: Elastic.easeOut.config(1, 0.75)
  }, 'faas+=3.5')
  tl.fromTo('.second', 1, {
    autoAlpha: 0
  }, {
    autoAlpha: 1,
    ease: Sine.easeOut
  }, 'faas+=3')
  tl.to('svg', 2, {
    attr: {
      'viewBox': '50 0 1067 719.3'
    },
    ease: Sine.easeOut
  }, 'faas+=2')
  tl.to('#sun', 2, {
    x: 100,
    ease: Sine.easeOut
  }, 'faas+=2')
  
  tl.timeScale(1.2)