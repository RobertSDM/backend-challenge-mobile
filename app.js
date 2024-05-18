import express from "express";
import {
    authenticate,
    changePass,
    findAll,
    login,
    register,
} from "./controler";
const PORT = process.env?.PORT ?? 2121;
export const app = express();
app.use(express.json());

app.get("/find/all", async (req, res) => {
    return await findAll(req.body);
});

app.post("/auth/register", async (req, res) => {
    const created = await register(req.body);
    if (created) {
        return res.status(200);
    } else {
        return res.status(400);
    }
});
app.post("/auth/login", async (req, res) => {
    const logged = await login(req.body.login, req.body.password);

    if (logged) {
        return res.status(200);
    } else {
        return res.status(400);
    }
});

app.post("/auth/pass_forgot", (req, res) => {
    const changed = changePass(req.body.login, req.body.password);

    if (changed) {
        return res.status(200);
    } else {
        return res.status(400);
    }
});

app.get("/auth/is-authenticated", (req, res) => {
    return authenticate(req.body);
});

app.listen(PORT, () => {
    console.log("Server inicializado na porta:", PORT);
});
