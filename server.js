var express = require('express'),
    routes = require(__dirname + '/app/routes.js'),
    app = express(),
    port = (process.env.PORT || 3000);

// Application settings
app.engine('html', require(__dirname + '/lib/template-engine.js').__express);
app.set('view engine', 'html');
app.set('vendorViews', __dirname + '/govuk_modules/views');
app.set('views', __dirname + '/app/views');

// Middleware to serve static assets
app.use('/public', express.static(__dirname + '/public'));
app.use('/public', express.static(__dirname + '/govuk_modules/govuk_template/assets'));
app.use('/public', express.static(__dirname + '/govuk_modules/govuk_frontend_toolkit'));
app.use(express.json());       // to support JSON-encoded bodies
app.use(express.urlencoded()); // to support URL-encoded bodies

// send assetPath to all views
app.use(function (req, res, next) {
  res.locals.assetPath="/public/";
  next();
});

// routes (found in routes.js)

routes.bind(app, '/public/');

// start the app

app.listen(port);
console.log('');
console.log('Listening on port ' + port);
console.log('');
