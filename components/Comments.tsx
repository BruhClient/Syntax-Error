import { prisma } from "@/lib/db";
import { FunctionComponent } from "react";
import CommentsFeed from "./CommentFeed";
import { ExtendedComment } from "@/types/comment";
interface CommentsProps {
    issueId : string, 
    commentCount : number ,
    issueAuthorId : string , 
}
 
const Comments: FunctionComponent<CommentsProps> = async ({issueId,commentCount,issueAuthorId}) => {

    const initialComments = await prisma.comment.findMany({ 
        take : 5 , 
        where : { 
            issueId : issueId
        }, 
        
        orderBy : [
            {
                createdAt : "desc", 
                
                
            }
        ], 
        include : { 
            author : true , 
            _count : { 
                select : { 
                    replies : true
                }
            }, 
            votes : true
        }


    }) as ExtendedComment[]


    return ( <div>
        <h5 className="py-3">
            {commentCount} Comments
        </h5>

        <CommentsFeed initialComments={initialComments} take={5} issueAuthorId={issueAuthorId}/>
    </div> );
}
 
export default Comments;