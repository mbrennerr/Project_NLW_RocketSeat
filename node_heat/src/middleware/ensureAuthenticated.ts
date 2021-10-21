import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

interface IPayload {
  sub: string
}


export function ensureAuthenticated(request: Request, response: Response, next: NextFunction) {
  const authToken = request.headers.authorization;

  if (!authToken) {
    return response.status(401).json({ 
      errorCode: "token.invalid",
  
    })
  }


  // QUANDO RECEBER O TOKEN DENTRO DO HEADERS ELE VEM DESSA FORMA Bearer 897a89sd7a897sd89a7s9d8a7sd9 FAZEMOS UMA DESESTRUTURAÇÃO PARA USAR APENAS A PARTE QUE IMPORTA, NESSE CASO O 897a89sd7a897sd89a7s9d8a7sd9
  // [0] Bearer
  // [1] 897a89sd7a897sd89a7s9d8a7sd9
  // A PARTE [0] É IGNORADA COLOCANDO UMA VÍRGULA, E A SEGUNDA [1] É COLOCADA DENTRO DE UMA VARÍAVEL NESSE CASO token;
  const [,token ] = authToken.split(" ")

  try{
    const { sub } = verify(token, process.env.JWT_SECRET) as IPayload

    request.user_id = sub

    return next();
  } catch(err) {
    return response.status(401).json({ errorCode: "token.expired"})
  }

}