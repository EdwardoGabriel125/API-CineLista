import { body, validationResult } from 'express-validator' ;
import verificarErros from "../middlewares/validatorMiddleware.js";


export const regrasValidacaoCinema = [
    body('nomeFilme')
        .notEmpty().withMessage('Nome do filme deve ser preenchido')
        .isString().withMessage('Deve ser uma string'),
    body('lancamento')
        .notEmpty().withMessage('Deve conter a data de lançamento')
        .isInt().withMessage('Deve ser um número -- inteiro'),
    body('diretor')
        .notEmpty().withMessage('Nome do diretor deve ser preenchido')
        .isString().withMessage('Deve ser uma string'),
        
    verificarErros
]