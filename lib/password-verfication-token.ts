
import { prisma } from "./db"
import crypto from "crypto"


export const getPasswordTokenByEmail = async(email:string) => { 
    try { 
        const passwordToken = await prisma.passwordVerificationToken.findUnique({
            where : {
                email
            }
        })

        return passwordToken
    } catch  { 
        return null
    }
}


export const generatePasswordVerificationToken = async (email : string) =>  { 
    

    const expires = new Date(new Date().getTime() + 3600 * 10000)
    const existingToken = await getPasswordTokenByEmail(email) 
    const code = crypto.randomInt(100_000,1_000_000 ).toString()


    if (existingToken) { 
        await prisma.passwordVerificationToken.delete({
            where :{ 
                id : existingToken.id
            }, 

        } )
    }
    
    const passwordVerificationToken = await prisma.passwordVerificationToken.create({ 
        data : { 
            email , 
            code : code,
            expires
        }
    })

    return passwordVerificationToken
    
}



