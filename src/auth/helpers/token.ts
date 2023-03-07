import {sign, verify } from 'jsonwebtoken';

function createToken(user){
  const payload = {
    id: user.id,
  }
  const token = sign(payload, process.env.SECRET_KEY);
  return token;
}

function verifyToken(token){
  let decoded = verify(token, process.env.SECRET_KEY);
  return decoded;
}

export {
  createToken,
  verifyToken
}
