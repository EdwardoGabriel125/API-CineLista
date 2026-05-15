import * as usersRepository from "../repositories/usersRepository.js";
import {formatResponse} from "../dtos/usersDto.js"

export const createAUserServc = async(bodyUser) => {
    const userExists = await usersRepository.ifUserExists(bodyUser);

    if(userExists){
        const err = new Error('Usuário já existe! Use outro nome.');
        err.status = 409;
        throw err;
    }
    
    const createdUser = await usersRepository.createAUserDb(bodyUser);

    if(!createdUser){
        const err = new Error('Erro, usuário não pôde ser criado');
        throw err;
    }

    return [createdUser, formatResponse(createdUser)];
}

export const loginAUserServc = async(bodyUser) => {
    const loggedAUser = await usersRepository.loginAUserDb(bodyUser);

    if(!loggedAUser){
        const err = new Error('Usuário não encontrado ou credenciais erradas.');
        err.status = 401;

        throw err;
    }

    return [loggedAUser ,formatResponse(loggedAUser)];
}

export const deleteAUserServc = async(bodyUser) => {

    const deleteAUser = await usersRepository.deleteAUserDb(bodyUser);

    if(!deleteAUser){
        const err = new Error('Credenciais inválidas ou usuário não encontrado.');
        err.status = 401;
        throw err;
    }

    return formatResponse(deleteAUser);
}