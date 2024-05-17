import express from "express";
import { randomUUID } from "crypto";
import { loadData, saveData } from "./controler/database_methods.js";

const PORT = process.env?.PORT ?? 4500;
const app = express();
app.use(express.json());
app.use(express.static("public"))

const DATABASE = loadData();

app.get("/find/all", (req, res) => {
    return res.send(DATABASE);
});

app.post("/auth/register", (req, res) => {
    for (let i of Object.keys(DATABASE)) {
        if (DATABASE[i].login === req.body.login) {
          return res.status(403).send("user already exist")
        }
    }
    DATABASE[randomUUID()] = req.body;
    saveData(DATABASE);

    return res.sendStatus(200);
});

app.post("/auth/login", (req, res) => {
    for (let i of Object.keys(DATABASE)) {
        if (DATABASE[i].login === req.body.login) {
            if (DATABASE[i].password === req.body.password) {
                return res.sendStatus(200);
            } else {
                return res.sendStatus(404);
            }
        }
    }
    return res.sendStatus(404);
});
app.post("/auth/pass_forgot", (req, res) => {
    for (i of Object.keys(DATABASE)) {
        if (DATABASE[i].login === req.body.login) {
            DATABASE[i].password === req.body.password;
            saveData(DATABASE);
            return res.sendStatus(200);
        }
    }
    return res.sendStatus(404);
});

// app.listen(PORT, () => {
//     console.log("Server inicializado na porta:", PORT);
// });
