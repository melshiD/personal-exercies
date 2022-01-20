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
