const sql = require("./db");

const User=function(user){
    this.name=user.name;
    this.password=user.password;
    this.email=user.email;
}
User.create = (newUser, result) => {
    sql.query("INSERT INTO users SET ?", newUser, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        console.log("created user: ", { id: res.insertId, ...newUser });
        result(null, { id: res.insertId , ...newUser });
    });
};
User.findEmail=(email,result) =>{
    sql.query(`select*from users where email='${email}'`,(err,res) =>{
        if(err){
            console.log("error:",err);
            result(err,null);
            return;
        }
        if(res.length){
            console.log("found user:",res[0]);
            result(null,res[0]);
            return;
        }
        console.log({kind:"not found"},null);
    });
}
User.verify = (email, result) => {
    sql.query(
        "UPDATE users SET email_verified_at = ? WHERE email = ?",
        [new Date(), email],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }
            if (res.affectedRows == 0) {
                result({ kind: "not_found" }, null);
                return;
            }
            result(null, { email: email });
        }
    );
}
User.update=(email,password,result) =>{
    sql.query(
        "UPDATE users SET password = ? WHERE email = ?",
        [password, email],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }
            else{
            console.log("reset success");
            result(null, { email: email });
        }
    }
    );
}
module.exports=User;