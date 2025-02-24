import { formatTimeToNow } from "@/lib/utils";
import { ExtendedIssue } from "@/types/issue";
import { FunctionComponent } from "react";
import Renderer from "./Renderer";
import PostVote from "./PostVote";
import { VoteType } from "@prisma/client";

interface IssueDisplayProps {
    issue : ExtendedIssue, 
    currentVote : VoteType | undefined , 
    initialVotes : number , 
}
 
const IssueDisplay: FunctionComponent<IssueDisplayProps> = ({issue,initialVotes,currentVote}) => {
    
    return ( <div className="">
        <div className="flex w-full items-center gap-6 py-2 ">
            <PostVote initialVote={currentVote} initialVotes={initialVotes} issueId={issue.id}/>
            <div className="flex flex-col gap-4">
                <div className="lg:text-5xl md:text-4xl text-2xl">
                    {issue.title}
                </div>
                <div className="flex text-muted-foreground text-md items-center gap-2 font-nokora">
            
                        {issue.isSolved ? <div className="border-2 border-green-300 text-green-300 px-3 py-1 rounded-lg">Answered</div> : <div className="border-2 border-muted-foreground px-3 py-1 rounded-lg">Unanswered</div>}
                
                    <div>{issue.author.username} posted this issue {formatTimeToNow(issue.createdAt)}</div>
                </div>
            </div>


        </div>

        <Renderer data={issue.content}/>

    </div> );
}
 
export default IssueDisplay;