const express = require("express");
const { blogs } = require("./model/index");
const { where } = require("sequelize");
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
app.get("/singlepage/:id",async(req,res)=>{
    const id=req.params.id
    const data= await blogs.findAll({
        where:{
            id:id
        }
    })
    res.render("singlepage",{data:data})
})

app.get('/edit/:id', (req, res) => {
    // fetch blog by id
    // render edit form
});

app.get('/delete/:id', async(req, res) => {
    // delete blog from database
    const id = req.params.id

   await blogs.destroy({
            where: {
                id:id
            }
    })

    res.redirect("/")
});



app.listen(3000,function(){
    console.log("server running 3000")
})
