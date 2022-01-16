System.register(["./compiler", "vue-template-compiler", "./assembler"], function (exports_1, context_1) {
    "use strict";
    var compiler_1, vue_template_compiler_1, createCompiler, createDefaultCompiler;
    var __moduleName = context_1 && context_1.id;
    var exportedNames_1 = {
        "createCompiler": true,
        "createDefaultCompiler": true
    };
    function exportStar_1(m) {
        var exports = {};
        for (var n in m) {
            if (n !== "default" && !exportedNames_1.hasOwnProperty(n)) exports[n] = m[n];
        }
        exports_1(exports);
    }
    return {
        setters: [
            function (compiler_1_1) {
                compiler_1 = compiler_1_1;
                exportStar_1(compiler_1_1);
            },
            function (vue_template_compiler_1_1) {
                vue_template_compiler_1 = vue_template_compiler_1_1;
            },
            function (assembler_1_1) {
                exportStar_1(assembler_1_1);
            }
        ],
        execute: function () {
            exports_1("createCompiler", createCompiler = ({ script, style, template }) => new compiler_1.SFCCompiler(script, style, template));
            exports_1("createDefaultCompiler", createDefaultCompiler = (options = {}) => createCompiler({
                script: { ...options.script },
                style: { trim: true, ...options.style },
                template: {
                    // @ts-ignore
                    compiler: vue_template_compiler_1.default,
                    compilerOptions: {},
                    isProduction: process.env.NODE_ENV === 'production',
                    optimizeSSR: process.env.VUE_ENV === 'server',
                    ...options.template
                }
            }));
        }
    };
});
//# sourceMappingURL=index.js.map