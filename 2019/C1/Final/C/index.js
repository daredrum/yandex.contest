/**
 *
 * @param {String} imageSrc - base64 картинки, например ’data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA...’
 * @returns {Promise}
 */
function traceImage(imageSrc) {
    const canvas = document.createElement('canvas');
    const img = document.createElement('img');
    const ctx = canvas.getContext("2d");

    img.setAttribute('src', imageSrc);

    return new Promise(resolve => {
        img.onload = () => {
            ctx.drawImage(img, 0, 0);

            const width = canvas.width;
            const height = canvas.height;
            const imgData = ctx.getImageData(0, 0, width, height);
            const d = imgData.data;
            const length = d.length;
            const figures = [];

            for (let i=0; i<length; i+=4) {
                if (d[i] === 255 && d[i+1] === 255 && d[i+2] === 255) {
                    continue;
                }

                const top = Math.floor(i/4/width);
                const left = i/4 % width;

                figures.push({ top, left, bg: [d[i], d[i+1], d[i+2]] });
            }

            const leftTopPoint = figures[0];
            const rightBottomPoint = figures[figures.length - 1];

            return resolve(`
        <div>  
          <div style="  
            position: absolute;  
            width: ${rightBottomPoint.left - leftTopPoint.left + 1}px;  
            height: ${rightBottomPoint.top - leftTopPoint.top + 1}px;  
            top: ${leftTopPoint.top}px;  
            left: ${leftTopPoint.left}px;  
            background-color: rgb(${leftTopPoint.bg.join(', ')});  
          "></div>  
        </div>
      `);
        };
    });
}
