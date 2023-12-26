const User=require('../models/user.model');
const bcrypt =require('bcrypt');
const mailer=require('../utills/mailer')

exports.showFromForgot=(req,res) =>{
    res.render('auth/password/email');
}
exports.sendLink=(req,res) =>{
    const {email} =req.body
    if(!email){
        res.redirect('/password/reset');
    }
    else{
        User.findEmail(email,(err,user) =>{
            if(!user){
                res.redirect('/password/reset');
            }
            else{
                bcrypt.hash(user.email,parseInt(process.env.BCRYPT_SALT_ROUND)).then((hashedEmail) =>{
                    mailer.sendMail(user.email,"Reset Password",`<a href="${process.env.APP_URL}/password/reset/${user.email}?token=${hashedEmail}"> Reset </a>`)
                    res.redirect('/password/reset?status=access');
                })
            }
        })
    }
}
exports.showFromReset=(req,res) =>{
    if(!req.params.email||!req.query.token){
        res.redirect('/password/reset');
    }
    else{
        res.render('auth/password/reset',{email:req.params.email,token:req.query.token});
    }
}
exports.reset=(req,res) =>{
    const {email,token,password} =req.body
    if(!email||!token||!password){
        res.redirect('/password/reset');
    }
    else{
        bcrypt.compare(email,token,(err,result) =>{
            if(result==true){
                bcrypt.hash(password,parseInt(process.env.BCRYPT_SALT_ROUND)).then((hashed) =>{
                    User.update(email,hashed,(err,result) =>{
                        if(err){
                            res.redirect('/password/reset');
                        }
                        else{
                            console.log("reset success");
                            res.redirect('/login');
                        }
                    })
                })
            }
            else{
                res.redirect('/password/reset');
            }
        })
    }
}
