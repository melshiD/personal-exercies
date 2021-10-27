
//--------------- solution working in many but not all cases.  hmm.  switching to a hash table solution
var checkInclusion = function(s1, s2) {
    console.log('testing if permutation of s1 exists in s2');
    if(s1 == null || s2 == null){return false;}
    
    var stringOneSet = new Set(s1),
        permPresent = true;

    console.log(stringOneSet);
    function checkPerm(s2Sub, sacrificialSet){
        console.log(`checkPerm: before for loop, and s2Sub.length = ${s2Sub.length}`);
        for(let i = 0; i < s2Sub.length - 1; i ++){ 
            console.log(`checkPerm: s2Sub.length : ${s2Sub.length}`);
            console.log(`checkPerm: for-loop i value currently ${i}`);
            if(sacrificialSet.has(s2Sub[i])){
                console.log('checkPerm: if statement: sacrificialSet DOES HAVE something!');
                sacrificialSet.delete(s2Sub[i]);
            }
        }
        return sacrificialSet.delete(s2Sub[s2Sub.length - 1]);//see return type in console on browser
    }
    for(let i = 0; i < s2.length; i ++){
        if(stringOneSet.has(s2[i]) && i + s1.length <= s2.length){ 
            sacrificialSet = new Set(stringOneSet);
            console.log(`Main for: the value of s2.slice(i, sacrificialSet.size + 1).length is ${s2.slice(i, i + sacrificialSet.size + 1).length}`);
            console.log(`Main for: the value of s2.slice(i, sacrificialSet.size + 1) is ${s2.slice(i, i + sacrificialSet.size - 1)}`);
            permPresent = checkPerm(s2.slice(i, i + sacrificialSet.size + 1), sacrificialSet);  //if there's still enough s2 left to send a s1 size substring of s2
            console.log(`Main for if: permPresent: ${permPresent}`);
            if(permPresent){return true;}
        }
    }
    console.log(`MAIN RETURN: permPresent: ${permPresent}`);
    return permPresent;
}
//console.log(checkInclusion("adc", "dcda"));



//regarding for statement in checkPerm? this way, there will be one remaining character in the set after leaving the for loop.
//if the remaining item in the set is a match, then the delete and therefore the function will return 1;  otherwise it's not a perm,
//exit function and try again in the main body

//------------------------------------------------------------------------------------------------------------------------
//LeetCode 567, does s2 contain a permutation of s1.  Hash sum method
String.prototype.hashCode = function(){

        var hash = 0;
        if (this.length == 0) return hash;
        for (i = 0; i < this.length; i++) {
            char = this.charCodeAt(i);
            hash = ((hash<<5)-hash)+char;
            hash = hash & hash; // Convert to 32bit integer
        }
        return hash;
    }
    
var checkInclusion = function(s1, s2) {
    console.log('testing if permutation of s1 exists in s2');
    if(s1 == null || s2 == null || s1.length > s2.length){return false;}

    var s1Sum = checkSum(s1);
    
    function checkSum(inputString){
        var hash = 0;
        if (inputString.length == 0) return hash;
        for (i = 0; i < inputString.length; i++) {
            char = inputString.charCodeAt(i);
            hash = ((hash<<5)-hash)+char;
            hash = hash & hash; // Convert to 32bit integer
        }
        return hash;
    }
        /*var integerR = 22;//arbitrary positive number
        var returnSum = 1;//so first *= wont yield 0
        for(let i = 0; i < inputString.length; i ++){ returnSum *= ((integerR + inputString.charCodeAt(i)*2)%);}
        return returnSum/2;
    }*/
    var runningS2 = [];
    for(let i = 0; i <= s2.length - s1.length; i ++){
        let s2Sub = s2.slice(i, i + s1.length);
        runningS2 += (s2Sub + ", ");
        console.log(runningS2);
        console.log(`s2Sub.length : ${s2Sub.length}`);
        console.log(`checkSum(s2Sub) and s1Sum: ${checkSum(s2Sub)},${s1Sum}`);
        if(checkSum(s2Sub) == s1Sum){ return true;}
    }
    return false;
}
/*From leetcode: 
    for (int i = 0; i < s1.length(); i++)
    array[s1.charAt(i)-'a']++;

    It's in Java.  This loop counts the number of occurrences of each letter in the array.
    In the end, array[0] will contain the number of 'a's, array[1] the number of 'b's and so on.

      
    For 
//console.log(checkInclusion("abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdef", "bcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefg"));
console.log(checkInclusion("dc", "acd"));
 Found this function with an interesting syntax
    function checkSum(inputString){
        var hash = 0;
        if (inputString.length == 0) return hash;
        for (i = 0; i < inputString.length; i++) {
            char = inputString.charCodeAt(i);
            hash = ((hash<<5)-hash)+char;
            hash = hash & hash; // Convert to 32bit integer
        }
        return hash;
    }
    
    //------ New attempt.  I'll build a new 'hash sum' type function (at least as much as I undestand that at the moment)
*/
var checkInclusion = function(s1, s2){
    if(s1.length>s2.length || s2.length > 10000){return false;}
    const charMap = new Map();
    const alphabet = 'abcdefghijklmnopqrstuvwxyz';
    //populate map key/value pairs to char:num
    for(let i = 0; i < alphabet.length; i ++){
        charMap.set(alphabet[i], i);
    }

    function genSum(input){
        var sumArray = Array(26).fill(0);
        for(i = 0; i < input.length; i ++){
            sumArray[charMap.get(input[i])] ++;
        }
        console.log(`genSum of array is as follows :${sumArray}`)
        return sumArray;
    }

    function compareSums(inputS1, latestSlice){
        for(let i = 0; i < inputS1.length; i ++){
            console.log(`i.${i}, j.${i}`);
            console.log(`inputS1[i] = ${inputS1[i]}, latestSlice[i] = ${latestSlice[i]}`);
            if(!(inputS1[i] == latestSlice[i])){return false;}
        }
        return true;
    }

    var s1Sum = genSum(s1);
    console.log(`value of s1Sum = ${s1Sum}`);
    var runningResultsOfS2Slice = [];
    
    for(let i = 0; i <= s2.length - s1.length; i ++){
        var s2Slice = s2.slice(i, i + s1.length);
        console.log(`s2Slice(i, i + s1.length) = ${s2.slice(i, i + s1.length)}`);
        console.log(`s2Slice = ${s2Slice}`);
        console.log(`calling genSum(s2Slice)`);
        var s2Sum = genSum(s2Slice);
        runningResultsOfS2Slice.push(s2Slice);
        console.log(`s2Sum = ${s2Sum}`);
        console.log(runningResultsOfS2Slice);
        if(compareSums(s1Sum, s2Sum)){
            return true;
        }
    }
    console.log('about to return false');
    console.log(runningResultsOfS2Slice);
    return false;
}
var inputString1 = "abcdxabcde";
var inputString2 = "abcdeabcdx";
console.log(checkInclusion(inputString1, inputString2));
/* By this point, I've just implemented a concept of populating a map with numbers indexed by letters to aid in iterating through
the input strings and finding the s1[i] value's corresponding place in the sumArray, and then increasing the freq count of that s1 occurance value.
I think I can remove a step in there somewhere with the mapping or populating it, but I'll revisit that another time. PLENTY to charge ahead toward!*/

"abcdxabcde"
"abcdeabcdx"