function solution(input) {  
    const fragment = document.createElement('div');
    fragment.innerHTML = input.trim();
    return convertToMarkdown(fragment, 0, '').trimEnd();
}
  
const isOrderedList = (element) => element.tagName === 'OL';
const isUnorderedList = (element) => element.tagName === 'UL';
  
function convertToMarkdown(element, indent, pointer) {
    let lastPointer = '';
    const indentSpace = ''.padStart(indent, ' ');
    return Array.prototype.reduce.call(element.children, (result, child, i) => {
        if (isOrderedList(child) || isUnorderedList(child)) {
        const pointerIndent = lastPointer.length > 0 ? lastPointer.length + 1 : 0;
        const newIndent = indent + pointerIndent;
        const currentPointer = isOrderedList(element) ? lastPointer : '';
        result += convertToMarkdown(child, newIndent, currentPointer);
        return result;
        }
        
        const text = child.textContent.trim().replace(/\n/g, '').replace(/\s+/g, ' ');
        lastPointer = isOrderedList(element) ? `${pointer}${i + 1}.` : '-';
        result += `${indentSpace}${lastPointer} ${text}\n`;

        return result;
    }, '');
}