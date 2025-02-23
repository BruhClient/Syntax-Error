"use client"
import { getComments } from "@/app/actions/get-comments";
import { ExtendedComment } from "@/types/comment";
import { useIntersection } from "@mantine/hooks";
import { useInfiniteQuery } from "@tanstack/react-query";
import { FunctionComponent, useEffect, useRef } from "react";
import { Skeleton } from "./ui/skeleton";
import CommentCard from "./CommentCard";

interface CommentsFeedProps {
    initialComments : ExtendedComment[], 
    take : number, 
    issueAuthorId : string , 
}
 
const CommentsFeed: FunctionComponent<CommentsFeedProps> = ({initialComments,take,issueAuthorId}) => {
    const lastPostRef = useRef(null)

    const {ref,entry} = useIntersection({ 
        root: lastPostRef.current, 
        threshold : 1
    })


    const {data,hasNextPage,isFetching,fetchNextPage } = useInfiniteQuery({ 
        queryKey : ["Comments",issueAuthorId,], 
        queryFn: async ({ pageParam = 1 }) => {
            const issues = await getComments(pageParam * take,take) 

            return issues
        },
        
      
        initialPageParam : 1 , 
            getNextPageParam : (lastPage, allPages, lastPageParam ) => { 

          
                if (lastPage.length < take ) { 
                    return undefined
                }
                return lastPageParam + 1
            }, 
        
    })

    
    const fetchedPages = data?.pages.flatMap((page) => page) ?? [] 
    const pages = [...initialComments,...fetchedPages] as ExtendedComment[] 
   
    useEffect(() => {
        if (entry?.isIntersecting && hasNextPage) { 
            fetchNextPage()
        }
     },[entry])


    return ( <div className="flex flex-col gap-3">

            {
                pages.map(({content,author,_count,isSolution, createdAt,id,votes},index) => { 


                    if (index === pages.length -1) { 
                return <div ref={ref} key={id}>
                        <CommentCard content={content} isSolution={isSolution} createdAt={createdAt} replyCount={_count.replies} votes={votes} id={id} author={author} issueAuthorId={issueAuthorId} />
                    </div>
            }
            return <div key={id}>
                <CommentCard content={content} isSolution={isSolution} createdAt={createdAt} replyCount={_count.replies} votes={votes} id={id} author={author} issueAuthorId={issueAuthorId} />
            </div>
                })
            }

            {isFetching && 

            <>
            <Skeleton className="w-full h-[100px]" />
            <Skeleton className="w-full h-[100px]" />

            </>}

            
                </div> );
            }
 
export default CommentsFeed;