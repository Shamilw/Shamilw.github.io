const path=require('path')


module.exports={
    mode:'production',
    context: path.resolve(__dirname, 'src'),
    entry:'./index.js',
    output:{
        filename:'main.js',
        path:path.resolve(__dirname,'./dist')
    },
    watch: true,
    devServer: {
        watchContentBase: true,
        hot:true,
        port:4200
      },
      module: {
        rules: [
          {
            test: /\.m?js$/,
            exclude: /node_modules/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: ['@babel/preset-env']
              }
            }
          }
        ]
      }
}