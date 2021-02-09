const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const SpritesmithPlugin = require("webpack-spritesmith");

const page = "index";  //index rank

module.exports = {
  entry: {
    index: path.resolve(__dirname, `../src/${page=="index" ? "index.js" : "rank.js"}`),
  },
  module: {
    rules: [
      {
        test: /\.(sa|sc)ss$/,
        use: [
          {
            loader: "style-loader"
          },
          {
            loader: "css-loader",
            options: {
              // If you are having trouble with urls not resolving add this setting.
              // See https://github.com/webpack-contrib/css-loader#url
              //   url: false,
              minimize: true,
              sourceMap: true,
              publicPath: "../" //TODO:replace the url of images in css     relative url
            }
          },
          {
            loader: 'postcss-loader'
          },
          {
            loader: "sass-loader",
            options: {
              prependData: "variables.scss",
              sourceMap: true
            }
          }
        ]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 8192,
              esModule: false,
              //name: "img/[name]_[hash:7].[ext]" //url relative to output publicPath
              name: "img/[name].[ext]" //url relative to output publicPath
            }
          }
        ]
      },
      {
        test: /\.mp3$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 10,
              name: "audios/[name].[ext]" //url relative to output publicPath
            }
          }
        ]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ['es2015']
          }
        }
      },
      // {
      //   test: /\.(html)$/,
      //   use: {
      //       loader: 'html-loader',
      //       options: {
      //           attrs: ['img:src', 'img:data-src', 'audio:src'],
      //           minimize: true
      //       }
      //   }
      // }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
        'process.env.BUID_ENV': JSON.stringify(process.env.BUID_ENV)
    }),
    // This is especially useful for webpack bundles that include a hash in the filename
    // which changes every compilation
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, `../src/${page=="index" ? "index.html" : "rank.html"}`),
      inject: "body",
      filename: "./index.html"
    }),
    new SpritesmithPlugin({
      // 目标小图标
      src: {
        cwd: path.resolve(__dirname, "../src/assets/icons"),
        glob: "*.png"
      },
      // 输出雪碧图文件及样式文件
      target: {
        image: path.resolve(__dirname, "../src/assets/sprite.png"),
        css: [
          [
            path.resolve(__dirname, "../src/sass/sprite.scss"),
            {
              format: "function_based_template"
            }
          ]
        ]
      },
      customTemplates: {
        function_based_template: path.resolve(
          __dirname,
          "../my_handlebars_template.handlebars"
        )
      },
      // 样式文件中调用雪碧图地址写法
      apiOptions: {
        cssImageRef: "../assets/sprite.png?v=" + Date.parse(new Date())
      },
      spritesmithOptions: {
        algorithm: "binary-tree",
        padding: 8
      }
    }),
    new webpack.HotModuleReplacementPlugin()
  ]
};
