import db from "../config/db.js";

export const postAMovieDb = async (cinemaBody)=> {

    const filmes = db.data.movies;
    const novoId = filmes.length > 0 ? filmes[filmes.length - 1].id + 1 : 1;

    await db.read();
    const novoMovie = {
        idUser : cinemaBody.idUser,
        nomeUser : cinemaBody.nomeUser,
        id : novoId,
        nomeFilme : cinemaBody.nomeFilme,
        lancamento : cinemaBody.lancamento,
        genero : cinemaBody.genero,
        diretor : cinemaBody.diretor
    }
    db.data.movies.push(novoMovie);
    const moviePostado = db.data.movies[db.data.movies.length - 1];
    await db.write();
    return moviePostado;
}

export const getAllMoviesDb = async () => {
    await db.read();
    return db.data.movies;
}

export const getAMovieDb = async (termoBusca) => {
    await db.read();
    const movie = db.data.movies.find(m => m.nomeFilme.toLowerCase().includes(termoBusca.toLowerCase()));
    return movie;
}

export const getAMovieByIdDb = async(id) => {
    await db.read();
    return db.data.movies.find(m => m.id === Number(id));
}

export const putAMovieDb = async (cinemaBody, id) => {
    await db.read();

    const idUser = cinemaBody.idUser;
    const username = cinemaBody.nomeUser;

    const movieUnique = db.data.movies.find(m => m.id === Number(id));

    movieUnique.nomeFilme = cinemaBody.nome;
    movieUnique.lancamento = cinemaBody.lancamento;
    movieUnique.diretor = cinemaBody.diretor;

    await db.write();
    return movieUnique;
}
// No seu cinemaRepository.js

export const checkByIdDb = async (id) => {
    await db.read(); 
    
    const movie = db.data.movies.find(m => m.id === Number(id));

    return movie;
}

export const deleteAMovieDb = async(id) => {
    await db.read();

    const movieIndex = db.data.movies.findIndex(m => m.id === Number(id));

    if (movieIndex === -1){
        return null;
    }; 

    const [filmeRemovido] = db.data.movies.splice(movieIndex, 1);

    await db.write();

    return filmeRemovido;
}