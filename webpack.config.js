const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const OpenBrowserPlugin = require('open-browser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserJSPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const CnameWebpackPlugin = require('cname-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const PrerenderSPAPlugin = require('prerender-spa-plugin');
const babelrc = require('./.babelrc');
const settings = require('./settings');

const mode = process.env.NODE_ENV === 'production' ? 'production' : 'development';
const port = 8262;
const entry = path.join(__dirname, './src/index.jsx');
const output = path.join(__dirname, './dist');
const publicPath = mode === 'production' ? settings.repoPath || '/' : '/';

const productionScripts = `
  <!-- Global site tag (gtag.js) - Google Analytics -->
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-E0MPNFJ7J5"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());

    gtag('config', 'G-E0MPNFJ7J5');
  </script>`;

const developmentScripts = ``;

const thirdPartyScripts = mode === 'production'
  ? productionScripts
  : developmentScripts;

module.exports = {
  mode,

  optimization: {
    minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})],
  },

  devServer: {
    port,
    compress: true,
    contentBase: output,
    publicPath,
    stats: { colors: true },
    hot: true,
    historyApiFallback: true,
  },

  devtool: mode === 'production' ? false : 'eval',

  entry:
    mode === 'production'
      ? entry
      : [
        `webpack-dev-server/client?http://localhost:${port}`,
        'webpack/hot/only-dev-server',
        entry,
      ],

  output: {
    path: output,
    filename: '[hash].bundle.js',
    publicPath,
  },

  resolve: {
    modules: [path.join(__dirname, './node_modules')],
    extensions: ['.js', '.jsx'],
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        include: path.join(__dirname, './src'),
        use: {
          loader: 'babel-loader',
          options: babelrc,
        },
      },

      {
        test: /\.(js|jsx)$/,
        use: 'react-hot-loader/webpack',
        include: /node_modules/,
      },

      {
        test: /\.worker\.js$/,
        use: { loader: 'worker-loader' },
      },

      {
        test: /\.(less)$/,
        use: [
          mode === 'production'
            ? {
              loader: MiniCssExtractPlugin.loader,
              options: {
                publicPath,
              },
            }
            : 'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName:
                  mode === 'production'
                    ? '[hash:base64:10]'
                    : '[path][name]__[local]--[hash:base64:5]',
              },
            },
          },
          {
            loader: 'less-loader',
            options: {
              additionalData: "@import 'open-color/open-color.less';",
            },
          },
          ...(mode === 'production' ? ['postcss-loader'] : []),
        ],
      },

      {
        test: /\.(css)$/,
        use: [
          mode === 'production'
            ? {
              loader: MiniCssExtractPlugin.loader,
              options: {
                publicPath,
              },
            }
            : 'style-loader',
          'css-loader',
          'postcss-loader',
        ],
      },

      {
        test: /\.(svg|png|jpg|gif|woff|woff2|otf|ttf|eot)$/,
        loader: 'file-loader',
      },
    ],
  },

  plugins: [
    new webpack.DefinePlugin({ 'process.env.NODE_ENV': JSON.stringify(mode) }),
    new CopyPlugin({
      patterns: [
        { from: 'public', to: 'assets', flatten: true },
      ],
    }),
    new FaviconsWebpackPlugin({
      logo: path.join(__dirname, './favicon.png'),
      background: '#ffeeee',
      icons: {
        android: true,
        appleIcon: true,
        appleStartup: false,
        coast: false,
        favicons: true,
        firefox: false,
        opengraph: true,
        twitter: false,
        yandex: false,
        windows: false,
      },
    }),
    new HtmlWebpackPlugin({
      templateContent: ({ htmlWebpackPlugin }) => `
        <!DOCTYPE html>
        <html>
          <head>
            ${htmlWebpackPlugin.tags.headTags}
            <meta charset="utf-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale = 1.0, maximum-scale=1.0, user-scalable=no" />

            <title>${settings.title}</title>
            <meta name="description" content="${settings.description}" />
            <meta property="og:site_name" content="${settings.title}" />
            <meta property="og:title" content="${settings.title}" />
            <meta property="og:description" content="${settings.description}" />
            <meta property="og:url" content="https://rebase.radio" />
            <meta property="og:image" content="https://rebase.radio/assets/richpreview.jpg" />
            <meta name="twitter:image" content="https://rebase.radio/assets/richpreview.jpg" />
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:creator" content="@M7Bones" />
            <meta name="twitter:site" content="@M7Bones" />
            <meta name="twitter:title" content="${settings.title}" />
            <meta name="twitter:description" content="${settings.description}" />

            ${thirdPartyScripts}
          </head>
          <body>
            <noscript>
              Enable JavaScript to use
            </noscript>

            <div id="app"></div>
            ${htmlWebpackPlugin.tags.bodyTags}
          </body>
        </html>
      `,
    }),
    ...(mode !== 'production'
      ? [
        new webpack.HotModuleReplacementPlugin(),
        new OpenBrowserPlugin({ url: `http://localhost:${port}` }),
      ]
      : [
        new MiniCssExtractPlugin({
          filename: mode === 'production' ? '[name].[contenthash].css' : '[name].css',
        }),
        ...(settings.cname ? [new CnameWebpackPlugin({ domain: settings.cname })] : []),
        new PrerenderSPAPlugin({
          staticDir: output,
          routes: settings.prerenderRoutes,
        }),
      ]),
  ],
};
