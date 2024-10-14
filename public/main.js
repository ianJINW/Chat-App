const input = document.querySelector("#messageInput");
const sendButton = document.querySelector("#sendButton");
const messages = document.querySelector("#messages");
var socket = io();

socket.on("message", data => {
	const li = document.createElement("li");
	li.textContent = data.message;
	messages.appendChild(li);
});

sendButton.addEventListener("click", () => {
	let inputText = input.value;
	if (inputText) {
		socket.emit("send", {
			message: inputText
		});
		input.value = "";
	}
});
