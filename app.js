import express from "express";
import { changePass, login, register, findByEmail } from "./routes/index.js";

const PORT = process.env?.PORT ?? 2121;

export const app = express();

app.use(express.json());

// app.get("/find/all", async (req, res) => {
//     const users = await findAll(req.body);
//     return res.send(users);
// });

app.get("/find/by/email/:email", async (req, res) => {
    const user = await findByEmail(req.params.email);
    return res.status(!!user ? 200 : 404).send(user);
});

app.post("/auth/register", async (req, res) => {
    const created = await register(
        req.body.email,
        req.body.senha,
        req.body.nome
    );
    if (created) {
        return res.sendStatus(200);
    } else {
        return res.sendStatus(400);
    }
});
app.post("/auth/login", async (req, res) => {
    const logged = await login(req.body.email, req.body.senha);

    if (logged) {
        return res.sendStatus(200);
    } else {
        return res.sendStatus(400);
    }
});

app.put("/auth/pass_forgot", async (req, res) => {
    const changed = await changePass(req.body.email, req.body.novaSenha);

    if (changed) {
        return res.sendStatus(200);
    } else {
        return res.sendStatus(400);
    }
});

// app.get("/auth/is-authenticated", async (req, res) => {
//     const isAuth = await isAuthenticated(req.body);

//     if (isAuth === null) {
//         return res.sendStatus(404);
//     } else if (!isAuth) {
//         return res.sendStatus(400);
//     } else {
//         return res.sendStatus(200);
//     }
// });

app.listen(PORT, () => {
    console.log("Server inicializado na porta:", PORT);
});
