window.addEventListener('scroll', ()=> {
    let header = document.querySelector('header');
    let isScrolling = window.scrollY > 0;
    header.classList.toggle('scrolling-active', isScrolling);
});


class newClass{
    constructor(param1, param2){
        this.width = param1;
        this.height = param2;
    }
}