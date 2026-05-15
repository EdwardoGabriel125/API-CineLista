function errorMiddleware(err, req, res, next){
    const status = err.status || 500;
    const mensagem = err.message || "Erro interno do servidor";
    res.status(status).render('erro', {
        titulo: `Erro ${status}`,
        status: status,
        mensagem: err.message
    });
}

export default errorMiddleware