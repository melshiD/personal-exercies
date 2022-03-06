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
            //WHEN YOU SIT BACK DOWN, REDESIGN FOR 0/1 BY CLASS (ALA GIT ANIMATION)
            //AND ANOTHER WITH THE SEPARATE 0S AND 1S, BUT JUST SWITCHING THE USE HREF
            //DESIGNING THIS WAY WILL ALLOW SHIFTS AND ROTATIONS WITHOUT
            //USING INDIVIDUAL VIEWBOXES FOR EACH WORD.  alTHOGHT ID STILL LIKE
            //FIGIRE THAT OUT
        <g id="one">
            <rect width="30" height="30" fill="white" stroke="black"></rect>
            <text x="7.5" y="25" style="font-size:30">1</text>
        </g>
    </symbol>
</svg>