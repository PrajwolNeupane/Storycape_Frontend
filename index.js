import axios from 'axios';
import express from 'express';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import cookieParser from 'cookie-parser';
import * as dotenv from 'dotenv';
dotenv.config();



const app = express();
app.use(cookieParser());
const __dirname = dirname(fileURLToPath(import.meta.url));

app.set('view engine', 'ejs')
app.use(express.static(__dirname + '/public'));

app.get("/", async function (req, res) {
    try {
        var response = await axios(`${process.env.API_URL}api/v2/blog`, {
            headers: {
                'api_key': `${process.env.API_KEY}`
            }
        });
        const data = response.data;
        var user = null
        if (req.cookies.token) {
            response = await axios.post(`${process.env.API_URL}api/v2/user/auth`, {
                token: req.cookies.token
            }, {
                headers: {
                    'api_key': `${process.env.API_KEY}`
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

app.get("/blog/:slug", async function (req, res) {


    if (req.params.slug) {
        const { slug } = req.params;
        try {
            var response = await axios.post(`${process.env.API_URL}api/v2/blog/single`, {
                slug: slug
            }, {
                headers: {
                    'api_key': `${process.env.API_KEY}`
                }
            });
            const blogData = response.data;
            var user = null

            if (req.cookies.token) {
                try {
                    response = await axios.post(`${process.env.API_URL}api/v2/user/auth`, {
                        token: req.cookies.token
                    }, {
                        headers: {
                            'api_key': `${process.env.API_KEY}`
                        }
                    });
                    user = response.data;

                } catch (e) {
                    console.log(e);
                }

            }
            res.render('SingleBlogPage', { blog: blogData, user: user });
        } catch (e) {
            console.log(e);
        }
    } else {
        res.send("Page No Found")
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
            const response = await axios.post(`${process.env.API_URL}api/v2/user/auth`, {
                token: req.cookies.token
            }, {
                headers: {
                    'api_key': `${process.env.API_KEY}`
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

    var user = null

    if (req.cookies.token) {
        try {
            const response = await axios.post(`${process.env.API_URL}api/v2/user/auth`, {
                token: req.cookies.token
            }, {
                headers: {
                    'api_key': `${process.env.API_KEY}`
                }
            });
            user = response.data;

        } catch (e) {
            console.log(e);
        }

    }
    res.render("AboutPage", { user: user });
});

app.listen(process.env.PORT || 5000, () => {
    console.log("Server started");
})