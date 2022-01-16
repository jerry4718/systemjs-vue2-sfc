System.register(["string-hash"], function (exports_1, context_1) {
    "use strict";
    var string_hash_1, scopeGenerator;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (string_hash_1_1) {
                string_hash_1 = string_hash_1_1;
            }
        ],
        execute: function () {
            // @ts-ignore
            scopeGenerator = (name, filename, css) => {
                const i = css.indexOf(`.${name}`);
                const lineNumber = css.substr(0, i).split(/[\r\n]/).length;
                const hash = string_hash_1.default(css).toString(36).substr(0, 5);
                return `${name}_${hash}_${lineNumber}`;
            };
            exports_1("default", scopeGenerator);
        }
    };
});
//# sourceMappingURL=scopeGenerator.js.map