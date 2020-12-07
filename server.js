const express = require('express');

const app = express();

app.use(express.static('./dist/AngularApp'));

app.get('/*', (req, res) =>
    res.sendFile('index.html', {root: 'dist/AngularApp/'}),
);

app.listen(process.env.PORT || 8080);