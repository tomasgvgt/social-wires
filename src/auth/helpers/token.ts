import {sign, verify } from 'jsonwebtoken';

function createToken(user){
  const payload = {
    id: user.id,
  }
  const token = sign(payload, process.env.SECRET_KEY, { expiresIn: '1d' });
  return {
    access_token: token,
    id: user.id,
    expires_in: "1d",
    message: "Successfully logged in",
    status: true
  }
}

function verifyToken(token){
  let decoded = verify(token, process.env.SECRET_KEY);
  console.log(decoded);
  return decoded;
}

export {
  createToken,
  verifyToken
}
