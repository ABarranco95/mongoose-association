require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const app = express();

const BlogPost = require('./models/blog.js')

// Connect to database
mongoose.connect(`mongodb://127.0.0.1:27017/mongooseAssociation`)

const db = mongoose.connection;

db.once('open', () => {
    console.log(`Connected to MongoDB on ${db.host}:${db.port}`)
})

db.on('error', (err) => {
    console.log('Error', err);
})


app.use(express.urlencoded({ extended: false}));

app.get('/', (req, res) => {
    res.send('Home Route, Backend');
})



// one way to create a post
app.get('/blog', (req, res) => {
    BlogPost.create({ 
        title: 'Mongoose for all Mongoose', 
        body: 'This is a cool blog post'
    });

    const post1 = new BlogPost({
        title: 'SEI 1019', 
        body: 'Software Engineers are cool.'
    })
    post1.save();
    res.send('Post completed');
});




const PORT = process.eventNames.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Listening on PORT ${PORT}`);
});