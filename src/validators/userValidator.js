import { body, validationResult } from 'express-validator' ;
import verificarErros from "../middlewares/validatorMiddleware.js";
// nome: fulano 
// senha : 1234oi
export const regrasValidacaoUser = [
    body("nome")
        .trim()
        .notEmpty().withMessage(`Nome tem de ser preenchido`),
    body("senha")
        .trim()
        .isLength({min : 4}).withMessage('A senha deve ter no mínimo 4 caracteres')
        .notEmpty().withMessage('Senha tem de ser preenchida'),

    verificarErros
]