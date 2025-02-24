"use server"

import { sendPasswordVerificationEmail } from "@/lib/mail"
import { generatePasswordVerificationToken } from "@/lib/password-verfication-token"
import { getUserByEmail } from "@/lib/users"

export const sendPasswordResetEmail = async (email : string) => { 
    try { 
        const accountExists = await getUserByEmail(email)

        if (!accountExists) { 
            return {
                error : "No account exists with this email"
            }
        }
        const passwordToken = await generatePasswordVerificationToken(email)
        await sendPasswordVerificationEmail(passwordToken.email,passwordToken.code)
      
        return {
            success : "Password reset email sent"
        }  
    } catch  { 
        return {
            error : "Something went wrong"
        }
    }
}