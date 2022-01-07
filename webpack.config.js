const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const API_URL = "http://localhost:8088";

const OUTPUT_DIR = path.resolve(__dirname, "dist");

const assets = [
  {
    from: path.resolve(__dirname, "public/3Dscene"),
    to: path.resolve(OUTPUT_DIR, "3Dscene"),
  },
];

module.exports = {
  mode: "development",
  devtool: "cheap-module-source-map",
  entry: {
    main: path.resolve(__dirname, "src/index.js"),
  },
  output: {
    path: OUTPUT_DIR,
  },
  module: {
    rules: [
      {
        test: /\.worker\.js$/,
        include: [/worker/, /vtk\.js[/\\]Sources/],
        use: [
          {
            loader: "worker-loader",
          },
        ],
      },
      { test: /\.glsl$/i, loader: "shader-loader" },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(ttf|eot|svg|woff|woff2)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: "file-loader",
        options: {
          name: "assets/fonts/[name].[ext]",
        },
      },
      {
        test: /\.(png|jpg|gif)$/,
        loader: "file-loader",
        options: {
          name: "assets/data/[contenthash].[ext]",
        },
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin({}),
    new webpack.DefinePlugin({
      __API_URL__: JSON.stringify(API_URL),
    }),
    new webpack.HotModuleReplacementPlugin(),
    new CopyWebpackPlugin({
      patterns: [...assets],
    }),
    new HtmlWebpackPlugin({
      title: "JSON Loader Sample",
      inject: "body",
      template: path.resolve(__dirname, "public/index.html"),
      meta: {
        "set-charset": {
          charset: "utf-8",
        },
        viewport: "width=device-width, initial-scale=1, shrink-to-fit=no",
        description: "Healthhub VtkJS",
        keywords: "Healthhub, vtkjs",
        author: "Healthhub.co.LTD",
        "X-UA-Compatible": {
          "http-equiv": "X-UA-Compatible",
          content: "IE=edge",
        },
        "set-content-type": {
          "http-equive": "Content-Type",
          content: "text/html",
          charset: "utf-8",
        },
      },
      chunks: ["main"],
      filename: path.join(OUTPUT_DIR, "index.html"),
    }),
  ],
  devServer: {
    historyApiFallback: true,
    port: 8088,
    liveReload: true,
  },
};
