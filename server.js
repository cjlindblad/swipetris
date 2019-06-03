const express = require('express');
const path = require('path');
const app = express();

// TODO look into using nodemon

express.static.mime.define({ 'application/javascript': ['js'] });

app.use('/src', express.static(__dirname + '/src'));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/index.html'));
});

app.listen(8080, () => console.log('Listening on port 8080!'));
