import express from "express";
import {
    changePass,
    findAll,
    isAuthenticated,
    login,
    register,
} from "./controler/index.js";

const PORT = process.env?.PORT ?? 2121;
export const app = express();
app.use(express.json());

app.get("/find/all", async (req, res) => {
    const users = await findAll(req.body);
    return res.send(users);
});

app.post("/auth/register", async (req, res) => {
    const created = await register(req.body);
    if (created) {
        return res.sendStatus(200);
    } else {
        return res.sendStatus(400);
    }
});
app.post("/auth/login", async (req, res) => {
    const logged = await login(req.body.login, req.body.senha);

    if (logged) {
        return res.sendStatus(200);
    } else {
        return res.sendStatus(400);
    }
});

app.post("/auth/pass_forgot", async (req, res) => {
    const changed = await changePass(req.body.login, req.body.senha);

    if (changed) {
        return res.sendStatus(200);
    } else {
        return res.sendStatus(400);
    }
});

app.get("/auth/is-authenticated", async (req, res) => {
    const isAuth = await isAuthenticated(req.body);

    if (isAuth === null) {
        return res.sendStatus(404);
    } else if (!isAuth) {
        return res.sendStatus(400);
    } else {
        return res.sendStatus(200);
    }
});

app.listen(PORT, () => {
    console.log("Server inicializado na porta:", PORT);
});
