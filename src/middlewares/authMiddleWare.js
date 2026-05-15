export function verificarAuth(req, res, next){
    if(!req.session.usuario){
        const err = new Error('Usuário não logado ou não registrado!');
        err.status = 401;
        return next(err);
    }
    next();
}