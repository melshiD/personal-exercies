import dice_bag from "../assets/dice_bag";
import { Fragment } from "react";

const bagOfDice = dice_bag;

function buildFaceSymbolsFromBag(){
    let fill_1 = "white";
    let fill_2 = "red";
    const faceSymbolsBuiltFromBag = [];
    bagOfDice.forEach((die, dieIndex) => {
        die.forEach((face, faceIndex) => {
            let faceSymbol = (
                <symbol id={`die${dieIndex}_face${faceIndex}`}>
                    <rect width="200" height="200" rx="3" fill={`${face[0] === fill_1?fill_1:fill_2}`}></rect>
                    {face[2] !== "none" && 
                    <use href={`#dots-${face[2]}`} />
                    }
                    {face[3] !== "none" && 
                    <use href={`#${face[3]}`} stroke={`${face[1]}`} />
                    }
                    {face[4] !== "" && 
                    <use href={`#value-${face[4]}`} />
                    }
                </symbol>
            );
            faceSymbolsBuiltFromBag.push(faceSymbol);
        });
    });
    console.log(faceSymbolsBuiltFromBag);
    return faceSymbolsBuiltFromBag;
}

const faceSymbols = buildFaceSymbolsFromBag();

const IndividualFaceSymbol = (props) => {
    return (
        {faceSymbols} 
    )
}

export default IndividualFaceSymbol;