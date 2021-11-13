const app = require('./app');
const { 
	respondText, 
	respondEcho,
	respondStatic,
	respondJson,
	respondChat,
	respondSSE,
	respondSala
} = require('./services');

app.get('/', respondText);
app.get('/json', respondJson);
app.get('/echo', respondEcho);
app.get('/static/*', respondStatic);

app.get('/chat', respondChat);

app.get('/sse', respondSSE);

app.get('/sala', respondSala);