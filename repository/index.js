import { PrismaClient } from "@prisma/client";
import gerarDadosQuandoRegistrar from "../utils/gerarDadosQuandoRegistrar.js";

// const authenticated = {};

let prisma = new PrismaClient();

const findAllTreeUsuarioEmail = async (email) => {
    try {
        const usuario = prisma.usuario.findFirst({
            where: {
                email: email,
            },
            include: {
                empresa: {
                    include: {
                        analise_mercado: {
                            include: {
                                cliques: true,
                            },
                        },
                    },
                },
            },
        });

        if (usuario) {
            return usuario;
        }
        return false;
    } catch (err) {
        console.log(err);
        return false;
    }
};

const findByEmail = async (email) => {
    try {
        const res = await prisma.usuario.findFirst({
            where: {
                email: email,
            },
            include: {
                empresa: {
                    include: {
                        analise_mercado: {
                            include: {
                                cliques: true,
                            },
                        },
                    },
                },
            },
        });

        if (res) {
            return res;
        } else {
            return false;
        }
    } catch (err) {
        console.log(err);
        return false;
    }
};

const register = async (email, senha, nome) => {
    try {
        const exists = await findByEmail(email);

        if (!exists) {
            const { cliques, media_navegacao, taxa_redirecionamento } =
                gerarDadosQuandoRegistrar();

            const res = await prisma.usuario.create({
                data: {
                    email: email,
                    senha: senha,
                    nome: nome,
                    empresa: {
                        create: {
                            analise_mercado: {
                                create: {
                                    media_navegacao: media_navegacao,
                                    taxa_redirecionamento:
                                        taxa_redirecionamento,
                                    cliques: {
                                        createMany: {
                                            data: [
                                                {
                                                    cliques: cliques,
                                                },
                                            ],
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
            });

            // await authenticate();
            return true;
        } else {
            return false;
        }
    } catch (err) {
        console.log(err);
        return false;
    }
};

const removeAcccount = async (usuario) => {
    try {
        await prisma.cliques.deleteMany({
            where: {
                analise_mercado_id: usuario.empresa.analise_mercado.id,
            },
        });

        console.log("Delete cliques");

        await prisma.analise_mercado.delete({
            where: {
                id: usuario.empresa.analise_mercado.id,
            },
        });

        console.log("Delete analise_mercado");

        await prisma.empresa.delete({
            where: {
                id: usuario.empresa.id,
            },
        });

        console.log("Delete empresa");

        await prisma.usuario.delete({
            where: {
                id: usuario.id,
            },
        });

        console.log("Delete usuario");

        return true;
    } catch (err) {
        console.log(err);
        return false;
    }
};

const login = async (email, pass) => {
    try {
        const usuario = await findByEmail(email);

        if (!usuario || usuario.senha !== pass) {
            return false;
        }

        // await authenticate(usuario);
        return true;
    } catch (err) {
        console.log(err);
    }
};

const changePass = async (email, newPass) => {
    try {
        const usuario = await findByEmail(email);

        if (!usuario) {
            return false;
        }

        await prisma.usuario.update({
            data: {
                senha: newPass,
            },
            where: {
                email,
            },
        });

        return true;
    } catch (err) {
        console.log(err);
        return false;
    }
};

// const isAuthenticated = async (usuario) => {
//     const usuarioEncontrado = await findByEmail(usuario.login);

//     if (!usuarioEncontrado) {
//         return null;
//     }

//     if (authenticated[usuario.email]) {
//         return true;
//     } else {
//         return false;
//     }
// };

// const authenticate = async (user) => {
//      const isAuth = await isAuthenticated(user);

//     if (!isAuth) {
//         authenticated[user.login] = user;
//         return true;
//     } else {
//         return false;
//     }
// };

export {
    register,
    login,
    changePass,
    findByEmail,
    removeAcccount,
    findAllTreeUsuarioEmail,
};
