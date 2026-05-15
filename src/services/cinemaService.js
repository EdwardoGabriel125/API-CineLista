import * as cinemaRepository from "../repositories/cinemaRepository.js";
import {formatResponse} from "../dtos/cinemaDto.js"
// nome 
// lancamento
//genero
// diretor
export const getAllMoviesServc = async() =>{
    const moviesBrutos = await cinemaRepository.getAllMoviesDb();

    if(!moviesBrutos){
        const err = new Error("Filmes não encontrados");
        err.status = 404;
        throw err;
    }

    return moviesBrutos.map( movie => formatResponse(movie));
}

export const postAMovieServc = async(novoFilme) => {
    if(novoFilme.lancamento < 1895){
        const err = new Error("O filme não pode existir antes de 1895.");
        err.status = 400;
        throw err;
    }
    const moviePostado = await cinemaRepository.postAMovieDb(novoFilme);

    if(!moviePostado){
        const err = new Error("Má requisição, algo deu errado.");
        err.status = 400;
        throw err;
    }

    return formatResponse(moviePostado);
}

export const getAMovieServc = async(buscarFilme) => {
    const aMovie = await cinemaRepository.getAMovieDb(buscarFilme);
    
    if(!aMovie){
        const err = new Error("Filme não encontrado");
        err.status = 404;
        throw err;
    }

    return formatResponse(aMovie);
}

export const getAMovieByIdServc = async(id) => {
    const aMovie = await cinemaRepository.getAMovieByIdDb(id);

    if(!aMovie){
        const err = new Error("Filme não encontrado");
        err.status = 404;
        throw err;
    }

    return formatResponse(aMovie);
}

export const putAMovieServc = async(cinemaBody, id) => {


    if(cinemaBody.lancamento < 1895){
        const err = new Error("O filme não pode existir antes de 1895.");
        err.status = 400;
        throw err;
    }

    const movieCheck = await cinemaRepository.checkByIdDb(id);

    if(!movieCheck){
        const err = new Error('Filme não encontrado.')
        err.status = 404;
        throw err;
    }

    if(movieCheck.idUser != cinemaBody.idUser){
        const err = new Error('Não pode alterar o log de outro usuário!');
        err.status = 403
        throw err;
    }

    const moviePut = await cinemaRepository.putAMovieDb(cinemaBody, id);

    if(!moviePut){
        const err = new Error("Má requisição");
        err.status = 400;
        throw err // checar como usar aquele midleware de validacao de pet aqui!
    }

    return formatResponse(moviePut);
}



export const deleteAMovieServc = async(cinemaBodyUser, id) => {
    const movieCheck = await cinemaRepository.checkByIdDb(id);

    if(!movieCheck){
        const err = new Error('Filme não encontrado.')
        err.status = 404;
        throw err;
    }

    if(movieCheck.idUser != cinemaBodyUser.idUser){
        const err = new Error('Não pode alterar o log de outro usuário!');
        err.status = 403
        throw err;
    }

    const deleteAMovie = await cinemaRepository.deleteAMovieDb(id);

    if(!deleteAMovie){
        const err = new Error("Filme não encontrado.");
        err.status = 400;
        throw err;
    }

    return formatResponse(deleteAMovie)
}