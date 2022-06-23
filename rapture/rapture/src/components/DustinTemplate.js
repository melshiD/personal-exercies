const dice = [
	[ { bodyColor ... }, { bodyColor ... } ],
	[ { bodyColor ... }, { bodyColor ... } ],
	[ { bodyColor ... }, { bodyColor ... } ],
	[ { bodyColor ... }, { bodyColor ... } ],
	[ { bodyColor ... }, { bodyColor ... } ],
	[ { bodyColor ... }, { bodyColor ... } ],
	[ { bodyColor ... }, { bodyColor ... } ],
	[ { bodyColor ... }, { bodyColor ... } ],
];

const [selected, setSelected] = useState(null);
const state = {
    //why are no player numbers specified here at this example?
	players: [
		{
            pool: []
			hand: [{ index: 2, face: 3 }, 0, 9, 1]
		},
		{
			hand: [2, 0, ]
		},
		{
			hand: [2, 0, 9, 1]
		}
	]
}

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
    player_1: [
        {
            pool: [
                //when a die leaves a pool for a hand, the entry in the pool section of the state must be removed
                    {dieIndex: '2', face: '3', edge:'1'},
                    {dieIndex: '4', face: '3', edge:'1'},
                    {dieIndex: '12', face: '4', edge:'1'},
                    {dieIndex: '7', face: '6', edge:'1'},
                    {dieIndex: '4', face: '3', edge:'1'},
                    {dieIndex: '5', face: '1', edge:'1'}
                ],
            hand: [
                //here we represent a hand containing only one die at the moment
                    {dieIndex: '13', face: '1', edge:'3'}
                ]
        }],
    player_2: [
        {
            pool: [
                //when a die leaves a pool for a hand, the entry in the pool section of the state must be removed
                    {dieIndex: '2', face: '3', edge:'1'},
                    {dieIndex: '4', face: '3', edge:'1'},
                    {dieIndex: '12', face: '4', edge:'1'},
                    {dieIndex: '7', face: '6', edge:'1'},
                    {dieIndex: '4', face: '3', edge:'1'},
                    {dieIndex: '5', face: '1', edge:'1'}
                ],
            hand: [
                //here we represent a hand containing only one die at the moment
                    {dieIndex: '13', face: '1', edge:'3'}
            ]
        }
    ]
}