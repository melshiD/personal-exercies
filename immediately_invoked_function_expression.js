//both of these (#1 and #2) work in the browser, despite the difference
//in nesting of the parenthesis

//#1
(function printMeTenTimes(){
    let i = 0;
    while(i<10){
        console.log(`printing ${i}`);
        i++;
    }
})()
//#2
(function printMeTenTimes(){
    let i = 0;
    while(i<10){
        console.log(`printing ${i}`);
        i++;
    }
}())




//oh!  It also works as anonymous (SEAF_ Self Executing Anonymous Function)
(function(){
    let i = 0;
    while(i<10){
        console.log(`printing ${i}`);
        i++;
    }
})()