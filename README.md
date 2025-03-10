# Information Security with HelmetJS

This is the boilerplate for the Information Security lessons. Instructions for completing these lessons start at https://www.freecodecamp.org/learn/information-security/information-security-with-helmetjs/

found this doc helpful for the 1st part of the lec: [text](https://www.freecodecamp.org/news/how-to-deploy-nodejs-application-with-render/)

Used the railway for hosting since this url is not that helpful.

in lesson 2 we learn to hide the info to save the app from potential threts for example X-Powered-By: Express include by default and we can hide that, to mitigate this risk, you can remove the X-Powered-By header using the helmet.hidePoweredBy() middleware.

in lesson 3 we learn to get protect from clickjacking attacks where a malicious site can embed your webpage inside an <iframe> without your consent. This could trick users into interacting with your site in unintended ways (e.g., clicking hidden buttons that execute harmful actions)
To prevent this, you should use Helmet’s frameguard middleware to set the X-Frame-Options HTTP header. This tells browsers not to allow your site to be embedded in an <iframe>, thereby preventing clickjacking attacks.

in lesson 4 we learn about get protect form Cross-Site Scripting (XSS) is an attack where malicious scripts are injected into web pages to steal user data, such as session cookies or passwords. To reduce the risk of XSS attacks, sanitizing user input and using security headers is crucial.
to enable this we can use app.use(helmet.xssFilter()); but this is an old method and can use better methods.

in lesson 5 we learn about MIME sniffing is a technique browsers use to guess the content type of a response, even if the Content-Type header is set. This behavior can lead to security vulnerabilities, To prevent this, use helmet.noSniff() to set the X-Content-Type-Options: nosniff header.

in lesson 6 we learn about Older versions of Internet Explorer (IE) allow downloaded HTML files to execute JavaScript in the context of your site, to prevent these use app.use(helmet.ieNoOpen());

in lesson 7 we learning to convert http sites to https If your website supports HTTPS, users may still access it via insecure HTTP. Attackers can exploit this to perform protocol downgrade attacks or cookie hijacking

Browsers pre-resolve domain names for links in a page before the user clicks them. While this improves performance, it can lead to:

Increased DNS queries, causing unnecessary network load. Privacy risks, as eavesdroppers can infer visited pages. Incorrect analytics, since some links appear "visited" when they are not. Solution: Use helmet.dnsPrefetchControl() to disable DNS prefetching and prevent leaking browsing behavior.

By default, browsers cache web pages, which can cause users to see outdated versions of your website even after an updatUse helmet.noCache() to disable client-side caching.

 Content Security Policy (CSP) is a security feature used to mitigate a variety of attacks on web applications, such as Cross-Site Scripting (XSS), clickjacking,