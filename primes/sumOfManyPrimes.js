function isPrime(n){
    if(n < 2) return 0;
    for(let i = 2; i < n; i++){
        if(n % i === 0){
            return 0;
        }
    }
    return n;
}

function sumOfManyPrimes(howManyOrderedPrimes){
    let arrayOfPrimes = [];
    let i = 2;
    while(arrayOfPrimes.length < howManyOrderedPrimes){
        if(isPrime(i)) arrayOfPrimes.push(i);
        i++;
    }
    // console.log(arrayOfPrimes);
    let arraySum = arrayOfPrimes.reduce( (sum, prime) => {
        return sum += prime;
    }, 0);
    return arraySum;
}
console.log(sumOfManyPrimes(445));