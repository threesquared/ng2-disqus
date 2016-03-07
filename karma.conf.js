module.exports = function(config) {
    config.set({

        basePath: '.',

        frameworks: ['jasmine', 'es6-shim'],

        files: [
            { pattern: 'node_modules/angular2/bundles/angular2-polyfills.js', included: true, watched: true },
            { pattern: 'node_modules/systemjs/dist/system.src.js', included: true, watched: true },
            { pattern: 'node_modules/rxjs/bundles/Rx.js', included: true, watched: true },
            { pattern: 'node_modules/angular2/bundles/angular2.dev.js', included: true, watched: true },
            { pattern: 'node_modules/angular2/bundles/testing.dev.js', included: true, watched: true },
            { pattern: 'node_modules/angular2/bundles/router.dev.js', included: true, watched: true },
            { pattern: 'karma-test-shim.js', included: true, watched: true },
            { pattern: 'src/*.js', included: false, watched: true },
            { pattern: 'src/*.ts', included: false, watched: false },
            { pattern: 'src/*.js.map', included: false, watched: false },
        ],

        proxies: {
            '/src/': '/base/src/',
        },

        port: 9876,

        logLevel: config.LOG_INFO,

        colors: true,

        autoWatch: true,

        browsers: ['Firefox'],

        plugins: [
            'karma-jasmine',
            'karma-coverage',
            'karma-firefox-launcher',
            'karma-es6-shim'
        ],

        reporters: ['progress', 'dots', 'coverage'],

        preprocessors: {
            'src/!(*spec).js': ['coverage']
        },

        coverageReporter: {
            reporters:[
                {
                    type: 'json',
                    subdir: '.',
                    file: 'coverage-final.json'
                }
            ],
        },

        singleRun: true,
    });
};
