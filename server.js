const express = require('express'),
mongoose = require('mongoose'),
db = require('./config/key').mongoURI,
port = process.env.PORT || 8080,
app = express();

const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const posts = require('./routes/api/posts');

//MongoDB connection
mongoose.connect(db,{useNewUrlParser:true, useUnifiedTopology: true}).then(() => console.log('MongoDB connected')).catch(err => console.log(err));

app.get('/', (req,res) => res.send("Hello world"));

app.use('/users',users);
app.use('/profile',profile);
app.use('/posts',posts);

app.listen(port, () => console.log(`Listening on ${port}.`));