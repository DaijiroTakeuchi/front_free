const fs = require('fs');
const path = require('path');
const url = require('url');
const pug = require('pug');

const getPugTemplatePath = (baseDir, req) => {
    const requestPath = url.parse(req.url).pathname;
    const suffix = path.parse(requestPath).ext ? '' : 'index.html';
    return path.join(baseDir, 'templates', requestPath, suffix);
};

const pugMiddleWare = (req, res, next) => {

    const basedir = process.cwd();
    const requestPath = getPugTemplatePath(basedir, req);

    if (path.parse(requestPath).ext !== '.html') {
        return next();
    } else {
        const pugPath = requestPath.replace('.html', '.pug');

        try {
            console.log('[BS] trying parse file ' + pugPath + '...');

            fs.statSync(pugPath);
            const content = pug.renderFile(pugPath, {
                basedir,
                locals: {},
                compileDebug: true,
                doctype: 'html',
                meta: require('./data/meta'),

                revision: ''
            });

            console.log('[BS] response sent.');
            return res.end(content);
        } catch (e) {
            console.error(e);
            return next();
        }
    }

};

module.exports = {
    ui: false,
    files: './public',
    server: {
        baseDir: './public'
    },
    watchEvents: ['change', 'add'],
    port: 3214,
    middleware: [pugMiddleWare],
    ghostMode: false,
    notify: false
};
