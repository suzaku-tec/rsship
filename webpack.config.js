module.exports = {
  entry: {
    'main': './src/main.ts',
    'renderer': './src/renderer.ts',
    'preload': './src/preload.ts'
  },
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        // ts-loaderでトランスパイルする
        test: /\.ts$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "ts-loader",
            options: {
              transpileOnly: true,
            },
          },
        ]
      },
    ],
  },
  resolve: {
    modules: [`${__dirname}/src`, 'node_modules'],
    extensions: [".ts", ".js"],
    fallback: {
      "path": require.resolve("path-browserify"),
      "util": require.resolve("util/"),
      "crypto": require.resolve("crypto-browserify"),
      "buffer": require.resolve("buffer/"),
      "stream": require.resolve("stream-browserify"),
      "assert": require.resolve("assert/"),
      "os": require.resolve("os-browserify/browser")
    }
  },
  output: {
    libraryTarget: "umd",
    filename: "[name].js",
    path: `${__dirname}/dist`,
  },
  target: "electron-renderer",
};
