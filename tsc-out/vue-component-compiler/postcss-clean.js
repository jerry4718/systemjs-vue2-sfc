System.register(["postcss", "clean-css"], function (exports_1, context_1) {
    "use strict";
    var postcss_1, clean_css_1;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (postcss_1_1) {
                postcss_1 = postcss_1_1;
            },
            function (clean_css_1_1) {
                clean_css_1 = clean_css_1_1;
            }
        ],
        execute: function () {
            exports_1("default", postcss_1.default.plugin('clean', (options) => {
                const clean = new clean_css_1.default({ compatibility: 'ie9', ...options });
                return (css, res) => {
                    const output = clean.minify(css.toString());
                    res.root = postcss_1.default.parse(output.styles);
                };
            }));
        }
    };
});
//# sourceMappingURL=postcss-clean.js.map