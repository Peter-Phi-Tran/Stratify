import express from 'express';

const app = express();

app.get("/projects", (req, res) => {
    res.send("Hello World!");
});

app.listen(5000, () => {
    console.log("Server started at https://localhost:5000");
});

