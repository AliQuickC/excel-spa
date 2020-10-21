const path = require('path')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

// NODE_ENV - переменная хранит режим сборки,
// для корректности ее работы используется npm пакет cross-env
const isProd = process.env.NODE_ENV === 'production'
const isDev = !isProd

const filename = ext => isDev ? `bundle.${ext}` : `bundle.[hash].${ext}`

console.log('IS PROD', isProd)
console.log('IS DEV', isDev)

const jsLoaders = () => { // запуск лоадеров
  const loaders = [
    {
      loader: 'babel-loader',
      options: {
        presets: ['@babel/preset-env'], // включает пресет
        plugins: ['@babel/plugin-proposal-class-properties']
      }
    }
  ]

  if (isDev) {
    loaders.push('eslint-loader') // добавляем в массив параметр
  }

  return loaders // возвращаем массив с настройками лоадера
}


module.exports = {
  context: path.resolve(__dirname, 'src'), // контекст работы webpack
  mode: 'development', // режим разработки
  entry: ['@babel/polyfill', './index.js'], // точка входа, для '@babel/polyfill' нужен npm пакет @babel/polyfill
  output: {
    filename: filename('js'), // js файл, куда будут собираться все скрипты
    path: path.resolve(__dirname, 'dist') // путь по которому будут складываться собранные скрипты
  },

  resolve: {
    extensions: ['.js'], // разрешение по умолчанию
    alias: { // алиасы для путей к папкам
      '@': path.resolve(__dirname, 'src'),
      '@core': path.resolve(__dirname, 'src/core')
    }
  },

  // Webpack API
  devtool: isDev ? 'source-map' : false, // добавляет ".map" файлы, в режиме разработки

  // DevServer
  devServer: {
    port: 3000,
    hot: isDev
  },

  // настройка дополнительныхплагинов
  plugins: [
    new CleanWebpackPlugin(), // чистит папку dist, перед новой сборкой
    new HTMLWebpackPlugin({
      template: 'index.html', // шаблон для генерации html файла
      minify: { // минификация html файлов, если режим сборки 'production'
        removeComments: isProd,
        collapseWhitespace: isProd
      }
    }),
    new CopyPlugin({ // копирует необходимые файлы в dist
      patterns: [
        {from: path.resolve(__dirname, 'src/favicon.ico'), to: path.resolve(__dirname, 'dist')}
      ]
    }),
    new MiniCssExtractPlugin({ // выносит css из js в отдельный файл
      filename: filename('css') // css файл куда будут собираться все стили
    })
  ],

  // лоадеры
  // отслеживают файлы с указанным расширение
  module: {
    rules: [ // описываем лоадеры которые будут использоваться в проекте
      {
        test: /\.s[ac]ss$/i, // для файлов sass, scss
        use: [ // запуск лоадеров
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: isDev,
              reloadAll: true
            }
          },
          'css-loader',
          'sass-loader'
        ],
      },
      {
        test: /\.js$/, // для файлов js
        exclude: /node_modules/,
        use: jsLoaders() // запуск лоадеров
      }
    ]
  }

}
