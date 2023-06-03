const express = require("express");
const { Server } = require("http");

const cookieParser = require("cookie-parser");
const session = require("express-session");
const passportConfig = require("./passport");
const dotenv = require("dotenv")

const socketIo = require("socket.io");
const cors = require("cors");

const app = express();
const http = Server(app);
const io = socketIo(http);

dotenv.config();

// socket
io.on("connection", (sock) => {
    console.log("새로운 소켓이 연결되었습니다.");

    sock.on("disconnect", () => {
        console.log(`${sock.id}님이 연결을 종료했습니다.`);
    });
});

// 

// routes
const authRouter = require("./routes/authRouter");
const flightsRouter = require("./routes/flightsRouter");

app.use(cors({
    origin: "*",
    methods: "GET, HEAD, POST, PUT, DELETE"
}));

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

passportConfig(app); // 패스포트 설정
app.use('/api', [flightsRouter]);
app.use("/auth", authRouter);

app.get('/', async(req, res) => {
    return res.sendFile(__dirname + '/index.html');
});


http.listen(3000, () => {
    console.log(3000, "번 포트에서 대기중");
});