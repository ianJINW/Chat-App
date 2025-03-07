import React, { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

const Chat = () => {
	const [message, setMessage] = useState("");
	const [chatMessages, setChatMessages] = useState<
		Array<{ userId: string; message: string }>
	>([]);
	const [socket, setSocket] = useState<Socket | null>(null);

	console.log("Chat component rendered", chatMessages);

	useEffect(() => {
		const newSocket = io("http://localhost:3000", {
			withCredentials: true,
		});
		setSocket(newSocket);

		newSocket.on("connect", () => {
			console.log("connected");
		});

		newSocket.on(
			"chat-message",
			(data: { userId: string; message: string }) => {
				console.log("Received chat message:", data);
				setChatMessages((prevMessages) => [...prevMessages, data]);
			}
		);

		newSocket.on("connect_error", (error) => {
			console.error("Connection error:", error);
		});

		newSocket.on("disconnect", (reason) => {
			console.log("Disconnected:", reason);
		});

		return () => {
			console.log("Disconnecting socket");
			newSocket.disconnect();
		};
	}, []);

	const sendMessage = (e: React.FormEvent) => {
		e.preventDefault();
		console.log("Form submitted"); // Debugging form submission
		if (message.trim() !== "" && socket && socket.connected) {
			console.log("Sending message:", message); // Debugging message sending
			socket.emit("chat message", message);
			setMessage("");
		}
	};

	return (
		<main>
			<div className="flex flex-col h-screen">
				<div className="flex-1 p-2 overflow-y-auto text-black">
					{chatMessages.map((chatMessage, index) => (
						<div key={index} className="mb-2">
							<span className="font-bold">{chatMessage.userId}: </span>
							<span>{chatMessage.message}</span>
						</div>
					))}
				</div>
				<form
					onSubmit={sendMessage}
					className="flex p-4 border-t border-gray-200"
				>
					<input
						type="text"
						value={message}
						onChange={(e) => setMessage(e.target.value)}
						className="flex-1 p-2 border border-gray-300 rounded mr-2 text-black"
						placeholder="Type your message..."
					/>
					<button
						type="submit"
						className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
					>
						Send
					</button>
				</form>
			</div>
		</main>
	);
};

export default Chat;
