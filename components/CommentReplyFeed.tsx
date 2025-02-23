"use client "

import { getCommentReplies } from "@/app/actions/get-comment-replies";
import { ExtendedCommentReply } from "@/types/comment-reply";


import { useInfiniteQuery } from "@tanstack/react-query";
import { FunctionComponent, useEffect } from "react";
import CommentReplyCard from "./CommentReplyCard";
import { Button } from "./ui/button";
import { ChevronDown } from "lucide-react";
import { Skeleton } from "./ui/skeleton";
import CommentReplyInput from "./CommentReplyInput";
import { DeleteCommentButton } from "./DeleteCommentButton";
import { useSessionUser } from "@/hooks/use-session";

interface CommentReplyFeedProps {
    
    commentId : string, 
    take? : number
    replyCount : number, 
    authorId : string ,
    
}
 
const CommentReplyFeed: FunctionComponent<CommentReplyFeedProps> = ({commentId,take=3,replyCount,authorId}) => {

    const user = useSessionUser()
   
    const {data,hasNextPage,isFetching,fetchNextPage,refetch} = useInfiniteQuery({ 
        queryKey : ["Comment Replies",commentId], 
        queryFn: async ({ pageParam = 0 }) => {
            const commentReplies = await getCommentReplies(pageParam * take,take,commentId) 

            return commentReplies
        },
        
      
        initialPageParam : 0 , 
            getNextPageParam : (lastPage, allPages, lastPageParam ) => { 

               
                if (lastPage.length < take ) { 
                    return undefined
                }
                return lastPageParam + 1
            }, 
        
    })


    

    


    
    
    const fetchedPages = data?.pages.flatMap((page) => page) ?? [] 


    useEffect(() => {
        
        
        fetchNextPage()
        
     },[])
   
    
     
    return ( 
    <>
    <div className="flex flex-col gap-2">

        {fetchedPages.map((reply : ExtendedCommentReply) => { 
           
            return <div key={reply.id}>
                <CommentReplyCard message={reply.message} author={reply.author} id={reply.id} createdAt={reply.createdAt} authorId={reply.authorId} refetch={() => refetch()}/>
            </div> 
        })}

        {hasNextPage && !isFetching && (replyCount - (data!.pages.length * take )) > 0  &&  <Button variant={"ghost"} onClick={() => {fetchNextPage()}}><ChevronDown />View {replyCount - (data!.pages.length * take)} more replies</Button> }

        {isFetching && <Skeleton className="w-full h-10"/>}

    </div>
    <CommentReplyInput refetch={() => refetch()} id={commentId}/>
    
     </>);
}
 
export default CommentReplyFeed;