var maxAreaOfIsland = function(grid) {
    //check that grid's size isn't out of bounds

    if(grid.length < 1 || grid.length > 50 || grid[0].length < 1 || grid[0].length > 50){
        console.log('exit per error: fitalFalMunction'); 
        return;
    }
    //check starting condition of each grid element
    for(let idR = 0; idR < grid.length; idR ++){
        for(let idC = 0; idC < grid[0].length; idC ++){
            if(grid[idR][idC] > 1 || grid[idR][idC] < 0){
                console.log('idR or idC limit exceeded');
                return;
            }
        }
    }
    var islandId = 1;//will iterate to the novel 2 before entering the grid
    for(let idR = 0; idR < grid.length; idR ++){
        for(let idC = 0; idC < grid[0].length; idC ++){
            islandId ++;
            countIfNewLand(grid, idR, idC, islandId);
        }
    }
    function surveySizes(grid){
        console.log(`grid @ surveySizes: ${grid}`);
        var freqArray = Array(grid.length*grid[0].length).fill(0), //iitilize empty array w/ 1 space per plot of land
        largestSize = 0;
        console.log(`freqArray @ surveySizes: ${freqArray}`);
        for(let idR = 0; idR < grid.length; idR ++){
            for(let idC = 0; idC < grid[0].length; idC ++){
                freqArray[grid[idR][idC]] ++;
                console.log(`largestSize @ surveySizes in for: ${largestSize}`);
                console.log(`freqArray @ surveySizes in for: ${freqArray}`);
            }
        }
        if(grid.length == 1 && grid[0].length == 1)
            {
                return (grid[0][0] == 2 ? 1 : 0);
            }
        freqArray[0] = 0;
        for(let i = 1; i < freqArray.length; i ++){
            console.log(`freqArray.length: ${freqArray.length}`);
            console.log(`largestSize @ surveySizes before effect: ${largestSize}`);
            largestSize = Math.max(largestSize, freqArray[i - 1]);
            console.log(`largestSize @ surveySizes after effect: ${largestSize}`);
        }
        console.log(`the largest island has this many plots: ${largestSize}`);
        return largestSize;
    }

    function countIfNewLand(grid, idR, idC, islandId){
        if(idR < 0 || idC < 0 || idR >= grid.length || idC >= grid[0].length){return;}
        if(grid[idR][idC] == 0 || grid[idR][idC] != 1){
            return;  
        }
        console.log(`ISLAND ID INSIDE RECURSIVE FUNC IS: ${islandId}`);
        grid[idR][idC] = islandId;
        console.log(`ititiating first iteration recursion with islandId: ${islandId}`);
        countIfNewLand(grid, idR+1, idC, islandId);
        console.log(`ititiating second iteration recursion with islandId: ${islandId}`);
        countIfNewLand(grid, idR-1, idC, islandId);
        console.log(`ititiating third iteration recursion with islandId: ${islandId}`);
        countIfNewLand(grid, idR, idC+1, islandId);
        console.log(`ititiating forth iteration recursion with islandId: ${islandId}`);
        countIfNewLand(grid, idR, idC-1, islandId);
    }
    console.log(grid);
    return surveySizes(grid);
}
var grid = [[0,0,1,0,0,0,0,1,0,0,0,0,0],[0,0,0,0,0,0,0,1,1,1,0,0,0],[0,1,1,0,1,0,0,0,0,0,0,0,0],[0,1,0,0,1,1,0,0,1,0,1,0,0],[0,1,0,0,1,1,0,0,1,1,1,0,0],[0,0,0,0,0,0,0,0,0,0,1,0,0],[0,0,0,0,0,0,0,1,1,1,0,0,0],[0,0,0,0,0,0,0,1,1,0,0,0,0]];
failingCase = [[0,1]];
//console.log(maxAreaOfIsland(failingCase));
//------------This code is SOOOOO long already.  It looks like my original shadow-grid to track
//already visited spaces will be the way to go
function maxAreaOfIsland2(grid){
    var shadowGrid = Array(grid.length).fill(Array(grid[0].length).fill(0)),//shadow the area of grid, filled with 0's
        islandSize = 0;
        console.log(grid);
        console.log(shadowGrid);

    function countLand(idR, idC){
        if(idR < 0 || idR >= grid.length || idC < 0 || idC >= grid[0].length || shadowGrid[idR][idC] == 1 || grid[idR][idC] == 0 ){
            return 0;
        }
        shadowGrid[idR][idC] = 1;
        return (1 + countLand(idR-1, idC) + countLand(idR+1, idC) + countLand(idR, idC-1) + countLand(idR, idC+1));
    }

    for(let idR = 0; idR < grid.length; idR++){
        for(let idC = 0; idC < grid[0].length; idC++){
            islandSize = Math.max(islandSize, countLand(idR, idC));
        }
    }
    return islandSize;
}


var grid2 = [[0,1]];
console.log(maxAreaOfIsland2(grid));