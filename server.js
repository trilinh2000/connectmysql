const express=require('express');
const app=express();
const morgan=require('morgan');
exports.app = app;
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const bcrypt=require('bcrypt');
const session=require('express-session');
require('dotenv/config');

app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs')
app.set('views', 'app/views');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method', { methods: ['POST', 'GET'] }));
app.use(session({
    secret:process.env.SESSION_SECRET,
    resave:true,
    saveUninitialized:true
}))
app.get('/', (req, res, next) => {
    res.render('index');
})

require('./app/routers/todo.router')(app);
require('./app/routers/auth.router')(app);
require('./app/routers/web.router')(app);
app.listen(3000, function() {
    console.log('server running: http://localhost:3000');
});