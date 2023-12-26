const User = require("../models/user.model");
const bcrypt=require('bcrypt');

//show form login
module.exports.showFromLogin=(req,res) =>{
    res.render("auth/login");
}
module.exports.login=(req,res) =>{
    const {email,password}=req.body
    if(email&&password){
        User.findEmail(email,(err,user) =>{
            if(!user){
                console.log("email k ton tai");
                res.redirect('/login');
            }
            else{
                bcrypt.compare(password,user.password,(err,result) =>{
                    if(result==true){
                        req.session.loggedin=true;
                        req.session.user=user;
                        console.log("Login thanh cong");
                        res.redirect('/home');
                    }
                    else{
                        console.log("Email or password sai");
                        res.render("auth/login",{email,password});
                    }
                })
            }
        })
    }
    else{
        console.log("vui long nhap email");
        res.render("auth/login",{email,password});
    }
}
module.exports.logout=(req,res) =>{
    req.session.destroy((err) =>{
        if(err){
            res.redirect('/500');
        }
        res.redirect('/login');
    })
}