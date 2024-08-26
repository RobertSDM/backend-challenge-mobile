const gerarMediaNavegacao = () => {
    return Math.floor(Math.random() * 20);
};

const gerarCliques = () => {
    return Math.floor(Math.random() * (4000 - 1000) + 1000);
};

const gerarTaxaRedirecionamento = () => {
    return Math.floor(Math.random() * (90 - 20) + 20);
};

export default () => {
    const media_navegacao = gerarMediaNavegacao();
    const cliques = gerarCliques();
    const taxa_redirecionamento = gerarTaxaRedirecionamento();

    return {
        media_navegacao,
        cliques,
        taxa_redirecionamento,
    };
};
