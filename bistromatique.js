function bistromatique(query) {
    var patternWithBracketsAndPriority = /\(-?[0-9]+[\*\/]{1}-?[0-9]+\)/,
        patternWithBracketsWithoutPriority = /\(-?[0-9]+[\+\-]{1}-?[0-9]+\)/,
        patternWithoutBracketsWithPriority = /-?[0-9]+[\*\/]{1}-?[0-9]+/,
        patternWithoutBracketsAndPriority = /-?[0-9]+[\-\+]{1}-?[0-9]+/,
        result;

    if ((result = find(query, patternWithBracketsAndPriority)) === null) {
        if ((result = find(query, patternWithBracketsWithoutPriority)) === null) {
            if ((result = find(query, patternWithoutBracketsWithPriority)) === null) {
                result = find(query, patternWithoutBracketsAndPriority);
            }
        }
    }

    if (result !== null) {
        query = query.slice(0, result.index) + strToOperation(result[0]) + query.slice(result.index + result[0].length);
    } else {
        return query;
    }

    return (bistromatique(query));
}

function strToOperation(str) {
    str = str.replace('(', '').replace(')', '');

    var pos = str.search(/\+|\/|\*/),
        operand, a, b;

    if (pos === -1) {
        if ((pos = str.indexOf('-', str)) === -1) {
            return 0;
        }
    }

    operand = str.charAt(pos);
    a = str.substr(0, pos);
    b = str.substr(pos + 1);

    if (operand === '+') {
        return parseInt(a) + parseInt(b);
    } else if (operand === '*') {
        return a * b;
    } else if (operand === '/') {
        return b === 0 ? 0 : a / b;
    } else if (operand === '-') {
        return a - b;
    }
}

function find(query, pattern) {
    return new RegExp(pattern).exec(query);
}

var query = "-1+(1+2*6)*-2/2*2+1*5000/42";
var startTime = new Date().getTime();
console.debug(bistromatique(query));
console.log(new Date().getTime() - startTime);