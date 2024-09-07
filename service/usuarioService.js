import {
    findAllTreeUsuarioEmail,
    removeAcccount,
} from "../repository/index.js";

export const usuarioService = async (email) => {
    const usuario = await findAllTreeUsuarioEmail(email);

    if (usuario) {
        const res = await removeAcccount(usuario);

        if (res) {
            return true;
        }

        return false;
    } else {
        return false;
    }
};
