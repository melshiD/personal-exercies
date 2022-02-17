let dog = {
    sound: 'woof',
    talk: function(){
        console.log(this.sound);
    }
}

dog.talk();

let talkFunction = dog.talk.bind(dog);
talkFunction();
// let boundFunction = talkFunction.bind(dog);
// boundFunction(); 

class Dog{
    constructor(name){
        this.name = name;
    }
    speak(){
        console.log('bark');
    }
}

let mark = new Dog('Mark');
mark.speak();

let markBark = mark.speak;
markBark();
// http://127.0.0.1:5500/three_js_fundamentals/from_threejs_org/loaders/loaders.js net::ERR_ABORTED 404 (Not Found)