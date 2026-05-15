export const formatResponse = (movie) => {
    return {
        nomeUser : movie.nomeUser,
        id: movie.id,
        nomeFilme: movie.nomeFilme,
        lancamento: movie.lancamento,
        genero: movie.genero,
        diretor: movie.diretor
    };
};