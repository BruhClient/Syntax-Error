"use server"


import { prisma } from "@/lib/db"

import { getUserByEmail } from "@/lib/users"
import bcryptjs from "bcryptjs"

export const changePassword = async (email : string,newPassword : string) => { 
    try { 
        const accountExists = await getUserByEmail(email)

        if (!accountExists) { 
            return {
                error : "No account exists with this email"
            }
        }

        const hashedPassword = await bcryptjs.hash(newPassword,4)
        await prisma.user.update({ 
            where : { 
                email
            }, 
            data : { 
                hashedPassword : hashedPassword
            }
        })

      
        return {
            success : "Password Changed !"
        }  
    } catch  { 
        return {
            error : "Something went wrong"
        }
    }
}