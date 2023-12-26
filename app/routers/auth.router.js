const login=require('../controllers/login.controller')
const register=require('../controllers/register.controller')
const isAuthMiddleWare=require('../isAuthMiddleware/auth.Middleware')
const isForgot=require('../controllers/forgotPassword.controller')
module.exports=app =>{
    const router=require('express').Router();
    router.get('/login',isAuthMiddleWare.isAuth,login.showFromLogin)
    .post('/login',login.login)
    .get('/register',isAuthMiddleWare.isAuth,register.create)
    .post('/register',register.register)
    .get('/logout',isAuthMiddleWare.loggedin,login.logout)

    .get('/verify',register.verify)

    //show from forgot
    .get('/password/reset',isForgot.showFromForgot)
    //send link forgot
    .post('/password/reset/email',isForgot.sendLink)
    //show from reset password
    .get('/password/reset/:email',isForgot.showFromReset)
    .post('/password/reset',isForgot.reset)
    app.use(router);

}