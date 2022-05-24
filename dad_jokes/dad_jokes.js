let jokeCollection = []; //collects all jokes invoked by getDadJoke()

const getDadJoke = async () => {
    const config = {headers: {accept: 'application/json'}}; 
    //dad joke api requires specific header for JSON
    const res = await axios.get('https://icanhazdadjoke.com/', config);
    console.log(res.data.joke);
    jokeCollection.push(res.data.joke);
    addToDom(res.data.joke);
}

const manyJokes = async (numJokes) => {
    for(let i = 0; i < numJokes; i++){
        getDadJoke();
    }
}

function addToDom(jokeToAdd){
    let listParent = document.querySelector('.jokes');
    let newJoke = document.createElement('li');
    newJoke.append(jokeToAdd);
    newJoke.classList.add('joke');
    listParent.appendChild(newJoke);
}

const jokeButton = document.getElementById('click_for_jokes');
jokeButton.addEventListener('click', () =>{
    manyJokes(5);
})