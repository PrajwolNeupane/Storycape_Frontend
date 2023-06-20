import axios from 'axios';
import express from 'express';
import { dirname } from 'path';
import { fileURLToPath } from 'url';


const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url));

app.set('view engine', 'ejs')
app.use(express.static(__dirname + '/public'));

app.get("/",async function(req,res) {
    try{
        console.log(req.cookies);
        const response = await axios("https://dummyjson.com/posts");
        const data = response.data.posts;
        res.render("HomePage",{data:data});
    }catch(e){
        res.json({
            error:"Error"
        });
        console.log(e);
    }

})
app.get("/blog/:id",async function(req,res) {
    try{

    }catch(e){
        console.log(e);
    }
})

app.get("/login",async function(req,res){
    res.render("LoginPage");
})

app.get("/signup",async function(req,res){
    res.render("SignUpPage");
})

app.get("/about",async function(req,res){
    res.render("AboutPage");
});

app.listen(process.env.PORT || 5000, () => {
    console.log("Server started");
})