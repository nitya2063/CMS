const express = require("express");
const app = express()
app.set("view engine","ejs")
app.use(express.json())//explicity use for form data
app.use(express.urlencoded({extended:true}))
app.get("/",(req,res)=>{
    res.render("homepage")
})
app.get("/createform",(req,res)=>{
    res.render("createform")
})

app.post("/createform",(req,res)=>{
    console.log(req.body)
}
    
)

app.listen(3000,function(){
    console.log("server running 3000")
})