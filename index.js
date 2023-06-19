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
        const response = await axios("https://dummyjson.com/posts");
        const data = response.data.posts;
        res.render("HomePage",{data:data});
    }catch(e){
        console.log(e);
    }

})

app.listen(process.env.PORT || 5000, () => {
    console.log("Server started");
})