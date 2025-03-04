const express = require('express');
const helmet = require('helmet'); // Import helmet
const app = express();

// Use Helmet to hide the X-Powered-By header
app.use(helmet.hidePoweredBy());

// Use Helmet to prevent clickjacking attacks
app.use(helmet.frameguard({ action: 'deny' }));

// Enable deprecated XSS filter (can be updated later, but included for now)
app.use(helmet.xssFilter());

// Prevent MIME sniffing attacks
app.use(helmet.noSniff());

// Prevent Internet Explorer from executing downloaded files in the site's context
app.use(helmet.ieNoOpen());

// Define HSTS max age (90 days)
const ninetyDaysInSeconds = 90 * 24 * 60 * 60;

// Enable HSTS and force HTTPS (make sure this is set to true for secure connections)
app.use(
  helmet.hsts({
    maxAge: ninetyDaysInSeconds,
    force: true, // Force HTTPS
  })
);

// Disable DNS prefetching
app.use(helmet.dnsPrefetchControl({ allow: false }));

// Disable browser caching
app.use(helmet.noCache());

// Set Content Security Policy (CSP) with helmet
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"], // Trust only the same origin for all resources by default
      scriptSrc: ["'self'", "trusted-cdn.com"], // Allow scripts from the same origin and from trusted-cdn.com
    },
  })
);

// Serve static files from 'public' folder
app.use(express.static('public'));

// Set up routes
const api = require('./server.js');
app.use('/_api', api);

// Home route
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

// Remove strict-transport-security disable line
// app.disable('strict-transport-security'); // No need to disable HSTS as it's already configured correctly

// Set up the port for the server
let port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`FreeCodeCamp IS project listening on port ${port}`);
});
