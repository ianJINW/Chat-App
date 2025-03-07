import express from "express";
import path from "path";
import { createServer } from "http";
import cors from "cors";
import userRoutes from "./routers/userRoutes";
import { createUser, login } from "./controllers/userController";
import { Server } from "socket.io";
import { ioMiddleware } from "./middleware/socket";
import sockets from "./utils/socket";

const app = express();
const frontend = process.env.FRONTEND_URL as string;

app.use(
	cors({
		origin: frontend,
		methods: ["GET", "POST", "PUT", "DELETE"],
		credentials: true,
	})
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
console.log(frontend);

const server = createServer(app);
const io = new Server(server, {
	cors: {
		origin: frontend,
		methods: ["GET", "POST", "PUT", "DELETE"],
		credentials: true,
	},
});

ioMiddleware(io);
sockets(io);

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
	res.render("index");
});

app.use("/api/users", userRoutes);
app.use("/login", login);
app.use("/register", createUser);

server.listen(3000, () => {
	console.log(`Connected on port 3000`);
});
