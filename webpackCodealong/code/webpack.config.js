const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

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
    plugins: [new HtmlWebpackPlugin({template: "./src/template.html", inject: "body"})],   
    mode: "development",
    devtool: false,
    entry: "./src/index.js",
    output:{
        filename: "main.[contenthash].js",
        path: path.resolve(__dirname, "dist")
    }
}