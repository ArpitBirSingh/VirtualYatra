const express = require('express');
const path = require('path');
const app = express();

app.use('/scripts', express.static(path.join(__dirname, 'node_modules/three/build')));
app.use('/scripts', express.static(path.join(__dirname, 'node_modules/three/examples/js/controls')));
app.use('/scripts', express.static(path.join(__dirname, 'node_modules/three/examples/js/loaders')));
app.use('/scripts', express.static(path.join(__dirname, 'node_modules/three/examples/js/libs')));
app.use(express.static(path.join(__dirname,"src")));


app.listen(3000, ()=> {
    console.log('Server started on port 3000');
});