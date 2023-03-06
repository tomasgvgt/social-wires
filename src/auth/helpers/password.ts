import * as bcrypt from 'bcrypt';

async function hashPassword(password){
    const rounds = 10;
    const hashed = await bcrypt.hash(password, rounds);
    return hashed;
}

async function verifyPassword(password, hash){
    const isEqual = await bcrypt.compare(password, hash);
    return isEqual;
}

export {
    hashPassword,
    verifyPassword
}