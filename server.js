const path = require('path');
const express = require('express');

const app = express();
const distPath = path.join(__dirname, 'dist');
app.use(express.static(distPath));
const port = process.env.PORT || 3000;
app.listen(port);
console.log(`Serving ${distPath}`);
console.log(`Listening ${port}`);
