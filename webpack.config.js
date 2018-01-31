var path = require(`path`)

module.exports = {
  entry: `./src/index.js`,
  output: {
    path: path.resolve(__dirname, `public`),
    filename: `index.js`,
    libraryTarget: `commonjs2`,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: path.resolve(__dirname, `src`),
        exclude: /(node_modules|bower_components|public)/,
        use: {
          loader: `babel-loader`,
        },
      },
      {
        test: /\.css$/,
        use: [`style-loader`, `css-loader`, `postcss-loader`],
      },
      {
        test: /\.svg$/,
        use: {
          loader: `url-loader`,
        },
      },
    ],
  },
  externals: {
    'react': `commonjs react`,
  },
}
