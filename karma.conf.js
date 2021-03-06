// Karma configuration file
var karma = require('karma');
var ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

module.exports = function(karma) {
  var config = {
    singleRun: true,
    autoWatch: false,
    autoWatchInterval: 0,

    // level of logging
    // possible values: LOG_DISABLE, LOG_ERROR, LOG_WARN, LOG_INFO, LOG_DEBUG
    logLevel: 'warn',
    // possible values: 'dots', 'progress'
    reporters: 'dots',
    colors: true,

    port: 8080,

    // base path, that will be used to resolve files and exclude
    basePath: '.',

    browsers: ['ChromeHeadlessNoSandbox'],
    customLaunchers: {
      ChromeHeadlessNoSandbox: { base: 'ChromeHeadless', flags: ['--no-sandbox'] },
    },

    frameworks: ['jasmine'],

    plugins: [
      require('karma-chrome-launcher'),
      require('karma-firefox-launcher'),
      require('karma-jasmine'),
      require('karma-sourcemap-loader'),
      require('karma-webpack'),
    ],

    webpack: {
      mode: 'development',

      resolve: {
        extensions: ['.js', '.ts'],
      },

      module: {
        rules: [
          {
            test: /\.ts$/,
            loader: 'ts-loader',
            options: {
              configFile: 'test/tsconfig.json',
              transpileOnly: true,
            },
          },
        ],
      },

      plugins: [new ForkTsCheckerWebpackPlugin()],
    },

    webpackMiddleware: {
      stats: { chunks: false },
    },

    files: ['test/index.js'],

    preprocessors: {
      'test/index.js': ['webpack', 'sourcemap'],
    },
  };

  karma.set(config);
};
