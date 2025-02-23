import CommentInput from "@/components/CommentInput";
import Comments from "@/components/Comments";
import EditIssue from "@/components/EditIssue";
import IssueDisplay from "@/components/IssueDisplay";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { VoteType } from "@prisma/client";
import { Suspense } from "react";




export async function generateStaticParams() {
    const issues = await prisma.issue.findMany()
   
    return issues.map((issue) => ({
      slug: issue.id,
    }))
  }



const IssuePage = async ({params} : { params : Promise<{ slug : string}>}) => {
    const slug = (await params).slug
    const session = await auth()
    
    const issue = await prisma.issue.findUnique({ 
        where : { 
            id : slug
        },
        include : { 
            _count : { 
                select : { 
                    comments : true
                }
            },
            author : true, 
            votes : true , 
        }
    })

    const initialVotesAmt = issue?.votes.reduce((acc,vote) => {

        if (vote.type === VoteType.DOWN) { 
            return acc -1
        } 

        if (vote.type === VoteType.UP) { 
            return acc + 1
        } 
        return acc
    },0 ) ?? 0 

    const currentVote = issue?.votes.find((vote) => vote.authorId === session?.user.id)?.type 

  



    const isAuthor = issue?.authorId === session?.user.id
    if (!issue) { 
        return <div className="fixed top-0 left-0 flex flex-col h-full w-full justify-center items-center">
           <h3>Issue not found</h3>
           <h6>Please try again </h6>
        </div>
    }

    return ( <div className="w-full flex pt-4 pb-8 justify-center">

        <div className="max-w-[800px] w-full flex-col flex gap-2 px-3 ">
            {isAuthor ? <EditIssue issue={issue} initialVotes={initialVotesAmt} currentVote={currentVote} />:<IssueDisplay issue={issue} initialVotes={initialVotesAmt} currentVote={currentVote}/>}
            <Separator className="my-3"/> 
            <CommentInput issueId={issue.id} />
            <Suspense fallback={<Skeleton className="w-full h-48"/>}>
                <Comments issueId={issue.id} commentCount={issue._count.comments} issueAuthorId={issue.authorId}  />
            </Suspense> 
            
        </div>
        

        
        
    </div> );
}
 
export default IssuePage;