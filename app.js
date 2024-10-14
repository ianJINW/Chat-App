const express = require("express");
const path = require("path");
const http = require("http");
const socketIo = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
	res.render("index");
});

server.listen(3000, () => {
	console.log(`Connected on port 3000`);
});

io.on("connection", socket => {
	socket.emit("message", { message: "Welcome to Real Time Chat By Josh" });

	socket.on("send", data => {
		io.emit("message", data);
	});

	socket.on("disconnect", () => {
		console.log(`Client disconnected`);
	});

	console.log(`Connected successfully`);
});
