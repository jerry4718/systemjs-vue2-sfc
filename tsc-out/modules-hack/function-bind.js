// @ts-nocheck
System.register([], function (exports_1, context_1) {
    "use strict";
    var ERROR_MESSAGE, slice, toStr, funcType;
    var __moduleName = context_1 && context_1.id;
    function bind(that) {
        const target = this;
        if (typeof target !== 'function' || toStr.call(target) !== funcType) {
            throw new TypeError(ERROR_MESSAGE + target);
        }
        const args = slice.call(arguments, 1);
        let bound;
        const binder = function () {
            if (this instanceof bound) {
                const result = target.apply(this, args.concat(slice.call(arguments)));
                if (Object(result) === result) {
                    return result;
                }
                return this;
            }
            else {
                return target.apply(that, args.concat(slice.call(arguments)));
            }
        };
        const boundLength = Math.max(0, target.length - args.length);
        const boundArgs = [];
        for (let i = 0; i < boundLength; i++) {
            boundArgs.push('$' + i);
        }
        bound = Function('binder', 'return function (' + boundArgs.join(',') + '){ return binder.apply(this,arguments); }')(binder);
        if (target.prototype) {
            const Empty = function Empty() {
            };
            Empty.prototype = target.prototype;
            bound.prototype = new Empty();
            Empty.prototype = null;
        }
        return bound;
    }
    return {
        setters: [],
        execute: function () {
            ERROR_MESSAGE = 'Function.prototype.bind called on incompatible ';
            slice = Array.prototype.slice;
            toStr = Object.prototype.toString;
            funcType = '[object Function]';
            exports_1("default", (Function.prototype.bind || bind));
        }
    };
});
//# sourceMappingURL=function-bind.js.map