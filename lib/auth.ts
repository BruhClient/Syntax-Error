import NextAuth from "next-auth"
import authConfig from "./auth-config"
import {PrismaAdapter} from "@auth/prisma-adapter"
import { prisma } from "./db"
import { getUserByEmail, getUserById } from "./users"
import {nanoid} from "nanoid"
import { UserRole } from "@prisma/client"

export const { 
    handlers : {GET,POST}, 
    signIn , 
    signOut, 
    auth ,

} = NextAuth({
    
    pages : {
        signIn :"/signin"
    },
    
    callbacks : { 
        async signIn({user,account}) { 
            if (account?.provider !== "credentials") return true 
            const existingUser = await getUserById(user.id!)
            if (!existingUser?.emailVerified) { 
                return false
            }
            return true 
        }, 
        async jwt({token}) { 

            if (!token) { 
                return token
            }

            const userExists = await getUserByEmail(token.email!)


            if (!userExists) { 
                return token
            }

            if (!userExists.username) { 
                await prisma.user.update({ 
                    where : { 
                        id : userExists.id
                    }, 
                    data : { 
                        username : nanoid(9) 
                    }
                })
            }

            const user = await getUserByEmail(token.email!)

            return { 
                id : user?.id, 
                username : user?.username, 
                email: user?.email, 
                image : user?.image,
                role: user?.role, 

            }
        }, 
        async session({token,session}) { 
        
            if (token) { 
                session.user.id = token.id as string
                session.user.username = token.username as string
                session.user.email = token.email as string
                session.user.image = token.image as string
                session.user.role = token.role as UserRole
            }
            return session
        }
    },
    adapter : PrismaAdapter(prisma), 
    session : {strategy : "jwt"}, 
    ...authConfig
})