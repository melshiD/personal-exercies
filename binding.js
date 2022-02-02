// let talk = function(){
//     console.log(this.sound);
// }

// let boromir = {
//     sound: 'One does not simply walk into mordor'
// }

// let tyler = {
//     sound: 'I really love the smell in the morning'
// }

// boromir.talk = talk.bind(boromir),
// boromir.talk();
// boromir.talk = talk.bind(tyler),
// boromir.talk();
// let blabber = boromir.talk;
// blabber();
// talk()

// console.log(talk == blabber);

// ----------------------------------

let isAwesome = function(){
    console.log(`${this} is totally awesome `);
}

let fontle = "fontle";

let bound = isAwesome.bind(fontle);

bound();

let nameArray = [
    'stacy', 'paul', 'raul', 'fontleroy', 'mico', 'mango'
];

// let bindClient = '';

// for(let name of nameArray){
//     bindClient = isAwesome.bind(name);
//     bindClient();
// }

for(let name of nameArray){
    isAwesome.bind(name)();
}