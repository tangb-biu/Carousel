/**
 *	@param {string} id
 *	@param {string} type such as canvas,div
 *  @param {object} painter
 *  @param {number} dpr
 */
function createDom(id, type, painter, dpr) {
	let newDom = document.createElement(type);
	let width = painter.width;
	let height = painter.height;

	let newDomStyle = newDom.style;
	newDomStyle.left = 0;
	newDomStyle.top = 0;
	newDomStyle.width = width + 'px';
	newDomStyle.height = height + 'px';
	newDomStyle['-webkit-user-select'] = 'none';
	newDomStyle['user-select'] = 'none';
	newDomStyle['-webkit-touch-callout'] = 'none';
	newDomStyle['-webkit-tap-highlight-color'] = 'rgba(0, 0, 0, 0)';
	newDomStyle['padding'] = 0;
	newDomStyle['margin'] = 0;
	newDomStyle['border-width'] = 0;
	newDom.width = width * dpr;
	newDom.height = height * dpr;
	newDom.onselectstart = function returnFalse() {
		return false;
	}

	newDom.setAttribute('data-fr-dom-id', id);
	return newDom;	
}

export { createDom }