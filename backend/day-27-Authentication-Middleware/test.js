import argon2  from "argon2";


const password = "Helloworld";

const hashedPassword = await argon2.hash(password,{
                type: argon2.argon2id,
                memoryCost:2**16,
                timeCost:3,
                parallelism:4
            });
const isValid = await argon2.verify(hashedPassword,password);
console.log(isValid);