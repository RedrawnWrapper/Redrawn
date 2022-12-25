const env = Object.assign(process.env,
	require('./env'),
	require('./config'));

const http = require('http');
const asu = require('./asset/upload');
const asl = require('./asset/load');
const asL = require('./asset/list');
const ast = require('./asset/thmb');
const chr = require('./character/redirect');
const pmc = require('./character/premade');
const chl = require('./character/load');
const chd = require('./character/delete');
const chs = require('./character/save');
const chu = require('./character/upload');
const stl = require('./static/load');
const stp = require('./static/page');
const stc = require('./static/pagecc');
const lvp = require('./static/pagelvp');
const thm = require('./static/pagethemelist');
const str = require('./starter/save');
const stt = require('./starter/thmb');
const del = require('./starter/delete');
const stu = require('./starter/upload');
const mvl = require('./movie/load');
const mvL = require('./movie/list');
const mvm = require('./movie/meta');
const mvs = require('./movie/save');
const mvt = require('./movie/thmb');
const mvu = require('./movie/upload');
const thl = require('./theme/load');
const thL = require('./theme/list');
const tsv = require('./tts/voices');
const tsl = require('./tts/load');
const evt = require('./events');
const url = require('url');

const functions = [
	asu,
	asl,
	asL,
	ast,
	chr,
	pmc,
	chl,
	chs,
	chu,
	stl,
	stp,
        stu,
	mvl,
	mvL,
	chd,
	mvm,
	mvs,
	mvt,
	mvu,
	thl,
	thL,
	tsv,
	tsl,
	evt,
	str,
	stt,
	stc,
	lvp,
	thm,
	del,
];

// Creates an HTTP server
if (env.LVM_ENV == "NON_SERVER")
{
	module.exports = http.createServer((req, res) => {
	const parsedUrl = url.parse(req.url, true);
	//if (!parsedUrl.path.endsWith('/')) parsedUrl.path += '/';
	const found = functions.find(f => f(req, res, parsedUrl));
	if (!found) { res.statusCode = 404; res.end(); }
	}).listen(env.SERVER_PORT, console.log);
} else if (env.LVM_ENV == "SERVER")
{
	// 2095 is intended for a Certified Redrawn Server (Cloudflare)
	env.SERVER_PORT = 2095;
	module.exports = http.createServer((req, res) => {
	const parsedUrl = url.parse(req.url, true);
	//if (!parsedUrl.path.endsWith('/')) parsedUrl.path += '/';
	const found = functions.find(f => f(req, res, parsedUrl));
	if (!found) { res.statusCode = 404; res.end(); }
	}).listen(2095, console.log);
}

// Fuck you Octanuary 
