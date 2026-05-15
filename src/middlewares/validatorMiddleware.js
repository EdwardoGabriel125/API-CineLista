import { validationResult } from 'express-validator';
export const verificarErros = (req, res, next) => {
    const erros = validationResult(req);
    if (!erros.isEmpty()) {
        const err = new Error(erros.array()[0].msg);
        err.status = 400;
        return next(err);
    }
    next();
};

export default verificarErros;