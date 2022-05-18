gsap.set('.explainer, .vdom, .vdomtext, .gear, .code', {
    visibility: 'visible' })
  
  //-------------//
  //  helpers    //
  //-------------//
  
  const hideShow = (el1, el2) => {
    let elref1 = document.querySelector(el1)
    elref1.classList.add('visually-hidden')
    
    let elref2 = document.querySelector(el2)
    elref2.classList.remove('visually-hidden')
  }
  
  const showElement = (el) => {
    let elref = document.querySelector(el)
    elref.classList.remove('visually-hidden')
  }
  
  const updateText = (el, text) => {
    let elref = document.querySelectorAll(el)
    
    elref.forEach(function(el) {
      el.innerHTML = text
    });
  }
  
  const animateHeading = (tl, el1, el2, delay1, delay2) => {
     tl.to(`${el1} div`, { 
        opacity: 0, 
        scaleX: 0, 
        duration: 0.1,
        stagger: 0.01,
        ease: 'sine.in' 
      }, delay1) 
      tl.call(hideShow, [el1, el2])
      tl.to(`${el2} div`, { 
        opacity: 1, 
        scaleX: 1, 
        duration: 0.4,
        delay: delay2,
        stagger: 0.02,
        ease: 'sine' 
      }) 
      return tl
  }
  
  //------------------------//
  //  scene one, plus text  //
  //------------------------//
  
  const explainText = new SplitText('.explainer', { type: 'words, chars' });
  
  gsap.set('.explainer h2 div', {
    opacity: 0,
    scaleX: 0
  })
  
  gsap.set('.vdom, .vdomtext, .gear, .code, .fn-el, .fn-state, .fn-arr1, .fn-arr2', {
    opacity: 0
  })
  
  const scene1 = () => {
    const tl1 = gsap.timeline({
      delay: 0.7
    })
    
    tl1.to('.explain1 div', { 
        opacity: 1, 
        scaleX: 1, 
        duration: 0.4,
        delay: 0.5,
        stagger: 0.03,
        ease: 'sine' 
      }) 
    tl1.call(animateHeading, [tl1, '.explain1', '.explain2', '-=1.5', 0])
    tl1.add('vdomcreate', '+=1')
    tl1.to('.vdom', { 
        opacity: 1, 
        duration: 0.3,
        ease: 'sine' 
      }, 'vdomcreate') 
    tl1.to('.vdom', { 
        duration: 1.25,
        x: 350,
        perspective: 1200,
        rotateY: 20,
        ease: 'sine' 
      }, 'vdomcreate') 
    tl1.to('.vdomtext', { 
        opacity: 1, 
        duration: 0.35,
        ease: 'sine' 
      }) 
    tl1.call(animateHeading, [tl1, '.explain2', '.explain3', '+=2', 2])
    tl1.call(animateHeading, [tl1, '.explain3', '.explain4', '+=2', 0])
    tl1.call(animateHeading, [tl1, '.explain4', '.explain5', '+=2', 0])
    tl1.call(animateHeading, [tl1, '.explain5', '.explain6', '+=2', 0])
    tl1.call(animateHeading, [tl1, '.explain6', '.explain7', '+=2', 2])
    tl1.call(animateHeading, [tl1, '.explain7', '.explain8', '+=2', 0])
    tl1.call(animateHeading, [tl1, '.explain8', '.explain9', '+=4', 0])
    
    tl1.call(animateHeading, [tl1, '.explain9', '.explain10', '+=2', 0])
    tl1.call(animateHeading, [tl1, '.explain10', '.explain11', '+=2', 0])
    tl1.call(animateHeading, [tl1, '.explain11', '.explain12', '+=2', 0])
    
    tl1.call(animateHeading, [tl1, '.explain12', '.explain13', '+=2', 0])
    tl1.call(animateHeading, [tl1, '.explain13', '.explain14', '+=2', 0])
    tl1.call(animateHeading, [tl1, '.explain14', '.explain15', '+=2', 0])
    
    return tl1
  }
  
  //------------------//
  //  scene two       //
  //------------------//
  
  const scene2 = () => {
    const tl2 = gsap.timeline({
      delay: 16,
      ease: 'sine'
    })
    
    tl2.to('.vdom .firstli', { 
      background: '#eee',
      duration: 0.4
    })
    tl2.call(updateText, ['.vdom .firstli', 'Thing One'])
    tl2.to('.vdom .firstli', { 
      background: 'none',
      ease: 'sine.easeIn',
      delay: 0.2,
      duration: 0.3
    })
    tl2.add('geardom', '+=3.5')
    //gear stuff
    tl2.to('.gear', { 
      opacity: 1,
      duration: 0.4
    }, 'geardom')
    tl2.to('.midgear', { 
      rotation: -720,
      duration: 1.5,
      transformOrigin: '50% 50%'
    }, 'geardom')
    tl2.to('.geararrows', { 
      rotation: 720,
      duration: 1.5,
       transformOrigin: '50% 50%'
    }, 'geardom')
    //dom update
    tl2.to('.dom .firstli', { 
      background: '#eee',
      duration: 0.4
    }, 'geardom')
    tl2.call(updateText, ['.dom .firstli', 'Thing One'], 'geardom')
    tl2.to('.dom .firstli', { 
      background: 'none',
      ease: 'sine.easeIn',
      delay: 0.2,
      duration: 0.3
    }, 'geardom+=0.5')
    tl2.to('.gear', { 
      opacity: 0,
      duration: 0.4,
      ease: 'sine.easeIn',
    }, 'geardom+=1.75')
    
    return tl2
  }
  
  
  //------------------//
  //  scene three     //
  //------------------//
  
  const scene3 = () => {
    const tl3 = gsap.timeline({
      delay: 29,
      ease: 'sine'
    })
    
    tl3.to('.code', { 
      opacity: 1,
      duration: 0.4
    })
    tl3.add('children', '+=5')
    tl3.call(showElement, ['.fn-el'], 'children')
    tl3.call(showElement, ['.fn-state'], 'children')
    tl3.call(showElement, ['.fn-arr1'], 'children')
    tl3.to('.fn-el', { 
      opacity: 1,
      duration: 0.6
    }, 'children+=0.2')
    tl3.to('.fn-state', { 
      opacity: 1,
      duration: 0.6
    }, 'children+=0.7')
    tl3.to('.fn-arr1', { 
      opacity: 1,
      duration: 0.6
    }, 'children+=1.2')
    tl3.call(hideShow, ['.fn-arr1', '.fn-arr2'], 'children+=7')
    tl3.to('.fn-arr2', { 
      opacity: 1,
      duration: 0.6
    }, 'children+=7')
    
    return tl3
  }
  
  //------------------//
  //  scene four      //
  //------------------//
  
  const scene4 = () => {
    const tl4 = gsap.timeline({
      delay: 45,
      ease: 'sine'
    })
    
    tl4.add('ending')
    tl4.to('.last-text', { 
      background: '#eee',
      duration: 0.75
    }, 'ending')
    tl4.to('.last-text', { 
      background: 'none',
      ease: 'sine.easeIn',
      duration: 0.25
    }, 'ending+=0.75')
    
    tl4.to('.last-ul', { 
      background: '#eee',
      duration: 0.75
    }, 'ending+=3')
    tl4.to('.last-ul', { 
      background: 'none',
      ease: 'sine.easeIn',
      duration: 0.25
    }, 'ending+=3.75')
    
    tl4.to('.last-li', { 
      background: '#eee',
      duration: 0.75
    }, 'ending+=6')
    tl4.to('.last-li', { 
      background: 'none',
      ease: 'sine.easeIn',
      duration: 0.25
    }, 'ending+=6.75')
    
    //update the list items
    tl4.to('.last-li', { 
      background: '#eee',
      duration: 0.75
    }, 'ending+=10')
    tl4.call(updateText, ['.update-li', 'New List Items!'], 'ending+=10')
    tl4.to('.last-li', { 
      background: 'none',
      ease: 'sine.easeIn',
      duration: 0.25
    }, 'ending+=10.75')
    
    
    //update the list items in the dom
    tl4.to('.dom-last-li', { 
      background: '#eee',
      duration: 0.75
    }, 'ending+=14')
    tl4.call(updateText, ['.dom-last-li', 'New List Items!'], 'ending+=14')
    tl4.to('.dom-last-li', { 
      background: 'none',
      ease: 'sine.easeIn',
      duration: 0.25
    }, 'ending+=14.75')
     //gear stuff
    tl4.to('.gear', { 
      opacity: 1,
      duration: 0.4
    }, 'ending+=14')
    tl4.to('.midgear', { 
      rotation: -1440,
      duration: 1.5,
      transformOrigin: '50% 50%'
    }, 'ending+=14')
    tl4.to('.geararrows', { 
      rotation: 1440,
      duration: 1.5,
       transformOrigin: '50% 50%'
    }, 'ending+=14')
    tl4.to('.gear', { 
      opacity: 0,
      duration: 0.4,
      ease: 'sine.easeIn',
    }, 'ending+=15.75')
    
    return tl4
  }
  
  //------------------//
  //     master       //
  //------------------//
  
  window.onload = () => {
    const sceneOne = scene1()
    const sceneTwo = scene2()
    const sceneThree = scene3()
    const sceneFour = scene4()
    
    const master = gsap.timeline()
    master.add('sceneOne')
    master.add('sceneTwo')
    master.add('sceneThree')
    master.add('sceneFour')
  };