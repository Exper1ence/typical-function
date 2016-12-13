/**
 * Created by Exper1ence on 2016/12/13.
 */
const _ = require('lodash');

function typeOf(value) {
    return Object.prototype.toString.call(value).slice(8, -1);
}
function notMatched(a, b) {
    return typeOf(a.prototype) != typeOf(b);
}

function type() {
    const cb = Array.prototype.pop.call(arguments);
    if (type.check == false) return cb;
    const types = arguments;
    return function () {
        for (let i of _.range(types.length)) {
            if (notMatched(types[i], arguments[i])) {
                let which = '';
                switch (i) {
                    case 0:
                        which = '1st';
                        break;
                    case 1:
                        which = '2nd';
                        break;
                    case 2:
                        which = '3rd';
                        break;
                    default:
                        which = `${i + 1}th`;
                        break;
                }
                throw new TypeError(`The ${which} parameter should be a ${typeOf(types[i].prototype)}.`);
            }
        }
        return cb.apply(null, arguments);
    }
}
type.check = true;
const returnValues = ['String', 'Number', 'Object', 'Function', 'Boolean', 'Array'];
for (let value of returnValues) {
    type[value] = function () {
        const typeArgs = arguments;
        return function () {
            const result = type.apply(null, typeArgs).apply(null, arguments);
            if (notMatched(global[value], result))throw new TypeError(`The return value should be a ${value}`);
            return result;
        }
    };
}
module.exports = type;