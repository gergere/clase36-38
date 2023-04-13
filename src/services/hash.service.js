import { hash, compare } from 'bcrypt';

export const crypt = async (pass) => {
    return await hash(pass, 8);
}

export const verify = async (pass, hashPass) => {
    return await compare(pass, hashPass);
}