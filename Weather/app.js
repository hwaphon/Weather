var app = require('express')();
var Api = require('./util/weather.js')

const UID = 'UFCBE549B2';
const KEY = '70u28jmz8bdgdgxo';
var api = new Api(UID, KEY);

app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods","GET");
    res.header("X-Powered-By",' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});

app.listen(process.env.PORT || 5000);

app.get('/weather/now/:location', function(req, res) {
	api.getWeatherNow(req.params.location).then(function(data) {
	  res.send(JSON.stringify(data));
	}).catch(function(err) {
	  res.send(JSON.stringify(err));
	});
});

app.get('/weather/recent/:location', function(req, res) {
	api.getWeatherRecent(req.params.location).then(function(data) {
	  res.send(JSON.stringify(data));
	}).catch(function(err) {
	  res.send(JSON.stringify(err));
	});
});





