Bun.serve({
	port: 8080,
	fetch(req, server) {
		//  check if the connection is a websocket connection or not
		if (server.upgrade(req)) {
			return;
		}

		const url = new URL(req.url);

		if (url.pathname === "/") {
			return new Response(Bun.file("./client/index.html"), {
				headers: { "Content-Type": "text/html" },
			});
		}

		return new Response("WebSocker server is running!", { status: 200 });
	},
	websocket: {
		open(ws) {
			console.log("Client connected");
			ws.send("Welcome to the WebSocket server");
		},
		message(ws, message) {
			console.log("Received message: ", message);
			ws.send(`Received message ${message}`);
		},
		close(ws, code, reason) {
			console.log("Client disconnected", code, reason);
		},
	},
});
