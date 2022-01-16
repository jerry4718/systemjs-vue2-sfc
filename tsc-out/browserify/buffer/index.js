System.register(["buffer"], function (exports_1, context_1) {
    "use strict";
    var buffer_1;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (buffer_1_1) {
                buffer_1 = buffer_1_1;
            }
        ],
        execute: function () {
            window.Buffer = buffer_1.Buffer;
            exports_1("default", { Buffer: buffer_1.Buffer });
        }
    };
});
//# sourceMappingURL=index.js.map