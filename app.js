const express = require("express");
const { blogs } = require("./model/index");
const app = express()
app.set("view engine","ejs")

//database connection
require("./model/index")

app.use(express.json())//explicity use for form data
app.use(express.urlencoded({extended:true}))
app.get("/",async(req,res)=>{
    const allBlogs= await blogs.findAll()
    console.log(allBlogs)
    res.render("homepage",{blogs:allBlogs})
})
app.get("/createform",async(req,res)=>{
    
    res.render("createform")
})

app.post("/createform",async(req,res)=>{
   const title= req.body.title;
   const subTitle= req.body.subTitle;
   const description= req.body.description;

await blogs.create({
    title: title,
    subTitle: subTitle,
    description: description
})

    res.redirect("/")
    
}
    
)

app.listen(3000,function(){
    console.log("server running 3000")
})
