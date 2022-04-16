function rollCredits(){
    let proudMoralisDevAdvocate = 'David Melsheimer';
    //yes, let it be so
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