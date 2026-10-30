const http = require("http");

let expenses = [];

const server = http.createServer((req, res) => {

    if (req.url === "/expenses" && req.method === "GET") {
        res.writeHead(200, {
            "Content-Type": "application/json"
        });
        res.end(JSON.stringify(expenses));
    }

    else if (req.url === "/expenses" && req.method === "POST") {

        let body = "";

        req.on("data", chunk => {
            body += chunk.toString();
        });

        req.on("end", () => {
            const expense = JSON.parse(body);

            expenses.push({
                id: Date.now(),
                title: expense.title,
                amount: expense.amount,
                category: expense.category
            });

            res.writeHead(201, {
                "Content-Type": "application/json"
            });

            res.end(JSON.stringify({
                message: "Expense Added Successfully"
            }));
        });
    }

    else {
        res.writeHead(404, {
            "Content-Type": "text/plain"
        });

        res.end("Page Not Found");
    }
});

server.listen(5000, () => {
    console.log("Server running on port 5000");
});