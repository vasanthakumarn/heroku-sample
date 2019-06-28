const express = require("express");
const path = require("path");
const httpsRedirect = require('express-https-redirect');

function wwwDotMiddleware() {
  return function (req, res, next) {
    if (!req.hostname.includes('herokuapp') && !req.hostname.includes('www')) {
      res.redirect('https://' + 'www.' + req.hostname + req.originalUrl);
    } else {
      next();
    }
  }
}

const app = express();

app.use('/', httpsRedirect());

app.use('/', wwwDotMiddleware());

app.use(express.static(__dirname + '/dist/heroku-sample'));

app.get("/*", (request, response) => {
  response.sendFile(path.join(__dirname + '/dist/heroku-sample/index.html'));
});

app.listen(process.env.PORT || 8080);
