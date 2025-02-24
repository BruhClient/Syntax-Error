"use client"

import { FunctionComponent, useState, useTransition } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { CommentReplyLike, User } from "@prisma/client";
import { DeleteCommentReplyButton } from "./DeleteCommentReplyButton";
import { useSessionUser } from "@/hooks/use-session";
import { Heart, ThumbsUp } from "lucide-react";
import { usePrevious } from "@mantine/hooks";
import { likeCommentReply } from "@/app/actions/like-reply";
import { useToast } from "@/hooks/use-toast";

interface CommentReplyCardProps {
    id : string , 
    message : string , 
    author : User ,
    createdAt : Date , 
    authorId : string | undefined, 
    refetch : () => void, 
    currentLike : boolean, 
    initialLikeAmt : number 
    
    
    

}
 
const CommentReplyCard: FunctionComponent<CommentReplyCardProps> = ({id,message,author,authorId,refetch,currentLike,initialLikeAmt}) => {
    const user = useSessionUser()


    const [like ,setLike] = useState(currentLike)
    const [likeAmt ,setLikeAmt] = useState(initialLikeAmt)
    const prevLikeAmt = usePrevious(likeAmt)
    const [isPending,startTransition] = useTransition()
    
    const {toast} = useToast()
    const onClick = () => { 
        setLike(!like)
        if (like) { 
            setLikeAmt((prev) => prev-1)
        } else { 
            setLikeAmt((prev) => prev + 1)
        }
        
        startTransition(() => { 
            likeCommentReply(id,like).then((data) => {
                if (data.error) { 
                    toast({
                        title : data.error, 
                        variant : 'destructive'
                    })
                    setLike(like)
                    setLikeAmt(prevLikeAmt!)
                }
            })

        })
    }


    return ( <div className="flex items-center  text-sm"> 
       
       
            
        <Avatar className="w-6 h-6 align-top">
                <AvatarImage src={author?.image ?? ""}  className="object-cover " alt="@shadcn" />
                <AvatarFallback>CN</AvatarFallback>
        </Avatar> 
           
        
        
        <div className="pl-3 flex-1  break-all ">
            {message}
        </div>
        
        

        <div className="flex items-center px-3 gap-2">
            
            <Heart size={20} className={`${like && "fill-red-400 stroke-none"} cursor-pointer`} onClick={() => onClick()}/>

            <div>
                {likeAmt}
            </div>
        </div>
        {user?.id === authorId && <DeleteCommentReplyButton id={id} refetch={refetch}/>}
            
        </div> );
}
 
export default CommentReplyCard;