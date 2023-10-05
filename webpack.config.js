const path = require('path');
// const nodeExternals = require('webpack-node-externals');

module.exports = (env, argv) => {  
  return {
    name: 'lib',
    mode: "production",
    target: ['web', 'es5'],
    externals: [
      {'react': {
        commonjs: 'react',
        commonjs2: 'react',
        amd: 'React',
        root: 'React'
      }},
      {'@emotion/react': {
        commonjs: '@emotion/react',
        commonjs2: '@emotion/react',
        amd: '@emotion/react',
        root: '@emotion/react'
      }},
      {'react-dom': {
        commonjs: 'react-dom',
        commonjs2: 'react-dom',
        amd: 'ReactDOM',
        root: 'ReactDOM'
      }}    
      
    ],
    // externalsPresets: { node: true },
    devtool: false,
    entry: path.resolve(__dirname, './src/index.js'),

    output: {
      filename: 'index.js',
      path: path.resolve(__dirname, `lib`),
      clean: true,
      // library
      library: { name: 'zitlab-palmyra', type: 'umd', umdNamedDefine: true },
      globalObject: 'this',
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.js', '.jsx'],
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
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
          exclude: /node_modules/,
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