"use server"

import { prisma } from "@/lib/db"
import { sendVerificationEmail } from "@/lib/mail"
import { getUserByEmail } from "@/lib/users"
import { generateVerificationToken, getVerificationTokenByToken } from "@/lib/verification_token"

export const verify_account = async (token:string) => { 
    try { 
        
        const tokenExists = await getVerificationTokenByToken(token)
        
        
        if (!tokenExists) { 
            return { 
                error : "No Token found"
            }
        }


        

        const hasExpired = new Date(tokenExists?.expires) < new Date()

        const user = await getUserByEmail(tokenExists.email)
        if (!user) { 
            return { 
                error : "User does not exist"
            }
        }

        if (hasExpired) { 
            
            await prisma.verificationToken.delete({ 
                where : { 
                    id : tokenExists.id
                }
            })

            const newToken = await generateVerificationToken(user.email!)
            sendVerificationEmail(newToken.email,newToken.token)
            
            return {
                error : "Token has expired . Generated a new one"
            }
        }

        await prisma.user.update({ 
            where : { 
                id : user.id
            }, 
            data : {
                emailVerified : new Date(), 
                email : user.email
            }
        })

        await prisma.verificationToken.delete({ 
            where : { 
                id : tokenExists.id
            }
        })


       
        return { 
            success : "Account Verified !"
        }
    } catch { 
        return { 
            error : "Something went wrong"
        }
    }
}