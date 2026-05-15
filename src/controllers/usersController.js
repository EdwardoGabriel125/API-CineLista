import db from "../config/db.js";
import * as userService from "../services/usersService.js";
import { loginAUserServc } from "../services/usersService.js";


// Pages:

export const loginPage = async(req, res, next) => {
    try {
        res.status(200).render("login.pug");
    } catch (err) {
        next(err);
    }
}

export const deletePage = async(req, res, next) => {
    try {
       res.status(200).render("deletarUser.pug");
    } catch (err) {
        next(err);
    }
}

export const logout = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return next(err);
        }
        res.clearCookie('connect.sid'); 

        res.redirect('/api/user/login'); 
    });
};

export const registerPage = async(req, res, next) => {
    try {
        res.status(200).render("register.pug");
    } catch (err) {
        next(err);
    }
}
// Logic: 

export const deleteAUser = async(req, res, next) => {
    try {

        const{nome, senha} = req.body;

        const bodyUser = {
            nome,
            senha
        }

        await userService.deleteAUserServc(bodyUser);

        res.redirect("/api/user/login");
    } catch (err) {
        next(err);
    }
}

export const createAUser = async(req, res, next) => {
    try {
        const{nome : nome, senha : senha} = req.body;

        const bodyUser = {
            nome : nome,
            senha : senha
        }

        const [createUserServer, createUser] = await userService.createAUserServc(bodyUser);

        if(createUser){
            req.session.usuario = {
                id : createUserServer.id,
                nome : createUserServer.nome
            }
        }

        res.status(201).redirect("/api/cinema/all");
    } catch (err) {
        next(err);
    }
}

export const loginAUser = async(req, res, next) => {
    try {
        const{nome : nome, senha : senha} = req.body;

        const bodyUser = {
            nome : nome,
            senha : senha
        }

        const [loginUserServer, loginUser] = await userService.loginAUserServc(bodyUser);
        
        if(loginUser){
            req.session.usuario = {
                id : loginUserServer.id,
                nome : loginUserServer.nome
            }
        }

        res.status(200).redirect("/api/cinema/all");
    } catch (err) {
        next(err);
    }
}