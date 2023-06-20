import axios from 'axios';
import express from 'express';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import cookieParser from 'cookie-parser';


const app = express();
app.use(cookieParser());
const __dirname = dirname(fileURLToPath(import.meta.url));

app.set('view engine', 'ejs')
app.use(express.static(__dirname + '/public'));

app.get("/", async function (req, res) {
    try {
        var response = await axios("https://dummyjson.com/posts");
        const data = response.data.posts;
        var user = null
        if (req.cookies.token) {
            response = await axios.post("http://localhost:8000/api/v2/user/auth", {
                token: req.cookies.token
            }, {
                headers: {
                    'api_key': "mero-54321-app"
                }
            });
            user = response.data;
        }
        res.render("HomePage", { data: data, user: user });
    } catch (e) {
        res.json({
            error: "Error"
        });
        console.log(e);
    }

})
app.get("/blog/:id", async function (req, res) {
    try {

    } catch (e) {
        console.log(e);
    }
})

app.get("/login", async function (req, res) {
    res.render("LoginPage");
})

app.get("/signup", async function (req, res) {
    res.render("SignUpPage");
})

app.get("/profile", async function (req, res) {
    if (req.cookies.token) {
        try {
            const response = await axios.post("http://localhost:8000/api/v2/user/auth", {
                token: req.cookies.token
            }, {
                headers: {
                    'api_key': "mero-54321-app"
                }
            });
            const user = response.data;
            res.render("ProfilePage", { user: user });
        } catch (e) {
            console.log(e);
        }
    }
});

app.get("/about", async function (req, res) {
    res.render("AboutPage");
});

app.listen(process.env.PORT || 5000, () => {
    console.log("Server started");
})