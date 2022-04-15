function runCredits(){
    const proudMoralisDevAdvocate = 'David Melsheimer';
    console.log('--- Credits ---');
    const roles = {
        'production team': proudMoralisDevAdvocate,
        'programmer': proudMoralisDevAdvocate,
        'videographer': proudMoralisDevAdvocate,
        'etc.': proudMoralisDevAdvocate
    }
    for(const key in roles){
        console.log(`${key}: ${roles[key]}`);
    };
}

runCredits;