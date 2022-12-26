const express = require('express');
const authentication = require('./authentication/authentication')
const app = express();
app.use(express.urlencoded({extended: true}))

// app.use(express.bodyParser());
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use('/auth', require('./routes/auth.route'))
app.use('/books', authentication, require('./routes/books.route'))


app.listen(5000, (err) => {
    if (err) console.log(err)
    console.log('App running at server 5000')
})