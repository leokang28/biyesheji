const path=require('path');
const htmlWebpackPlugin=require('html-webpack-plugin');
const webpack=require('webpack');
module.exports={
  entry:'./index.js',
  output:{
    path:path.resolve(__dirname,'dist'),
    filename:'js/bundle.js',
    publicPath:'/'
  },
  devServer:{
    contentBase:'./dist'
  },
  module:{
    rules:[
      {
        test:/\.js$/,
        loader:'babel-loader',
        exclude:/node_modules/
      },
      {
        test:/\.css$/,
        use:
        ['style-loader','css-loader'],
      },
      {
        test:/\.vue$/,
        loader:'vue-loader'
      },
      {
        test: /\.(eot|woff|woff2|svg|ttf|png)([\?]?.*)$/,
        loader: "file-loader"
      }
    ]
  },
  resolve:{
    alias:{
      'vue':'vue/dist/vue.js'
    }
  },
  plugins:[
    new htmlWebpackPlugin({
      filename:'index.html',
      template:'index.html',
      favicon:path.resolve(__dirname,'src/img/favicon.icon')
    }),
    new webpack.ProvidePlugin({
      $:'jquery',
      jQuery:'jquery',
      'window.jQuery':'jquery',
      'window.$':'jquery'
    }),
    new webpack.LoaderOptionsPlugin({
      options:{
        proxyTable:{
          '/api/read':{
            target:'localhost:3000/api/read',
            changeOrigin:true
          }
        },
      }
    })
  ]
}