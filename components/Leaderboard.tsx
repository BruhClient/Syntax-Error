import { prisma } from "@/lib/db";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Separator } from "./ui/separator";
import { CircleCheck } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";

 
const Leaderboard = async () => {

    const topUsers = await prisma.user.findMany({ 
        
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
            
          
        }, 
        orderBy : { 
            comments : {
                _count : "desc"
            }
        }, 
        take : 10
    })

  

    


    return ( <div className="hidden md:block pt-4 px-3">
        <h5 className="font-nokora">Most Helpful</h5>
        <div>
            {topUsers.map((user) => { 
                return <>
                    <div key={user.id} className="flex items-center gap-2 px-2 py-2">
                    <Avatar className="h-6 w-6">
                        <AvatarImage src={user.image ?? ""} alt="profile" className="object-cover"></AvatarImage>
                        <AvatarFallback>Profile</AvatarFallback>
                    </Avatar>
                    <div>
                        <Button variant={"link"}>
                            <Link href={`/user/${user.id}`}>{user.username}</Link>
                        </Button>
                       
                    </div>
                    <div className="flex-1 flex items-center gap-2 justify-end pl-16">
                        {user._count.comments}<CircleCheck size={20} />
                    </div>
                    </div>
                    <Separator  />
                </>
            })}
        </div>
    </div> );
}
 
export default Leaderboard;