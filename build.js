const Metalsmith = require('metalsmith');
const markdown = require('metalsmith-markdown');
const layouts = require('metalsmith-layouts');
const autotoc = require('metalsmith-autotoc');

function exclude() {
    return function(files, metalsmith, done) {
        for (let file in files) {
            if (/^\.gitignore|\.circleci/.test(file)) {
                delete files[file];
            }
        }
        done();
    }
}

function modifyDocsPath() {
    return function(files, metalsmith, done) {
        for (let file in files) {
            if (/^docs\//.test(file)) {
                if (/\.md$/.test(file)) {
                    files[file.replace('docs/', '')] = files[file];
                }
                delete files[file];
            }
        }
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
    .use(exclude())
    .use(modifyDocsPath())
    .use(markdown())
    .use(autotoc({
        selector: 'h2',
    }))
    .use(layouts({
        directory: 'layouts',
        pattern: '*.html',
        suppressNoFilesError: true,
    }))
    .build(function(err) {
        if (err) throw err;
    });
