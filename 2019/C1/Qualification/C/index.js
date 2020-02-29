/**
 * Отрисовать баркод для татуировки клона в element
 * @param cloneInfo {CloneInfo} - информация о клоне
 * @param element {HTMLDivElement} - div с фиксированным размером
 *     148x156 пикселей, в который будет отрисовываться баркод
 */
function renderBarcode(cloneInfo, element) {
    const barcode = document.createElement('div');
    barcode.style.cssText = `
    border: 3px solid black;
    bakcground: #fff;
    height: 144px;
    width: 136px;
    padding: 3px;
    display: flex;
    flex-wrap: wrap;
  `;
    const square = document.createElement('div');
    square.style.cssText = `
    display: block;
    width: 8px;
    height: 8px;
   `;

    const sexByte = cloneInfo.sex === 'male' ? 1 : 0;
    const name = cloneInfo.name.length < 26
        ? cloneInfo.name + Array(26 - cloneInfo.name.length).fill(' ').join('') : cloneInfo.name;
    const idNameBytes = (cloneInfo.id + name).split('').map(char => {
        const binary = char.charCodeAt(0).toString(2);
        return ('00000000'.slice(binary.length) + binary).split('');
    }).flat().map(Number);

    let matrix = [sexByte, ...idNameBytes];
    const totalMatrix = [];

    for (let i = 0; i < 17; i++) {
        const sum = matrix.filter((v, j) => j % 17 === i).reduce((s, v) => s += v);
        totalMatrix[i] = sum % 2 === 0 ? 0 : 1;
    }

    matrix = [...matrix, ...totalMatrix];

    element.innerHTML = '';
    for (let i = 0; i < matrix.length; i++) {
        const clone = square.cloneNode();
        clone.style.background = matrix[i] === 1 ? '#000' : '#fff';
        barcode.appendChild(clone);
    }
    element.appendChild(barcode);
}
