
import IssueCard from "@/components/IssueCard";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { UserRole } from "@prisma/client";
import { Crown } from "lucide-react";





export async function generateStaticParams() {
    const users = await prisma.user.findMany()
   
    return users.map((user) => ({
      slug: user.id,
    }))
  }



const UserProfilePage = async ({params} : { params : Promise<{ slug : string}>}) => {
    const slug = (await params).slug
    const session = await auth()
    
    const user = await prisma.user.findUnique({ 
        where : { 
            id : slug
        },
        include : { 
            _count : { 
                select : { 
                    comments : { 
                        where :{ 
                            isSolution : true
                        }
                    }
                }
            },
            issues : { 
                include : { 
                    _count : { 
                        select : { 
                            comments : true
                        }
                        
                    }, 
                    votes : true , 
                    author : true
                }
            }, 
          
        }
    })

    

 

    
    if (!user) { 
        return <div className="text-center w-full">No user found</div>
    }
    return ( <div className="w-full flex pb-8 flex-col items-center justify-center gap-3 px-3 py-4">
            <Avatar className="w-44 h-44">
                <AvatarImage src={user?.image ?? ""} alt="profile"></AvatarImage>
                <AvatarFallback>Profile</AvatarFallback>
            </Avatar>
            <div className="text-lg flex gap-2 items-center">
                {
                    user.username
                }

                {session?.user.id === user.id && " ( You )" }

                {user.role === UserRole.ADMIN && <Crown size={20}/>}
            </div>
            <div className="text-sm text-muted-foreground">
                {user.email}
            </div>

            <div>
                Total Answers : {user._count.comments} 
            </div>
            <Separator className="max-w-[800px]"/>
            <h5>Your Issues</h5>
            
            <div className="flex flex-col gap-2">
                {
                user.issues.map(({id,title,createdAt,votes,_count,threads,isSolved})=> { 
                    return <IssueCard key={id} title={title} id={id} commentCount={_count.comments} threads={threads} isSolved={isSolved} votes={votes} createdAt={createdAt} author={user}  /> 
                })
            }
            </div>
           
        

        
        
    </div> );
}
 
export default UserProfilePage;