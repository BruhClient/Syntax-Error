"use server"

import { SignInPayload, SignInSchema } from "@/schema/SignInSchema"
import { z } from "zod"
import { signIn } from "@/lib/auth"
import { AuthError } from "next-auth"
import { getUserByEmail } from "@/lib/users"
import { generateVerificationToken, getVerificationTokenByEmail } from "@/lib/verification_token"
import { prisma } from "@/lib/db"
import { sendVerificationEmail } from "@/lib/mail"

export const login = async (values : SignInPayload) => { 
    try { 
        const { email, password } = SignInSchema.parse(values)

        const user = await getUserByEmail(email)

        

        if (!user) { 
            return {
                error : "User does not exist"
            }
        }


        if (!user.emailVerified) { 
            const token = await getVerificationTokenByEmail(user.email!)
            if (token) {

             
                await prisma.verificationToken.delete({ 
                    where : { 
                        id : token.id
                    }
                })
            }
            
            const newToken = await generateVerificationToken(user.email!)

           
            await sendVerificationEmail(newToken.email,newToken.token)
            
            return { 
                error: "Sending out new verification email..."
            }
        }





        await signIn("credentials",{
            email ,
            password, 
         
            redirect : false
        })

        return { 
            success : "Logged in successfully"
        }
    } catch (error) { 
        if (error instanceof z.ZodError) {
            return { 
                error : "Payload format invalid"
            }
        }
        
        if (error instanceof AuthError) { 
            switch (error.type) { 
                case "CredentialsSignin" : 
                    return {error : "Invalid Credentials"}
                default : 
                    return { 
                        error : "Something went wrong"
                    }
            }
            
        }

        
        throw error
       
        
    }
}