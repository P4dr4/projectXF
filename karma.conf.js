process.env.CHROME_BIN = require('puppeteer').executablePath();

module.exports = function (config) {
  config.set({
    frameworks: ['jasmine', '@angular-devkit/build-angular'],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-jasmine-html-reporter'),
      require('karma-coverage'),
      require('@angular-devkit/build-angular/plugins/karma')
    ],
    client: {
      clearContext: false,
    },
    coverageReporter: {
      dir: require('path').join(__dirname, './coverage/project-xf'),
      subdir: '.',
      reporters: [{ type: 'html' }, { type: 'text-summary' }]
    },
    reporters: ['progress', 'kjhtml'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: false,
    singleRun: true, // Executa uma vez e finaliza
    browsers: ['ChromeHeadless'],
    restartOnFileChange: false // Evita reinicializações
  });
};
