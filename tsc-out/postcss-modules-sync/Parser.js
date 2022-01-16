System.register(["icss-replace-symbols"], function (exports_1, context_1) {
    "use strict";
    var icss_replace_symbols_1, Parser;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (icss_replace_symbols_1_1) {
                icss_replace_symbols_1 = icss_replace_symbols_1_1;
            }
        ],
        execute: function () {
            Parser = class Parser {
                exportTokens;
                translations;
                constructor() {
                    this.exportTokens = {};
                    this.translations = {};
                }
                // @ts-ignore
                extractExports = css => {
                    // @ts-ignore
                    css.each(node => {
                        if (node.type === "rule" && node.selector === ":export")
                            this.handleExport(node);
                    });
                };
                // @ts-ignore
                handleExport = exportNode => {
                    // @ts-ignore
                    exportNode.each(decl => {
                        if (decl.type === 'decl') {
                            Object.keys(this.translations).forEach(translation => {
                                // @ts-ignore
                                decl.value = decl.value.replace(translation, this.translations[translation]);
                            });
                            // @ts-ignore
                            this.exportTokens[decl.prop] = decl.value;
                        }
                    });
                    exportNode.remove();
                };
                // @ts-ignore
                plugin = (css, result) => {
                    icss_replace_symbols_1.default(css, this.translations);
                    this.extractExports(css);
                };
            };
            exports_1("default", Parser);
        }
    };
});
//# sourceMappingURL=Parser.js.map