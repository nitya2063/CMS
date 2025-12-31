const dbconfig = require("../config/dbconfig.js");
const { Sequelize,DataTypes } = require("sequelize");

//la sequelize yo config
const sequelize = new Sequelize(dbconfig.DB, dbconfig.USER, dbconfig.PASSWORD,{
    host: dbconfig.HOST,
    dialect: dbconfig.dialect,
    operatorsAliases: false,
    port: 3306,
    //port : 7013,

    pool: {
        max: dbconfig.pool.max,
        min: dbconfig.pool.min,
        acquire: dbconfig.pool.acquire,
        idle: dbconfig.pool.idle,
    },
});

sequelize
 .authenticate()
 .then(() => {
    console.log("CONNECTED");
 })
 .catch((err) => {
    console.log("Error" + err);
 });

 const db = {};
 
 db.Sequelize = Sequelize;
 db.sequelize = sequelize;

 //importing model files
 db.blogs = require("./blogmodel.js")(sequelize, DataTypes);



 db.sequelize.sync({ force: false }).then(() =>{
    console.log("yes re-sync done");
 });

 module.exports = db;
 