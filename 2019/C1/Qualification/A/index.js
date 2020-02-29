function solve({ a, replace }) {
    const arrA = String(a).split('').map(Number);
    const arrB = arrA.map(replace);
    const ln = arrA.length;
    let result = [];
    let isUpdate = false;

    for(let i = 0; i < ln; i++) {
        const min = Math.min(arrA[i], arrB[i]);

        if (min === arrA[i] && isUpdate) {
            result.push(...arrA.slice(i));
            break;
        }

        result.push(min);

        if (min === arrB[i]) {
            isUpdate = true;
        }
    }

    return parseInt(result.join(''), 10);
}


module.exports = solve;
