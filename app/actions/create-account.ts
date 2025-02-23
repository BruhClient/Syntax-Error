"use server"
import { prisma } from "@/lib/db"
import { CreateAccountPayload, CreateAccountSchema } from "@/schema/CreateAccountScema"
import { z } from "zod"
import bcryptjs from "bcryptjs"
import { generateVerificationToken } from "@/lib/verification_token"
import { sendVerificationEmail } from "@/lib/mail"
 

export const createAccount = async (values : CreateAccountPayload) => { 

    try { 
        const {username,password,email} = CreateAccountSchema.parse(values)

        const accountExists = await prisma.user.findUnique({
            where : { 
                email : email
            }
        })

        if (accountExists) { 
            return { 
                error : "Account already exists"
            }
        }

        const usernameExists = await prisma.user.findUnique({ 
            where : { 
                username : username
            }
        })

        if (usernameExists) { 
            return { 
                error : "Username Exists"
            }
        }
        

        const hashedPassword = await bcryptjs.hash(password,4)
        await prisma.user.create({ 
            data : { 
                email : email, 
                hashedPassword : hashedPassword, 
                username : username

            }
        })

        const verifcationToken = await generateVerificationToken(email)

        await sendVerificationEmail(verifcationToken.email,verifcationToken.token)

        return { 
            success : `Verification email sent to ${verifcationToken.email}`
        }

    } catch(error) { 
        if (error instanceof z.ZodError) { 
            return {
                error : "Payload format invalid"
            }
        }
        return {
            error : "Something went wrong"
        }
    }
}