const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",
  entry: "./src/index.js",
  output: {
    path: path.join(__dirname, "build"),
    publicPath: "/",
    filename: "app.bundle.js"
  },
  devServer: {
    contentBase: "./build"
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        loader: "babel-loader",
        options: {
          presets: ["@babel/preset-env", "@babel/preset-react"]
        },
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: ["*", ".js", ".jsx"]
  },
  externals: {
    react: "React",
    "react-dom": "ReactDOM"
  },
  devtool: "sourcemap",
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/15/index.html",
      filename: "react_15.html",
      inject: "body"
    }),
    new HtmlWebpackPlugin({
      template: "./src/16/index.html",
      filename: "react_16.html",
      inject: "body"
    })
  ]
};
