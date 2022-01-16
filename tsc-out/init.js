System.register(['@/browserify/process/index', '@/browserify/buffer/index', '@/browserify/events/index', 'path/', 'url/', 'util/', 'stream/', 'assert/', './vue-component-compiler', './SystemJSPrototype'], function (exports_1, context_1) {
  'use strict';
  var vue_component_compiler_1, SystemJSPrototype_1, jsonCssWasmContentType, registerRegEx, rawTextRead, vueUrls, fetch, defaultVueCompiler;
  var __moduleName = context_1 && context_1.id;
  return {
    setters: [
      function (_1) {
      },
      function (_2) {
      },
      function (_3) {
      },
      function (_4) {
      },
      function (_5) {
      },
      function (_6) {
      },
      function (_7) {
      },
      function (_8) {
      },
      function (vue_component_compiler_1_1) {
        vue_component_compiler_1 = vue_component_compiler_1_1;
      },
      function (SystemJSPrototype_1_1) {
        SystemJSPrototype_1 = SystemJSPrototype_1_1;
      },
    ],
    execute: function () {
      SystemJSPrototype_1.SystemJSPrototype.shouldFetch = function () {
        return true;
      };
      jsonCssWasmContentType = /^(application\/json|application\/wasm|text\/css)(;|$)/;
      registerRegEx = /^\s*(\/\*[^*]*(\*(?!\/)[^*]*)*\*\/|\s*\/\/[^\n]*)*\s*System\s*\.\s*register\s*\(\s*(\[[^\]]*])\s*,\s*\(?function\s*\(\s*([^),\s]+\s*(,\s*([^),\s]+)\s*)?\s*)?\)/;
      rawTextRead = /!text$/;
      vueUrls = /^[^#?]+\.vue([?#].*)?$/;
      fetch = SystemJSPrototype_1.SystemJSPrototype.fetch;
      defaultVueCompiler = vue_component_compiler_1.createDefaultCompiler();
      SystemJSPrototype_1.SystemJSPrototype.fetch = async function (url, options) {
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
          return new Response(new Blob([source], { type: 'application/javascript' }));
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
    },
  };
});
//# sourceMappingURL=init.js.map
