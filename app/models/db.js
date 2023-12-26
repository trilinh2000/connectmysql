const dbConfig=require('../config/db.config');
const mysql=require('mysql');

const connection=mysql.createConnection({
    host: dbConfig.HOST,
    user: dbConfig.USER,
    password: dbConfig.PASSWORD,
    database: dbConfig.DB
});
connection.connect(error =>{
    if(error){
        console.log('Disconnected to the database');
    }
    else{
        console.log('Successfully connected to the database');
    }
});
module.exports=connection;