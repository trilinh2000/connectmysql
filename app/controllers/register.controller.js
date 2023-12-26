const User=require('../models/user.model');
const bcrypt=require('bcrypt');
require('dotenv/config');
const mailer=require('../utills/mailer');

// 
module.exports.create=(req,res) =>{
    res.render('auth/register');
}
module.exports.register=(req,res) =>{
    const {email,password,name}=req.body;
    if(email&&password&&name){
        User.findEmail(email,(err,user) =>{
            if(err||user){
                console.log('user ton tai');
                res.render('auth/register',{email,password,name});
            }
            
        });
        bcrypt.hash(password,parseInt(process.env.BCRYPT_SALT_ROUND)).then((hashed) =>{
            const user=new User({
                name:name,
                email:email,
                password:hashed
            });
            User.create(user,(err,user) =>{
                if(!err){
                    bcrypt.hash(user.email,parseInt(process.env.BCRYPT_SALT_ROUND)).then((hashedEmail) =>{
                    console.log(`${process.env.APP_URL}/verify?email=${user.email}&token=${hashedEmail}`);
                    mailer.sendMail(user.email, "Verify Email", `<a href="${process.env.APP_URL}/verify?email=${user.email}&token=${hashedEmail}"> Verify </a>`)
                    })
                    res.redirect('/login');
                }
            })
        });
    }
    else{
        console.log('user ton tai');
        res.render('auth/register',{email,password,name})
    }
}
// module.exports.verify=(req,res) =>{

//     // so sanh email voi token k tim ra email thi bao loi
//     bcrypt.compare(req.query.email,req.query.token,(err,result) =>{
//         if(result==true){
//             User.verify(req.query.email,(err,result) =>{
//                 if(!err){
//                     res.redirect('/login');
//                 }else{
//                     res.redirect('/500');
//                 }
//             })
//         }
//         else{
//             res.redirect('/404');
//         }
//     })
// }
exports.verify = (req, res) => {
    bcrypt.compare(req.query.email, req.query.token, (err, result) => {
        if (result == true) {
            User.verify(req.query.email, (err, result) => {
                if (!err) {
                    res.redirect('/login');
                } else {
                    res.redirect('/500');
                }
            });
        } else {
            res.redirect('/404');
        }
    })
}