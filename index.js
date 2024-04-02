var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var a = [1, 23, 4, 5, 6, 7];
function copy(arr) {
    return __spreadArray([], arr, true);
}
function insert(data, index, value) {
    var b = __spreadArray(__spreadArray([], data, true), [0], false);
    console.log(b[33]);
    if (index < 0) {
        b.unshift(value);
    }
    else if (index >= b.length) {
        b.push(value);
    }
    else {
        for (var i = 0; i < b.length; i++) {
            if (i !== index)
                continue;
            console.log(i);
            console.log(data);
            for (var j = i + 1; j <= data.length; j++) {
                // console.log(j);
                b[j] = b[j + 1];
            }
            b[i] = value;
        }
    }
    return b;
}
console.log(insert(a, 2, 100));
