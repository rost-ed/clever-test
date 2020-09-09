const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const commonConfig = {
  mode: 'development',
}

const commonRules = [
  {
    test: /\.jsx?$/,
    loader: 'babel-loader'
  },
  {
    test: /\.(png|jpe?g|gif)$/i,
    use: [
      {
        loader: 'file-loader',
      },
    ],
  },
  {
    test: /\.svg$/,
    loader: 'svg-inline-loader'
  },
  {
    test: /\.worker\.js$/,
    use: { loader: 'worker-loader' },
  },
]

const serverConfig = {
  ...commonConfig,
  module: {
    rules: [
      ...commonRules,
      { test: /\.(scss|css)$/, loader: "ignore-loader" }
    ]
  },
  target: 'node',
  entry: './src/server/',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'server.js'
  },
}

const clientConfig = {
  ...commonConfig,
  module: {
    rules: [
      ...commonRules,
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader',
        ],
      },
    ]
  },
  entry: './src/client/',
  output: {
    path: path.resolve(__dirname, 'static'),
    filename: 'client.js'
  },
}

module.exports = [serverConfig, clientConfig]