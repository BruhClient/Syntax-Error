
import { FunctionComponent } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { User } from "@prisma/client";
import { DeleteCommentReplyButton } from "./DeleteCommentReplyButton";
import { useSessionUser } from "@/hooks/use-session";

interface CommentReplyCardProps {
    id : string , 
    message : string , 
    author : User ,
    createdAt : Date , 
    authorId : string | undefined, 
    refetch : () => void

}
 
const CommentReplyCard: FunctionComponent<CommentReplyCardProps> = ({id,message,author,createdAt,authorId,refetch}) => {
    const user = useSessionUser()
    return ( <div className="flex items-center  text-sm"> 
       
       
            
        <Avatar className="w-6 h-6 align-top">
                <AvatarImage src={author?.image ?? ""}  className="object-cover " alt="@shadcn" />
                <AvatarFallback>CN</AvatarFallback>
        </Avatar> 
           
        
        
        <div className="pl-3 flex-1  break-all ">
            {message}
        </div>
        <div className="flex-1">
            
        </div>
        {user?.id === authorId && <DeleteCommentReplyButton id={id} refetch={refetch}/>}
            
        </div> );
}
 
export default CommentReplyCard;