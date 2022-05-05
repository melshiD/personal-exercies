const path = require('path');
module.exports = {
    module: {
        rules: [
          {
            test: /\.scss$/i,
            use: ["style-loader", //3. injects styles into DOM
                 "css-loader",    //2. Turns CSS into common JS
                 "sass-loader"],  //1. Turns sass into CSS
          },
        ],
      },    
    mode: "development",
    devtool: false,
    entry: "./src/index.js",
    output:{
        filename: "main.js",
        path: path.resolve(__dirname, "dist")
    }
}