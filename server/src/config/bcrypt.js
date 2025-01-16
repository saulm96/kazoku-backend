import bcryptjs from "bcryptjs"

async function hashPassword(password){
    const hash = await bcryptjs.hash(password, 10);
    return hash;
}

async function verifyPassword(password, hash){
    const match = await bcryptjs.compare(password, hash);
    return match
}



export { hashPassword, verifyPassword }