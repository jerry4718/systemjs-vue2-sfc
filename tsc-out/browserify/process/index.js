System.register(["process"], function (exports_1, context_1) {
    "use strict";
    var process_1;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (process_1_1) {
                process_1 = process_1_1;
            }
        ],
        execute: function () {
            window.process = process_1.default;
            exports_1("default", process_1.default);
        }
    };
});
//# sourceMappingURL=index.js.map