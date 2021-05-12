const Metalsmith = require('metalsmith');
const markdown = require('metalsmith-markdown');
const layouts = require('metalsmith-layouts');
const autotoc = require('metalsmith-autotoc');

function log() {
    return function(files, metalsmith, done) {
        done();
    }
}

Metalsmith(__dirname)
    .source('src')
    .destination('dist')
    .clean(true)
    .metadata({
        title: 'TypeDB OSI'
    })
    .use(markdown())
    .use(autotoc({
        selector: 'h2,h3',
    }))
    .use(layouts({
        directory: 'layouts',
        pattern: '*.html',
    }))
    .use(log())
    .build(function(err) {
        if (err) throw err;
    });
