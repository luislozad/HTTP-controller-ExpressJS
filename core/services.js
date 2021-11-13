const path = require('path');
const fs = require('fs');
const querystring = require('querystring');
const EventEmitter = require('events');
const { view } = require('./helpers');

const chatEmitter = new EventEmitter();

exports.respondText = function ( req, res ) {
	res.setHeader('Content-Type', 'text/plain');
	res.end('hi');
}

exports.respondJson = function ( req, res ) {
	res.json({ text: 'hi', numbers: [1, 2, 3] });
}

function respondNotFound( req, res ) {
	res.writeHead(404, { 'Content-Type': 'text/plain' });
	res.end('Not Found');
}

exports.respondNotFound = respondNotFound;

exports.respondEcho = function ( req, res ) {
	const { input = '' } = querystring.parse(req.url.split('?')[1]);
	res.setHeader('Content-Type', 'application/json');
	res.end(
		JSON.stringify({
		  normal: input,
		  shouty: input.toUpperCase(),
		  characterCount: input.length,
		  backwards: input
		    .split('')
		    .reverse()
		    .join('')
		})
	);
}

exports.respondStatic = function ( req, res ) {
	const filename = path.resolve(__dirname, '../public');
  	fs.createReadStream(filename + req.url)
    	.on('error', () => respondNotFound({req, res}))
    	.pipe(res);
}

exports.respondChat = function ( req, res ) {
	const { message } = req.query;

	chatEmitter.emit('message', message);
	res.end();
}

exports.respondSSE = function ( req, res ) {
	res.writeHead(200, {
		'Content-Type': 'text/event-stream',
		'Connection': 'keep-alive'
	});

	const onMessage = msg => res.write(`data: ${msg}\n\n`);

	chatEmitter.on('message', onMessage);

	res.on('close', () => {
		chatEmitter.off('message', onMessage);
	});
}

exports.respondSala = function ( req, res ) {
	res.setHeader('Content-Type', 'text/html');
	res.end(view('sala.index'));	
}