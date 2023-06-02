const express = require("express");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const passportConfig = require("./passport");
const dotenv = require("dotenv")

const app = express();
const port = 3000;
const cors = require("cors");

dotenv.config();

passportConfig(app); // 패스포트 설정

// routes
const authRouter = require("./routes/auth");
const flightsRouter = require("./routes/flightsRouter");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(
    session({
        resave: false,
        saveUninitialized: false,
        secret: process.env.COOKIE_SECRET,
        cookie: {
            httpOnly: true,
            secure: false,
        },
    })
);

app.use('/api', [flightsRouter]);
app.use("/auth", authRouter);

app.get('/', async(req, res) => {
    return res.send("Here is 1st Class backend Server!");
})


app.listen(app.get("port"), () => {
    console.log(app.get("port"), "번 포트에서 대기중");
});