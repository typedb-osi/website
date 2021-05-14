const path = require('path');
const express = require('express');

const app = express();

// function requireHTTPS(req, res, next) {
//     // The 'x-forwarded-proto' check is for Heroku
//     if (!req.secure && req.get('x-forwarded-proto') !== 'https' && process.env.NODE_ENV !== "development") {
//         return res.redirect('https://' + req.get('host') + req.url);
//     }
//     next();
// }
// app.use(requireHTTPS);

const distPath = path.join(__dirname, 'dist');
app.use(express.static(distPath));

const port = process.env.PORT || 3000;
app.listen(port);

console.log(`Serving ${distPath}`);
console.log(`Listening ${port}`);
