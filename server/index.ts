import express from "express";
import path from "path";
import { createServer } from "http";
import cors from "cors";
import userRoutes from "./routers/userRoutes";
import { login } from "./controllers/userController";

const app = express();

app.use(
	cors({
		origin: process.env.FRONTEND_URL,
		credentials: true,
	})
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const server = createServer(app);

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
	res.render("index");
});

app.use("/api", userRoutes);
app.use("/login", login);

server.listen(3000, () => {
	console.log(`Connected on port 3000`);
});
