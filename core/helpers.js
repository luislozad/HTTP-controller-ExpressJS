const fs = require('fs');
const path = require('path');

const FILE_VIEW_MAIN = 'index.html';
const VIEW_DEFAULT = '<html></html>';

function view( name ) {
	if (name === null || name === undefined) {
		throw new Error('The view requires a name');
	}

	if (typeof name !== 'string') {
		throw new Error('A string is expected');
	}

	const root = path.resolve(__dirname, '../view', name.toLowerCase());

	const html = fs.readFileSync(root + '/' + FILE_VIEW_MAIN);

	return html ? html : VIEW_DEFAULT;
}

module.exports = {
	view,
};