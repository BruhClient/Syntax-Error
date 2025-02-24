"use server"

import { prisma } from "@/lib/db"

import { getPasswordTokenByEmail } from "@/lib/password-verfication-token"

export const verifyPasswordResetEmail = async (email : string,code : string) => { 
    try { 
        

        
        const passwordToken = await getPasswordTokenByEmail(email)

        
        if (!passwordToken) { 
            return {
                error : "Password token does not exist"
            }
        }

        if (passwordToken.code !== code) { 
            return { 
                error : "Your OTP is wrong . Please try again"
            }
        }

        
        await prisma.passwordVerificationToken.delete({ 
            where :{ 
                email : email
            }
        })
      
        return {
            success : "Account Verified !"
        }  
    } catch  { 
        return {
            error : "Something went wrong"
        }
    }
}