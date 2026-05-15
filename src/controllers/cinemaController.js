import db from "../config/db.js";
import * as cinemaService from "../services/cinemaService.js";
import session from "express-session";

// nome
// lancamento 
// genero 
// diretor

export const loggarFilmePagina = async(req, res, next) => {
    try {
        res.status(200).render("novo.pug");
    } catch (err) {
        next(err)
    }
}

export const editarFilmePagina = async(req, res, next) => { // GET em 'api/filme/modify/id:'
    try {
        const {id} = req.params;

        const filme = await cinemaService.getAMovieByIdServc(id);

        res.status(200).render(`editarFilme.pug`, {filme});
    } catch (err) {
        next(err);
    }
}

export const buscarFilmePagina = async(req, res, next) => {
    try {
        res.status(200).render(`buscarFilme.pug`);
    } catch (err) {
        next(err)
    }
}

export const cadastrarFilmePagina = async(req, res, next) => {
    try {
        res.status(200).render(`novo.pug`);
    } catch (err) {
        next(err)
    }
}

export const getAllMovies = async(req, res, next) => {
    try {
        const usuario = req.session?.usuario?.nome || "";
        const getAll = await cinemaService.getAllMoviesServc();

        res.status(200).render(`lista.pug`, {filmes : getAll, usuario});
    } catch (err) {
        next(err);
    }
}

export const getAMovie = async(req, res, next) => {
    try {
        const {buscarFilme} = req.query;

        console.log(buscarFilme);

        const termo = buscarFilme || "";

        const movie = await cinemaService.getAMovieServc(termo);

        console.log(`Olha o filme: ${movie}`);
        console.log(movie);

        res.status(200).render(`buscarFilme.pug`, {movie : [movie]});
    } catch (err) {
        next(err);
    }
}

export const postAMovie = async (req, res, next) => {
    try {

        const usuarioSessaoId = req.session.usuario.id;
        const usuarioSessaoNome = req.session.usuario.nome;

        const{nomeFilme: nomeFilme, lancamento : lancamento, diretor : diretor} = req.body;

        console.log(nomeFilme);


        const novoFilme = {
            idUser : usuarioSessaoId,
            nomeUser : usuarioSessaoNome, 
            nomeFilme,
            lancamento,
            diretor
        }

        console.log(novoFilme.nome);

        const novo = await cinemaService.postAMovieServc(novoFilme);

        res.status(201).redirect("/api/cinema/all");
    } catch (err) {
        next(err);
    }
}

export const putAMovie = async(req, res, next) => { // PUT em 'api/filme/modify/id:'
    try {

        const usuarioSessaoId = req.session.usuario.id;
        const usuarioSessaoNome = req.session.usuario.nome;

        const {id} = req.params;

        const{nomeFilme: nomeFilme, lancamento : lancamento, diretor : diretor} = req.body;

        const cinemaBody = {
            idUser : usuarioSessaoId,
            nomeUser : usuarioSessaoNome, 
            nome : nomeFilme,
            lancamento : lancamento,
            diretor : diretor,
        }

        const put = await cinemaService.putAMovieServc(cinemaBody, id);

        res.status(200).redirect(`/api/cinema/all`);
    } catch (err) {
        next(err);
    }
}

export const deleteAMovie = async(req, res, next) => {
    try {

        const usuarioSessaoId = req.session.usuario.id;
        const usuarioSessaoNome = req.session.usuario.nome;

        const{id} = req.params;


        const cinemaBodyUser = {
            idUser : usuarioSessaoId,
            nomeUser : usuarioSessaoNome
        }

        const deleteMovie = await cinemaService.deleteAMovieServc(cinemaBodyUser, id);

        res.status(204).redirect("/api/cinema/all");
    } catch (err) {
        next(err);
    }
}