const autoprefixer = require('autoprefixer');
module.exports = [{
  entry: ['./src/assets/scss/app.scss', './src/assets/js/app.js'],
  output: {
    // This is necessary for webpack to compile
    // But we never use style-bundle.js
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'bundle.css',
            },
          },
          { loader: 'extract-loader' },
          {
              loader: 'css-loader'
          }, {
              loader: 'postcss-loader',
              options: {
                  plugins: () => [autoprefixer()]
              }
          },
          {
              loader: 'sass-loader',
              options: {
                  sassOptions: {
                      includePaths: ['./node_modules']
                  }
              }
          },
        ],
      },
      {
          test: /\.js$/,
          loader: 'babel-loader',
          query: {
              presets: ['@babel/preset-env'],
          },
      },
    {
        test: /\.(png|jp(e*)g|svg)$/,
        use: [{
            loader: 'url-loader',
            options: {
                limit: 1024, // Convert images < 8kb to base64 strings
                name: 'images/[hash]-[name].[ext]'
            }
        }]
    }
    ]
  },
}];
