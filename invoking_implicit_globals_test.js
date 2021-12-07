//This is a script to be run in the browser console.  We're digging into
//scope chains, and making some tests to see how/when items make it
//(implicitly) into the window object as a property

function firstFunction(){
    let func1num1 = 11;
    let func1num2 = 12;
    func1implicit1 = `ONE: coming at you from a nested scope!`;
}

function secondFunction(){
    let func2num1 = 21;
    let func2num2 = 22;
    func2implicit1 = `TWO: coming at you from a nested scope!`;
}

function thirdFunction(){
    let func3num1 = 31;
    let func3num2 = 32;
    func3implicit1 = `THREE: coming at you from a nested scope!`;
}

const windowLength = function(){return Object.keys(window).length;}

console.log(`before running any of these functions, windowLength: ${windowLength()}`);

console.log('running firstFunction()');
firstFunction();
console.log(`after running firstFunction, windowLength: ${windowLength()}`);

console.log('running secondFunction()');
secondFunction();
console.log(`after running secondFunction, windowLength: ${windowLength()}`);

console.log('running thirdFunction()');
thirdFunction();
console.log(`after running thirdFunction, windowLength: ${windowLength()}`);

console.log('running thirdFunction() AGAIN');
thirdFunction();
console.log(`after running thirdFunction AGAIN, windowLength: ${windowLength()}`);

//ok, we see that running the functions multiple times doesn't continually add
//versions of the implicit variables to the global object.  BUT, what about if
//I have a factory function that has an implicit variable declaration in it??

const implicitFactory = function(){
    implicitGarbage1 = 'Refuse';
    implicitGarbage2 = 'Rubble';
    implicitGarbage3 = 'Twigs and leaves';
}

console.log('running implicitFactory');
implicitFactory();
console.log(`after running implicitFactory, windowLength: ${windowLength()}`);

console.log('running implicitFactory AGAIN');
implicitFactory();
console.log(`after running implicitFactory AGAIN, windowLength: ${windowLength()}`);

let copyOfImplicitFactory = implicitFactory;

console.log('running copyOfImplicitFactory');
copyOfImplicitFactory();
console.log(`after running copyOfImplicitFactory, windowLength: ${windowLength()}`);

console.log('running copyOfImplicitFactory AGAIN');
copyOfImplicitFactory();
console.log(`after running copyOfImplicitFactory AGAIN, windowLength: ${windowLength()}`);

//Now implicitGarbage1 is available in the global scope, as are all
//the other variables we implicitly created into the global space by not
//propery declaring the variables within the functions.  Scope creep?  A feature?
//Definitely good to know!
console.log(implicitGarbage1);
//note below, the properly-declared (as in with 'let' or 'const') variables
//from within our function's scopes are NOT available from within the 
//global execution context;
console.log(func3num1);
// VM3356:79 Uncaught ReferenceError: func3num1 is not defined
//     at <anonymous>:79:13
// (anonymous) @ VM3356:79

//ok, what if I have an imporperly declared variable nested within
//further nested functions.  I think I know what's gonna happen

function topNested(){
    function midNested(){
        function bottomNested(){
            let deepVar =  `it's so dark in here!`;
            dynamicFantom = 'how did you find me out here';
        }
        bottomNested();
    }
    midNested();
}
topNested();
console.log(`the value of the deeply nested 'dynamicFantom' is: ${dynamicFantom}`);

//all non-declared variables seem to float straight up to the global surface
//In short, unless specified by proper declaration (let, const, var) the
//variable is assumed to be for the global scope, and is placed there.  Not typically
//to be used as a feature.