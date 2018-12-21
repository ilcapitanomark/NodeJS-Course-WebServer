const express = require('express'); //the web server
const hbs = require('hbs');         //for templating html pages
const logger = require('./logger');
const maintenance = false;
const webPort = process.env.PORT || 3000;

var app = express();

hbs.registerPartials(__dirname + '/views/partials');   //this is to have snippet html codes for hbs
app.set('view engine', 'hbs');

app.use((request, response,  next) => {
  var logMessage = `${request.method} ${response.statusCode} ${request.url}`;
  var logFunction = '';
  var logLevel = 'I';
  logger.logger(logMessage, logFunction, logLevel);
  next();   //this is needed to move on
});

if (maintenance === true) {
  app.use((request, response,  next) => {
    var logMessage = `Maintenance Mode`;
    var logFunction = '';
    var logLevel = 'I';
    logger.logger(logMessage, logFunction, logLevel);
    response.render('maintenance.hbs', {
      pageTitle: 'Maintenance Page',
      welcomeMessage: 'website in maintenance mode. Will be back soon!'
    });
  });
}

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});

app.use(express.static(__dirname + '/public'));   //this use the directory you are in

app.get('/', (request, response, next) => {
  //response.send('<h1>hallo Express</h1>');
  response.render('home.hbs', {
    pageTitle: 'Home Page',
    welcomeMessage: 'welcome to mpi website'
  });
});
app.get('/bad', (request, response, next) => {
  //response.send('<h1>hallo Express</h1>');
  response.send({
    errorMessage: 'Unable to handle request.'
  })
});

app.get('/about', (request, response) => {
  //response.send('<h1>hallo Express</h1>');
  response.render('about.hbs', {
    pageTitle: 'About Page',
    welcomeMessage: 'welcome to mpi website'
  });
});

app.get('/project', (request, response) => {
  //response.send('<h1>hallo Express</h1>');
  response.render('project.hbs', {
    pageTitle: 'Project Page',
    welcomeMessage: 'WebSite project page'
  });
});

app.listen(webPort, () => {
  console.log('Web server starting');
  var logMessage = `Web server starting on port ${webPort}`;
  var logFunction = 'INIT';
  var logLevel = 'I';
  logger.logger(logMessage, logFunction, logLevel);

});
