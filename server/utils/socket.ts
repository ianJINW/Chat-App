import { Server } from "socket.io";
import prisma from "./prisma";

export const rooms = (io: Server) => {
	io.on("connection", (socket) => {
		console.log("Connected sucessfully");

		socket.on("joinRoom", async (roomName: string) => {
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
						userId: Number(room.id),
					},
				});
				io.to(roomName).emit(`${message}`);
			}
		});
	});
};

export default rooms;
