import express from "express";
import { randomUUID } from "crypto";
import { loadData, saveData } from "./controler/database_methods.js";

const PORT = process.env?.PORT ?? 4500;
const app = express();
app.use(express.json());

const DATABASE = loadData();

app.post("/auth/register", (req, res) => {
  DATABASE[randomUUID()] = req.body;
  saveData(DATABASE);

  res.sendStatus(200);
});

app.post("/auth/login", (req, res) => {
  for (let i of Object.keys(DATABASE)) {
    if (DATABASE[i].login === req.body.login) {
      if (DATABASE[i].password === req.body.password) {
        res.sendStatus(200);
      } else {
        res.sendStatus(404);
      }
    }
  }
  res.sendStatus(404);
});
app.post("/auth/pass_forgot", (req, res) => {
  for (i of Object.keys(DATABASE)) {
    if (DATABASE[i].login === req.body.login) {
      DATABASE[i].password === req.body.password;
      saveData(DATABASE);
      res.sendStatus(200);
    }
  }
  res.sendStatus(404);
});

app.listen(PORT, () => {
  console.log("Server inicializado na porta:", PORT);
});
