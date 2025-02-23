
import { CommentVote, User, VoteType } from "@prisma/client";
import { FunctionComponent, } from "react";
import { Card, CardDescription, CardTitle } from "./ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { format } from "date-fns";

import Renderer from "./Renderer";
import CommentVoteClient from "./CommentVote";


import { Separator } from "./ui/separator";



import { useSessionUser } from "@/hooks/use-session";

import CommentReplyFeed from "./CommentReplyFeed";
import { DeleteCommentButton } from "./DeleteCommentButton";
import { Button } from "./ui/button";
import SolutionButton from "./SolutionButton";


interface CommentCardProps {
    content : JSON , 
    id : string , 
    replyCount : number , 
    isSolution : boolean , 
    author : User,
    createdAt : Date, 
    votes : CommentVote[], 
    issueAuthorId : string
  

}
 
const CommentCard: FunctionComponent<CommentCardProps> = ({content,id,replyCount,isSolution,author,createdAt,votes,issueAuthorId}) => {
   
    
    const user = useSessionUser()
    
    const voteAmt = votes.reduce((acc,vote) => {

        if (vote.type === VoteType.DOWN) { 
            return acc -1
        }
        if (vote.type === VoteType.UP) { 
            return acc +1
        }
        return acc
    },0)


    const currentVote = votes.find((vote) => vote.authorId === user?.id)?.type 
  

    
    



    return ( <Card className={`px-5 py-3 flex flex-col ${isSolution && "border-green-300"}`} >
        <CardTitle className="flex w-full justify-between " >
            
            <div className="flex items-center gap-2">
                <Avatar className="w-7 h-7">
                        <AvatarImage src={author.image ?? ""} alt="profile" className="object-cover" ></AvatarImage>
                        <AvatarFallback>Profile</AvatarFallback>
                <AvatarFallback>Profile</AvatarFallback>
                </Avatar>
                <div className="flex flex-col text-sm ">
                    <div className="flex items-center gap-1">
                        {author.username}
                    </div>
                    <div className="text-muted-foreground">
                        {format(new Date(createdAt), "MM/dd/yyyy',' h:mm a")} 
                    </div>
                    
                    
                </div>
                {isSolution && <div className="border-green-300 border-2 w-fit px-2 py-1 rounded-sm text-green-300 text-sm">Solution</div>}

            </div>
            <CommentVoteClient initialVotes={voteAmt} initialVote={currentVote} commentId={id}  />

            
            
           
        </CardTitle>
        <CardDescription className="max-h-56 overflow-auto text-foreground">
            
            <Renderer data={content}/>
         

        </CardDescription>


            <Separator className="my-2" />
            <CommentReplyFeed replyCount={replyCount} commentId={id} authorId={author.id}/>
            <div className="pt-3 flex justify-end gap-2">
                {user?.id === issueAuthorId && <SolutionButton commentId={id} isSolution={isSolution}/>}
                {user?.id === author.id && <DeleteCommentButton  id={id}/> }
        
            </div>
            

            
          
            
           
    
        
 
    </Card> );
}
 
export default CommentCard;