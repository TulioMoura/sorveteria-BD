

async function errorHandlerMiddleware(err, req, res, next){
        if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
            console.error(err);
            return res.status(400).send({ status: 404, message: "JSON Inválido enviado" }); // Bad request
        }
        next(); 
}

module.exports =  errorHandlerMiddleware;