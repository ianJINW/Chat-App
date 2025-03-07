import { verify } from "jsonwebtoken";
import { Server } from "socket.io";
import * as cookie from "cookie";

export const ioMiddleware = (io: Server) => {
	io.use((socket, next) => {
		const cookieHeader = socket.request.headers.cookie;

		if (!cookieHeader) {
			return next(new Error("Authentication error"));
		}

		const cookies = cookie.parse(cookieHeader);

		const token = cookies.auth_token;

		if (!token) {
			return next(new Error("Authentication error: no token"));
		}

		try {
			if (!process.env.JWT_SECRET) {
				return next(new Error("JWT secret is not defined"));
			}
			const user = verify(token, process.env.JWT_SECRET) as unknown as {
				userId: string;
			};
			socket.data.user = user;
			socket.data.userId = user.userId;
			next();
		} catch (error) {
			console.error(error);
			next(new Error("Authentication error"));
		}
	});
};
