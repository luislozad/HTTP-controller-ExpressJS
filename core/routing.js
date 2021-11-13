const app = require('./app');
const { 
	respondText, 
	respondEcho,
	respondStatic,
	respondJson
} = require('./services');

app.get('/json', respondJson)
app.get('/echo', respondEcho)
app.get('/static/*', respondStatic)