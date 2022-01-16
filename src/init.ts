// import '@/browserify/process/index'
// import '@/browserify/buffer/index'
// import '@/browserify/events/index'
// import 'path/';
// import 'url/';
// import 'util/';
// import 'stream/';
// import 'assert/';

import { createDefaultCompiler } from './vue-component-compiler';
import { SystemJSPrototype } from './SystemJSPrototype';

SystemJSPrototype.shouldFetch = function () {
    return true;
};

const jsonCssWasmContentType = /^(application\/json|application\/wasm|text\/css)(;|$)/;
const registerRegEx = /^\s*(\/\*[^*]*(\*(?!\/)[^*]*)*\*\/|\s*\/\/[^\n]*)*\s*System\s*\.\s*register\s*\(\s*(\[[^\]]*])\s*,\s*\(?function\s*\(\s*([^),\s]+\s*(,\s*([^),\s]+)\s*)?\s*)?\)/;
const rawTextRead = /!text$/;
const vueUrls = /^[^#?]+\.vue([?#].*)?$/;

const fetch: typeof window.fetch = SystemJSPrototype.fetch;

const defaultVueCompiler = createDefaultCompiler();

SystemJSPrototype.fetch = async function (url: string, options: RequestInit) {
    debugger;
    const res = await fetch(url, options);

    if (!res.ok || jsonCssWasmContentType.test(res.headers.get('content-type') || '')) {
        return res;
    }

    const source = await res.text();

    if (rawTextRead.test(url)) {
        return source;
    }

    if (registerRegEx.test(source)) {
        return new Response(new Blob([ source ], { type: 'application/javascript' }));
    }

    if (vueUrls.test(url)) {
        console.log(await defaultVueCompiler.compileToDescriptor(url, source));
        return source;
    }

    return {};
    /*return new Promise((resolve, reject) => {

        const nextSource = scriptSetupTransform(source, url);

        babel.transform(nextSource, {
            filename: url,
            sourceMaps: 'inline',
            ast: false,
            compact: false,
            sourceType: 'module',
            parserOpts: {
                plugins: stage3Syntax,
                errorRecovery: true,
            },
            presets: [ [ vueBabelPresetJsx ] ],
            plugins: scriptUrls.test(url) ? tsPlugins : plugins,
        }, function (err, result) {
            if (err) {
                return reject(err);
            }
            const code = result.code + '\n//# sourceURL=' + url + '!system';
            resolve(new Response(new Blob([ code ], { type: 'application/javascript' })));
        });
    });*/
};
