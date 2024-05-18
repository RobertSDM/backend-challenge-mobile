import { PrismaClient } from "@prisma/client";

const authenticated = {};

let prisma = new PrismaClient();

const findAll = async () => {
    try {
        const res = await prisma.user.findMany();
        return res;
    } catch (err) {
        console.log(err);
        return []
    }
};

const findByLogin = async (login) => {
    try {
        const res = await prisma.user.findFirst({
            where: {
                login,
            },
        });
        return res;
    } catch (err) {
        console.log(err);
        return false;
    }
};

const register = async (user) => {
    try {
        const exists = await findByLogin(user.login);

        if (!exists) {
            const res = await prisma.user.create({
                data: { ...user },
            });

            authenticate(user);
            return true;
        } else {
            return false;
        }
    } catch (err) {
        console.log(err);
        return false;
    }
};

const login = async (login, pass) => {
    try {
        const user = await findByLogin(login);
        if (!user || user.senha !== pass) {
            return false;
        }

        authenticate(user);
        return true;
    } catch (err) {
        console.log(err);
    }
};

const changePass = async (login, newPass) => {
    try {
        const user = await findByLogin(login);
        if (!user || user.senha !== pass) {
            return false;
        }

        await prisma.user.update({
            data: {
                senha: newPass,
            },
            where: {
                login,
            },
        });

        return true;
    } catch (err) {
        console.log(err);
        return false;
    }
};

const isAuthenticated = (user) => {
    if (authenticated[user.login]) {
        return true;
    } else {
        return false;
    }
};

const authenticate = (user) => {
    if (!isAuthenticated(user)) {
        authenticated[user.login] = user;
        return true;
    } else {
        return false;
    }
};

export { findAll, register, login, changePass, authenticate, isAuthenticated };
