"use server"
import { prisma } from "@/lib/db"

import { z } from "zod"

import { EditProfilePayload, EditProfileSchema } from "@/schema/EditProfileSchema"
import { getUserByEmail, getUserByUsername } from "@/lib/users"
import { revalidatePath } from "next/cache"
 

export const editProfile = async (values : EditProfilePayload,initialEmail : string) => { 

    try { 
        const {username,image} = EditProfileSchema.parse(values)
    
        const user = await getUserByEmail(initialEmail)

        if (username !== user?.username) { 

            const usernameExists = await getUserByUsername(username)

            if (usernameExists) { 
                return {
                    error : "Username already exists"
                }
            }
        }


        await prisma.user.update({ 
            where : { 
                email : initialEmail
            }, 
            data : { 
              
                username, 
                image

            }
        })
        
        revalidatePath("/")
        
        return { 
            success : "Credentials Updated !"
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