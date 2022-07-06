const path = require('path')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const CompressionWebpackPlugin = require('compression-webpack-plugin')

const productionGzipExtensions = ['js', 'css']

module.exports = {
  publicPath: '/',
  productionSourceMap: false,
  css: {
    loaderOptions: {
      sass: {
        sassOptions: {
          includePaths: ['./node_modules', './src/assets'],
        },
      },
    },
  },
  configureWebpack: {
    resolve: {
      alias: {
        '@themeConfig': path.resolve(__dirname, 'themeConfig.js'),
        '@core': path.resolve(__dirname, 'src/@core'),
        '@validations': path.resolve(__dirname, 'src/@core/utils/validations/validations.js'),
        '@axios': path.resolve(__dirname, 'src/libs/axios'),
      },
    },
    plugins: [
      new BundleAnalyzerPlugin({
        analyzerMode: 'disabled',
        openAnalyzer: false,
      }),
      new CompressionWebpackPlugin({
        test: new RegExp(`\\.(${productionGzipExtensions.join('|')})$`),
        threshold: 8192,
        minRatio: 0.8,
      }),
    ],
  },
  chainWebpack: config => {
    config.module
      .rule('vue')
      .use('vue-loader')
      .loader('vue-loader')
      .tap(options => {
        // eslint-disable-next-line no-param-reassign
        options.transformAssetUrls = {
          img: 'src',
          image: 'xlink:href',
          'b-avatar': 'src',
          'b-img': 'src',
          'b-img-lazy': ['src', 'blank-src'],
          'b-card': 'img-src',
          'b-card-img': 'src',
          'b-card-img-lazy': ['src', 'blank-src'],
          'b-carousel-slide': 'img-src',
          'b-embed': 'src',
        }
        return options
      })
  },
  transpileDependencies: ['vue-echarts', 'resize-detector'],
  devServer: {
    proxy: {
      '/api': {
        target: 'https://cosmos.api.ping.pub/',
        changeOrigin: true,
        pathRewrite: {
          '^/api': '',
        },
      },
    },
  },
//configureWebpack: {
//        performance: {
//            //hints: "warning", // enum
//            maxAssetSize: 1048576, // int (in bytes),
//            maxEntrypointSize: 1048576, // int (in bytes)
//        },
//        //optimization: {
//          //    splitChunks: {
//                //chunks: "all"
//            //      minSize: 81380,
//              //    maxSize: 122880,
//             // }
//           // }
//   // }
//    },
  chainWebpack: config => {
    config.performance
        .maxEntrypointSize(10240000)
        .maxAssetSize(10240000)
    config.optimization.minimize(true);
    config.optimization.splitChunks({
        chunks: 'all',
        minSize: 81390,
        maxSize: 122880,
        });
 },

}
