function buildScaledDigitDefs(baseSize, scale){
    let size = `${Math.floor(baseSize*scale)}px`;
    let symbolTree = document.getElementById('symbols');
    let svgns = 'http://www.w3.org/2000/svg';
    
}






<svg id="defs-div">
    <symbol id='symbols'>
        <g id="zero">
            <rect width="30" height="30" fill="white" stroke="black"></rect>
            <text x="7.5" y="25" style="font-size:30">0</text>
        </g>
            //WHEN YOU SIT BACK DOWN, BUILD A JS TO ADD THESE BUILDING BLOCK
        //DEFINITIONS TO DOM, BUT BEING SIZED DYNAMICALLY (MAYBE AS NEEDED)
        //TO AID MY EXAMPLE BUT WITHOUT USING SCALE TRANSFORMS
        <g id="one">
            <rect width="30" height="30" fill="white" stroke="black"></rect>
            <text x="7.5" y="25" style="font-size:30">1</text>
        </g>
    </symbol>
</svg>