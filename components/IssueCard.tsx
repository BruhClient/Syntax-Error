"use client"
import { User, Vote, VoteType } from "@prisma/client";
import { FunctionComponent } from "react";
import { Card, CardDescription, CardTitle } from "./ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { format } from "date-fns";
import { useRouter } from "next/navigation";

interface IssueCardProps {
    title : string , 
    id : string , 
    commentCount : number , 
    isSolved : boolean , 
    author : User,
    createdAt : Date, 
    votes : Vote[], 
    threads : string[]

}
 
const IssueCard: FunctionComponent<IssueCardProps> = ({title,id,commentCount,isSolved,author,createdAt,votes,threads}) => {
    const router = useRouter()

  
    const voteAmt = votes.reduce((acc,vote) => {

        if (vote.type === VoteType.DOWN) { 
            return acc -1
        }
        if (vote.type === VoteType.UP) { 
            return acc +1
        }
        return acc
    },0)
    
    return ( <Card className={`px-5 pt-5 flex flex-col gap-3 cursor-pointer hover:bg-input w-full ${isSolved && "border-green-300"}`} onClick={() => { 
        router.push(`/issue/${id}`)
    }}>
        <CardTitle >
            {title}
        </CardTitle>
        <CardDescription className="flex items-center gap-3">
            <Avatar className="w-7 h-7">
                <AvatarImage src={author.image ?? ""} alt="profile" className="object-cover" ></AvatarImage>
                <AvatarFallback>Profile</AvatarFallback>
            </Avatar>
            <div className="flex flex-col font-nokora">
                <div>
                    {author.username} asked on {format(new Date(createdAt), "MM/dd/yyyy',' h:mm a")} · {commentCount} Messages | {voteAmt} votes
                </div>

                {isSolved && <div className="text-green-300">Marked as answered</div>}
                

            </div>
        </CardDescription>
        <div className="flex gap-2 flex-wrap text-sm text-muted-foreground">
            {threads.map((thread) => <div key={thread}>#{thread}</div>)}
        </div>
    </Card> );
}
 
export default IssueCard;