import jwt from 'jsonwebtoken';

//assinatura do meu servidor, so o servidor tem essa chave
const secret_key = 'minha_chave_secreta';

//função para gerar o token
export function autenticarToken(req, res, next) {
    const cabecalho = req.headers['authorization'];

    //extrair o token, que por padrao vem no formato BEARER
    const token = cabecalho && cabecalho.split(' ')[1];

    //validação se o token esta autoriazado
    if (!token) {
        return res.status(401).json({ message: 'Token não fornecido' });
    }

    //caso o token seja valido, e se a assinatura for igual a secret_key
    jwt.verify(token, secret_key, (error, usuario) => {
        if (error) {
            return res.status(403).json({ message: 'Token inválido' });
        }
        req.usuario = usuario;
        next();
    });
}