let talk = function(){
    console.log(this.sound);
}

let boromir = {
    sound: 'One does not simply walk into mordor'
}

let tyler = {
    sound: 'I really love the smell in the morning'
}

boromir.talk = talk.bind(boromir),
boromir.talk();
boromir.talk = talk.bind(tyler),
boromir.talk();
let blabber = boromir.talk;
blabber();
talk()

console.log(talk == blabber);