var image = [[1,1,1],[1,1,0],[1,0,1]],
    sr = 1,
    sc = 1,
    newColor = 2;

var floodFill = function(image, sr, sc, newColor) {
    if(sr < 0 || sc < 0 || sr >= image.length || sc >= image[0].length){return;}
    if(image[sr][sc] == newColor){return image;}
    fill(image, sr, sc, image[sr][sc], newColor);

    function fill(image, sr, sc, originalColor, newColor){
        //console.log(`value of sr: ${sr}, value of sc:${sc}`);
        console.log(`image.length :${image.length}, image[0].length : ${image[0].length}`);
        if(sr < 0 || sc < 0 || sr >= image.length || sc >= image[0].length){
            return;
        }
        if(image[sr][sc] != originalColor){
            console.log(`sr: ${sr}, sc: ${sc}`);
            return;
        }
        //console.log(image);
        image[sr][sc] = newColor;
        
        //console.log('executing FIRST');
        fill(image, sr+1, sc, originalColor, newColor);
        //console.log('executing second');
        fill(image, sr-1, sc, originalColor, newColor);
        //console.log('executing THIRD');
        fill(image, sr, sc+1, originalColor, newColor);
        //console.log('executing LAST');
        fill(image, sr, sc-1, originalColor, newColor);
    }
    console.log(image);
    return image;
}

floodFill(image, sr, sc, newColor);
/*a big problem I had on this was reveiving: 

c:\Users\davem\Coding\personal_exercises\cascading_delay_pure_css_and_js\leetcode_floodFill_733.js:17
        if(image[sr][sc] != originalColor){
                    ^

TypeError: Cannot read property '0' of undefined

I hadn't added the 'or equal to' condition to the "greater than" condition before the 
index[sr][sc] was receiving an sr (and sc) value over the max index (max index being 2 for a
3-element array);
*/