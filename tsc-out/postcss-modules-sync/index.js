System.register(["./Parser", "./scopeGenerator", "postcss-modules-local-by-default", "postcss-modules-scope", "postcss", "generic-names"], function (exports_1, context_1) {
    "use strict";
    var Parser_1, scopeGenerator_1, postcss_modules_local_by_default_1, postcss_modules_scope_1, postcss_1, generic_names_1;
    var __moduleName = context_1 && context_1.id;
    // @ts-ignore
    function getScopedNameGenerator(opts) {
        const scopedNameGenerator = opts.generateScopedName || scopeGenerator_1.default;
        if (typeof scopedNameGenerator === 'function')
            return scopedNameGenerator;
        return generic_names_1.default(scopedNameGenerator, { context: process.cwd() });
    }
    return {
        setters: [
            function (Parser_1_1) {
                Parser_1 = Parser_1_1;
            },
            function (scopeGenerator_1_1) {
                scopeGenerator_1 = scopeGenerator_1_1;
            },
            function (postcss_modules_local_by_default_1_1) {
                postcss_modules_local_by_default_1 = postcss_modules_local_by_default_1_1;
            },
            function (postcss_modules_scope_1_1) {
                postcss_modules_scope_1 = postcss_modules_scope_1_1;
            },
            function (postcss_1_1) {
                postcss_1 = postcss_1_1;
            },
            function (generic_names_1_1) {
                generic_names_1 = generic_names_1_1;
            }
        ],
        execute: function () {
            exports_1("default", postcss_1.default.plugin('postcss-css-modules', (opts = {}) => {
                const plugins = [postcss_modules_local_by_default_1.default, postcss_modules_scope_1.default];
                const parser = new Parser_1.default();
                // @ts-ignore
                postcss_modules_scope_1.default.generateScopedName = getScopedNameGenerator(opts);
                // @ts-ignore
                return (css, result) => {
                    // @ts-ignore
                    const styles = postcss_1.default(plugins.concat(parser.plugin)).process(css).css;
                    // @ts-ignore
                    if (opts.getJSON != undefined) {
                        // @ts-ignore
                        opts.getJSON(parser.exportTokens);
                    }
                };
            }));
        }
    };
});
//# sourceMappingURL=index.js.map