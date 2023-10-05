const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = (env, argv) => {
  const { mode } = argv;

  return {
    name: 'lib',
    mode: "development",
    target: 'node',
    externals: [nodeExternals()],
    externalsPresets: { node: true },
    devtool: false,
    entry: path.resolve(__dirname, './src/index.js'),

    output: {
      filename: 'index.js',
      path: path.resolve(__dirname, `lib`),
      clean: true,
      library: { name: 'zitlab-palmyra', type: 'umd', umdNamedDefine: true },
      globalObject: 'this',
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.js', '.jsx'],
      alias: {
        react: path.resolve(__dirname, 'node_modules', 'react')
      }
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: [
            {and: [path.resolve(__dirname, "node_modules")]}
          ],
          use: ['babel-loader'],
        },
        {
          test: /\.css$/i,
          include: path.resolve(__dirname, 'src'),
          use: ["style-loader", "css-loader"],
        },
        {
          test: /\.(png|svg|jpg|jpeg|gif|ico)$/,
          exclude: /node_modules/,
          use: ['file-loader?name=[name].[ext]'] // ?name=[name].[ext] is only necessary to preserve the original file name
        },
        {
          test: /\.scss$/,
          exclude: /node_modules/,
          use: [
            'style-loader', {
              loader: 'css-loader', options: {
                modules: {
                  localIdentName: '[path][name]__[local]--[hash:base64:5]',
                },
              }
            },
            'sass-loader'
          ]
        },
        {
          test: /\.(ts|tsx)$/,
          exclude: [
            {and: [path.resolve(__dirname, "node_modules")]}
          ],
          use: [
            {
              loader: 'ts-loader',
              options: {
                compilerOptions: {},
              },
            },
          ],
        },
        {
          test: /\.(jpg|jpeg|png|gif|mp3|svg)$/,
          use: ['file-loader'],
        },
      ],
    },
  };
};