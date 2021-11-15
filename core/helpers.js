const fs = require('fs');
const path = require('path');

const VIEW_DEFAULT = '<html></html>';

function view( name ) {
	if (name === null || name === undefined) {
		throw new Error('The view requires a name');
	}

	if (typeof name !== 'string') {
		throw new Error('A string is expected');
	}

	if (name.includes('/')) {
		throw new Error('No slash allowed in the view name format');
	}

	if (name.includes('.')) {
		const { paths, file } = parsePaths(name);
		const root = path.resolve(__dirname, '../view', ...paths);

		return getFileHTML(root, file);
	} else {
		const root = path.resolve(__dirname, '../view');

		return getFileHTML(root, name);	
	}
}

function getFileHTML(root, file) {
	const html = fs.readFileSync(root + '/' + file + '.html');

	return html ? html : VIEW_DEFAULT;		
}

function parsePaths( str ) {
	const _paths = str.split('.');
	const max = _paths.length - 1;

	return {
		paths: _paths.slice(0, max),
		file: _paths[max]
	};
}

module.exports = {
	view,
};