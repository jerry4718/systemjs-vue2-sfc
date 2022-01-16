System.register(["events"], function (exports_1, context_1) {
    "use strict";
    var events_1;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (events_1_1) {
                events_1 = events_1_1;
            }
        ],
        execute: function () {
            // @ts-ignore
            window.EventEmitter = events_1.EventEmitter;
            exports_1("default", events_1.EventEmitter);
        }
    };
});
//# sourceMappingURL=index.js.map