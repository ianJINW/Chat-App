import { Server } from "socket.io";
import prisma from "./prisma";

export const sockets = (io: Server) => {
	io.on("connection", async (socket) => {
		const userId = socket.data.user?.id;
		console.log(`User ${userId} connected with socket id ${socket.id}`);

		try {
			const messages = await prisma.message.findMany({
				orderBy: { createdAt: "asc" },
				take: 50,
			});

			socket.emit("chat-history", messages);
		} catch (error) {
			console.error(`Error retrieving messages for user ${userId} - ${error}`);
		}

		socket.on("chat-message", async (msg: string) => {
			if (typeof msg !== "string" || msg.trim() === "") return;
			console.log(`Message from ${socket.data.user.userId}: ${msg}`);

			try {
				const messages = await prisma.message.create({
					data: {
						content: msg,
						user: { connect: { id: Number(userId) } },
						...(socket.data.room && {
							room: { connect: { id: socket.data.room.id } },
						}),
					},
				});

				console.log("message: " + msg);

				io.emit("chat-message", {
					userId,
					message: msg,
					createdAt: messages.createdAt,
				});
				console.log(`Emitted chat message: ${msg}`);
			} catch (error) {
				console.error(
					`Error saving message for user ${socket.data.userId} - ${error}`
				);
			}
		});

		socket.on("joinRoom", async (roomName: string) => {
			try {
				const room = await prisma.room.findUnique({
					where: { name: roomName },
					include: { users: true },
				});

				if (room) {
					socket.join(roomName);
					io.to(roomName).emit(`User ${socket.id} has joined`);
				} else {
					socket.emit("Room does not exist");
				}
			} catch (err) {
				console.error(err);
				socket.emit("Error joining room", err);
			}
		});

		socket.on("sendMessage", async (roomName: string, content: string) => {
			const room = await prisma.room.findUnique({
				where: { name: roomName },
			});

			if (room) {
				const message = await prisma.message.create({
					data: {
						content,
						roomId: Number(room.id),
						userId: Number(socket.data.user.id),
					},
				});
				io.to(roomName).emit(`${message}`);
			}
		});
	});
};

export default sockets;
