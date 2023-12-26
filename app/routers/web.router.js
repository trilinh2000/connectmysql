const isAuthMiddleWare=require('../isAuthMiddleware/auth.Middleware')
module.exports=app =>{
    const router=require('express').Router();
    router.get('/home',isAuthMiddleWare.loggedin,(req,res) =>{
        res.render('home');
    })
    app.use(router);

}