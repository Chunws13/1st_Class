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

app.use(cors({
    origin: "*",
    methods: "GET, HEAD, POST, PUT, DELETE"
}));

// socket
let total_user = 0;
io.on("connection", (socket) => {
    total_user += 1;
    io.emit("totalUser", total_user); // 전체 유저 수 전달

    socket.emit("userId", socket.id); // 유저 ID 전달
    socket.broadcast.emit("enterance", `${socket.id}님이 입장했습니다.`); // 입장 알림

    socket.on("sendMsg", (message) => { // 클라이언트로부터 메세지 수신
        io.emit("emitMsg", { sender: socket.id, message }); // 다른 클라이언트에게 메세지 전송
    });

    socket.on("disconnect", () => {
        socket.broadcast.emit(`${socket.id}님이 연결을 종료했습니다.`);
        total_user -= 1;
        io.emit("totalUser", total_user); // 전체 유저 수 전달
    });
});

// 

// routes
const authRouter = require("./routes/authRouter");
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
passportConfig(app); // 패스포트 설정
app.use('/api', [flightsRouter]);
app.use("/auth", authRouter);

app.get('/', async(req, res) => {
    return res.sendFile(__dirname + '/index.html');
});

http.listen(3000, () => {
    console.log(3000, "번 포트에서 대기중");
});