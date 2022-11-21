import app from "./app.js";
import { PORT } from "./config.js";

app.listen(PORT);
console.log(`Server on port http://localhost:${PORT}`);


  //HTTPS CONFIG

  // import express from 'express';
  // import fs from 'fs';
  // import https from 'https';

  // https.createServer({
  //    cert: fs.readFileSync('localhost.pem'),
  //    key: fs.readFileSync('localhost-key.pem')
  //  },app).listen(PORT_HTTPS, function(){
  // 	console.log('Servidor https corriendo en el puerto: '+PORT_HTTPS);
  // });
