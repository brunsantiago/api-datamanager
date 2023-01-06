import app from "./app.js";
import { PORT } from "./config.js";

//HTTP CONFIG

// app.listen(PORT);
// console.log(`Server on port http://localhost: ${PORT}`);


//HTTPS CONFIG

//import express from 'express';
// import fs from 'fs';
// import https from 'https';

// https.createServer({
//   ca: fs.readFileSync("ca_bundle.crt"),
//   key: fs.readFileSync("private.key"),
//   cert: fs.readFileSync("certificate.crt")
//  },app).listen(PORT_HTTPS, function(){
// 	console.log('Servidor https corriendo en el puerto: '+PORT_HTTPS);
// });

//HTTPS CONFIG

import fs from 'fs';
import https from 'https';
// const https = require('https');
// const fs = require('fs');
const https_options = {
 ca: fs.readFileSync("ca_bundle.crt"),
 key: fs.readFileSync("private.key"),
 cert: fs.readFileSync("certificate.crt")
};

// https.createServer(https_options, function (req, res) {
//  res.writeHead(200);
//  res.end("Welcome to Node.js HTTPS Server");
// }).listen(443)

https.createServer(https_options,app).listen(443, function(){
	console.log('Servidor https corriendo en el puerto: '+ 443);
});

//console.log(`Server on port api-datamanager.click: 443`);
