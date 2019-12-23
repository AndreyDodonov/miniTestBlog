const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const port = process.env.PORT || 5000;
const clientPath = path.join(__dirname, 'client');
const keys = require('./keys');
const postRouter = require('./routes/post');

mongoose.connect(keys.mongoURI, { useUnifiedTopology: true, useNewUrlParser: true })
    .then(() => console.log('Database connected ...')  )
    .catch((err) => console.log('Database connection failed: ', err));

const app = express();
app.use(bodyParser.json());
app.use(express.static(clientPath));
app.use('/api/post', postRouter);

app.listen(port, (err) => {
    if (err) {
        return console.log('something bad happens ...', err)
    }
    console.log(`server has been started on port ${port} ...`);
});
