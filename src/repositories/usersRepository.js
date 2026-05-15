import { body } from "express-validator";
import db from "../config/db.js";

export const createAUserDb = async(bodyUser) => {
    await db.read();
    
    const novoUser = {
        id: Date.now().toString(),
        nome : bodyUser.nome,
        senha : bodyUser.senha
    }

    db.data.users.push(novoUser);
    await db.write();

    return novoUser;
}

export const loginAUserDb = async(bodyUser) => {
    await db.read();

    const userLoggado = db.data.users.find(user => user.nome === bodyUser.nome && user.senha === bodyUser.senha);

    return userLoggado;
}

export const ifUserExists = async(bodyUser) => {
    await db.read();

    const username = db.data.users.find(user => user.nome === bodyUser.nome)

    return username;
}

export const deleteAUserDb = async(bodyUser) => {
    await db.read();

    const userIndex = db.data.users.findIndex(user => user.nome === bodyUser.nome && user.senha === bodyUser.senha);

    if (userIndex === -1){
        return null;
    }; 

    const [userRemovido] = db.data.users.splice(userIndex, 1);

    const movies = db.data.movies.filter(ms => ms.nomeUser === userRemovido.nome);

    movies.forEach(m => {
        const index = db.data.movies.findIndex(movie => movie.id === m.id);
        db.data.movies.splice(index, 1);
    });

    await db.write();

    return userRemovido;
}