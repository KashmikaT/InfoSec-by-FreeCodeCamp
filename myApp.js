const express = require('express');
const helmet = require('helmet'); // Import helmet
const app = express();

// Use Helmet to hide the X-Powered-By header
app.use(helmet.hidePoweredBy());

// Use Helmet to prevent clickjacking attacks
app.use(helmet.frameguard({ action: 'deny' }));

// Enable deprecated XSS filter
app.use(helmet.xssFilter());

// Prevent MIME sniffing attacks
app.use(helmet.noSniff());

// Prevent Internet Explorer from executing downloaded files in the site's context
app.use(helmet.ieNoOpen());

// Define HSTS max age (90 days)
const ninetyDaysInSeconds = 90 * 24 * 60 * 60;

// Enable HSTS and force HTTPS
app.use(
  helmet.hsts({
    maxAge: ninetyDaysInSeconds,
    force: true, // Override existing HSTS headers (required in Gitpod)
  })
);

// Disable DNS prefetching
app.use(helmet.dnsPrefetchControl({ allow: false }));

// Disable browser caching
app.use(helmet.noCache());

// Set Content Security Policy with helmet
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"], // Trust only the same origin for all resources by default
      scriptSrc: ["'self'", "trusted-cdn.com"], // Allow scripts from the same origin and from trusted-cdn.com
    },
  })
);

module.exports = app;
const api = require('./server.js');
app.use(express.static('public'));

app.disable('strict-transport-security');
app.use('/_api', api);
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});
let port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`FreeCodeCamp IS project listening on port ${port}`);
});
