# Information Security with HelmetJS

This is the boilerplate for the Information Security lessons. Instructions for completing these lessons start at https://www.freecodecamp.org/learn/information-security/information-security-with-helmetjs/

found this doc helpful for the 1st part of the lec: [text](https://www.freecodecamp.org/news/how-to-deploy-nodejs-application-with-render/)

Used the railway for hosting since this url is not that helpful.

in lesson 2 we learn to hide the info to save the app from potential threts for example X-Powered-By: Express include by default and we can hide that, to mitigate this risk, you can remove the X-Powered-By header using the helmet.hidePoweredBy() middleware.

in lesson 3 we learn to get protect from clickjacking attacks where a malicious site can embed your webpage inside an <iframe> without your consent. This could trick users into interacting with your site in unintended ways (e.g., clicking hidden buttons that execute harmful actions)
To prevent this, you should use Helmet’s frameguard middleware to set the X-Frame-Options HTTP header. This tells browsers not to allow your site to be embedded in an <iframe>, thereby preventing clickjacking attacks.

