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
    
    return ( <div>
        <div className="flex w-full items-center gap-6 ">
            <PostVote initialVote={currentVote} initialVotes={initialVotes} issueId={issue.id}/>
            <div>
                <h2>
                    {issue.title}
                </h2>
                <div className="flex text-muted-foreground text-md items-center gap-2">
            
                        {issue.isSolved ? <div className="border-2 border-green-300 text-green-300 px-3 py-1 rounded-lg">Answered</div> : <div className="border-2 border-muted-foreground px-3 py-1 rounded-lg">Unanswered</div>}
                
                    <div>{issue.author.username} posted this issue {formatTimeToNow(issue.createdAt)}</div>
                </div>
            </div>


        </div>

        <Renderer data={issue.content}/>

    </div> );
}
 
export default IssueDisplay;