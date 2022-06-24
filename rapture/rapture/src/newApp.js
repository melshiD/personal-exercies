//diceBag import included in the child component for building faces.  Put in top level and pass down?


const players = ['bilbo', 'bingham', 'bryce', 'bradley'];

const buildInitialState = (players) =>{//players is array of player names maybe?  add player order to state at end?
    const initialState = {};
    // const availableDice = [...Array(diceBag.length).keys()].map( index => index.toString(10));
    const availableDice = [...Array(20).keys()].map( index => index.toString(10));
    players.map( (player, index) => {
        const thisPlayer = {};
        const playerPool = [];
        for(let i = 0; i < 6; i++){
            let die = {
                'dieIndex': `${availableDice.splice(Math.floor((Math.random()*availableDice.length)), 1)[0]}`,
                'face': `${Math.floor(Math.random()*6)}`,
                'edge': `${Math.floor(Math.random()*4)}`
                //will handle the detail of the red die at a later time
            }
            playerPool.push(die);
        }
        thisPlayer['name'] = player;
        thisPlayer['pool'] = playerPool;
        initialState[`player_${index}`] = thisPlayer;
    });
    return initialState;
};

const [selected, setSelected] = useState(() => buildInitialState(players)));


function onSelectDie(index) {
	if (selected && index) {
		//do the swap
		setSelected(null);
	} else {
		setSelected(index);
	}
}

return (
	<div>
		{state.players.map(player => (
			<Hand>
				{player.hand.map(({ index, face }) => {
					const die = dice[index];
					const isSelected = selected === index;

					return <DieDiv
						selected={isSelected}
						onSelect={onSelectDie.bind(this, isSelected ? null : index)}
						face={face}
						{...die}
					/>;
				})}
			</Hand>
		))}
	</div>
);

const state = {
    player_1:
    {
        name: 'bilbo',
        pool: [
            { dieIndex: '2', face: '3', edge: '1' },
            { dieIndex: '4', face: '3', edge: '1' },
            { dieIndex: '12', face: '4', edge: '1' },
            { dieIndex: '7', face: '6', edge: '1' },
            { dieIndex: '4', face: '3', edge: '1' },
            { dieIndex: '5', face: '1', edge: '1' }
        ],
        hand: [
            { dieIndex: '13', face: '1', edge: '3' }
        ]
    }
}

