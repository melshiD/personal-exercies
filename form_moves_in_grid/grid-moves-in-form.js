

function updateFieldsetArea(fieldSetName, newGrid){
    let gridAreaValues = newGrid;
    let fieldsetToMove = document.getElementById(fieldSetName);

    fieldsetToMove.style.gridArea = newGrid;
}